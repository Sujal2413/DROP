/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Redis from 'ioredis';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET;
const REDIS_URL = process.env.REDIS_URL;

if (!JWT_SECRET) {
  throw new Error('FATAL: JWT_SECRET environment variable is not set. Refusing to start with insecure defaults.');
}
if (!REDIS_URL) {
  throw new Error('FATAL: REDIS_URL environment variable is not set. Session management requires Redis.');
}

let redisClient: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redisClient) {
    redisClient = new Redis(REDIS_URL!, {
      maxRetriesPerRequest: 3,
      connectTimeout: 5000,
      retryStrategy: (times) => {
        if (times > 5) {
          return null;
        }
        return Math.min(times * 200, 3000);
      },
      ...(process.env.NODE_ENV === 'production' && { tls: {} }),
    });
    
    redisClient.on('error', (err) => {
      console.error('Redis connection error:', err.message);
    });
  }
  return redisClient;
}

/**
 * Non-blocking alternative to KEYS + DEL. Uses SCAN to iterate without blocking Redis.
 */
async function scanAndDelete(redis: Redis, pattern: string): Promise<void> {
  let cursor = '0';
  do {
    const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
    cursor = nextCursor;
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } while (cursor !== '0');
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
}

interface JWTPayload {
  id: string;
  email: string;
  name: string;
  sessionId: string;
}

// Helper to determine cookie names depending on production vs dev environment
const getCookieNames = () => {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    accessTokenName: isProd ? '__Host-access-token' : 'drop_access_token',
    refreshTokenName: isProd ? '__Host-refresh-token' : 'drop_refresh_token',
  };
};

export async function createSession(userId: string, email: string, name: string) {
  const sessionId = crypto.randomUUID();
  const redis = getRedisClient();

  try {
    // 1. Single Active Session (SAS): Invalidate all existing sessions for this user
    // Using SCAN instead of KEYS to avoid blocking Redis
    const sessionPattern = `user_session:${userId}:*`;
    await scanAndDelete(redis, sessionPattern);
    
    // 2. Delete existing refresh tokens for this user
    const refreshPattern = `refresh_token:${userId}:*`;
    await scanAndDelete(redis, refreshPattern);

    // 3. Store active session flag in Redis (expires in 7 days)
    await redis.set(`user_session:${userId}:${sessionId}`, 'active', 'EX', 7 * 24 * 60 * 60);
  } catch (err: any) {
    console.error('Redis SAS enforcement failed, continuing with fallback:', err.message);
  }

  // 4. Generate Tokens
  const accessToken = jwt.sign(
    { id: userId, email, name, sessionId },
    JWT_SECRET!,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: userId, email, name, sessionId },
    JWT_SECRET!,
    { expiresIn: '7d' }
  );

  try {
    // 5. Store current active refresh token SHA-256 hash in Redis
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    await redis.set(`refresh_token:${userId}:${sessionId}`, tokenHash, 'EX', 7 * 24 * 60 * 60);
  } catch (err: any) {
    console.error('Redis Refresh Token save failed:', err.message);
  }

  // 6. Set HttpOnly, Secure, SameSite=Strict cookies
  const cookieStore = await cookies();
  const { accessTokenName, refreshTokenName } = getCookieNames();
  const isProd = process.env.NODE_ENV === 'production';

  cookieStore.set({
    name: accessTokenName,
    value: accessToken,
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict',
    path: '/',
    maxAge: 15 * 60, // 15 minutes — matches JWT expiration
  });

  cookieStore.set({
    name: refreshTokenName,
    value: refreshToken,
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days — matches JWT expiration
  });
}

export async function verifySession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const { accessTokenName, refreshTokenName } = getCookieNames();
  
  const accessToken = cookieStore.get(accessTokenName)?.value;
  const refreshToken = cookieStore.get(refreshTokenName)?.value;

  if (!accessToken && !refreshToken) {
    return null;
  }

  const redis = getRedisClient();

  // Case A: Access Token exists, try to verify it
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, JWT_SECRET!) as JWTPayload;
      
      try {
        // Verify session is still active in Redis
        const sessionActive = await redis.get(`user_session:${decoded.id}:${decoded.sessionId}`);
        if (!sessionActive) {
          // Session was invalidated (e.g., new login elsewhere)
          await deleteSession();
          return null;
        }
      } catch (redisErr) {
        // If Redis is down, fail open to avoid breaking app, relying on JWT expiration
      }

      return {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
      };
    } catch (err: any) {
      // Access token expired or invalid, proceed to refresh token validation below
    }
  }

  // Case B: Access Token expired/missing, check Refresh Token
  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET!) as JWTPayload;
      const { id: userId, email, name, sessionId } = decoded;

      try {
        // 1. Verify session is active in Redis
        const sessionActive = await redis.get(`user_session:${userId}:${sessionId}`);
        if (!sessionActive) {
          await deleteSession();
          return null;
        }

        // 2. Fetch active hash in Redis
        const activeHash = await redis.get(`refresh_token:${userId}:${sessionId}`);
        const providedHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

        // 3. Breach Detection: If token is valid but doesn't match active hash, reuse detected!
        if (!activeHash || activeHash !== providedHash) {
          // Breach lock: Invalidate everything
          await redis.del(`user_session:${userId}:${sessionId}`);
          await redis.del(`refresh_token:${userId}:${sessionId}`);
          await deleteSession();
          console.error(`[BREACH LOCK] Reused refresh token detected for User ${userId}, Session ${sessionId}. Invalidated all sessions.`);
          return null;
        }

        // 4. Token Rotation (RTR): Session is valid, generate new set of tokens
        const newAccessToken = jwt.sign(
          { id: userId, email, name, sessionId },
          JWT_SECRET!,
          { expiresIn: '15m' }
        );
        const newRefreshToken = jwt.sign(
          { id: userId, email, name, sessionId },
          JWT_SECRET!,
          { expiresIn: '7d' }
        );

        // Save new refresh token hash in Redis
        const newHash = crypto.createHash('sha256').update(newRefreshToken).digest('hex');
        await redis.set(`refresh_token:${userId}:${sessionId}`, newHash, 'EX', 7 * 24 * 60 * 60);

        const isProd = process.env.NODE_ENV === 'production';
        cookieStore.set({
          name: accessTokenName,
          value: newAccessToken,
          httpOnly: true,
          secure: isProd,
          sameSite: 'strict',
          path: '/',
          maxAge: 15 * 60,
        });

        cookieStore.set({
          name: refreshTokenName,
          value: newRefreshToken,
          httpOnly: true,
          secure: isProd,
          sameSite: 'strict',
          path: '/',
          maxAge: 7 * 24 * 60 * 60,
        });

        return { id: userId, email, name };
      } catch (redisErr) {
        // If Redis is down, verify token signature and allow fallback session (no rotation possible)
        return { id: userId, email, name };
      }
    } catch (err: any) {
      await deleteSession();
      return null;
    }
  }

  return null;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const { accessTokenName, refreshTokenName } = getCookieNames();
  
  const accessToken = cookieStore.get(accessTokenName)?.value;
  const refreshToken = cookieStore.get(refreshTokenName)?.value;
  const redis = getRedisClient();

  const tokenToDecode = accessToken || refreshToken;
  if (tokenToDecode) {
    try {
      // Use jwt.decode instead of verify to extract sessionId even if expired
      const decoded = jwt.decode(tokenToDecode) as JWTPayload;
      if (decoded && decoded.id && decoded.sessionId) {
        await redis.del(`user_session:${decoded.id}:${decoded.sessionId}`);
        await redis.del(`refresh_token:${decoded.id}:${decoded.sessionId}`);
      }
    } catch (err) {
      // Ignore token decoding errors on logout
    }
  }

  const isProd = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    path: '/',
    secure: isProd,
    sameSite: 'strict' as const,
  };

  // Strictly use delete with exact options to avoid Next.js Set-Cookie header conflicts
  cookieStore.delete({ name: accessTokenName, ...cookieOptions });
  cookieStore.delete({ name: refreshTokenName, ...cookieOptions });
  cookieStore.delete({ name: 'drop_session', ...cookieOptions });
}
