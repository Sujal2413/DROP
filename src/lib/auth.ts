/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Redis from 'ioredis';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'drop_premium_survey_jwt_secret_key_2026';
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

let redisClient: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redisClient) {
    redisClient = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 1,
      connectTimeout: 2000,
      retryStrategy: (times) => {
        // Stop retrying after 3 attempts in development to avoid blocking
        if (times > 3) {
          return null;
        }
        return Math.min(times * 100, 2000);
      }
    });
    
    redisClient.on('error', (err) => {
      console.error('Redis connection error:', err.message);
    });
  }
  return redisClient;
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
    const sessionPattern = `user_session:${userId}:*`;
    const existingKeys = await redis.keys(sessionPattern);
    if (existingKeys.length > 0) {
      await redis.del(...existingKeys);
    }
    
    // 2. Delete existing refresh tokens for this user
    const refreshPattern = `refresh_token:${userId}:*`;
    const existingRefreshKeys = await redis.keys(refreshPattern);
    if (existingRefreshKeys.length > 0) {
      await redis.del(...existingRefreshKeys);
    }

    // 3. Store active session flag in Redis (expires in 7 days)
    await redis.set(`user_session:${userId}:${sessionId}`, 'active', 'EX', 7 * 24 * 60 * 60);
  } catch (err: any) {
    console.error('Redis SAS enforcement failed, continuing with fallback:', err.message);
  }

  // 4. Generate Tokens
  const accessToken = jwt.sign(
    { id: userId, email, name, sessionId },
    JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: userId, email, name, sessionId },
    JWT_SECRET,
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
  });

  cookieStore.set({
    name: refreshTokenName,
    value: refreshToken,
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict',
    path: '/',
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
      const decoded = jwt.verify(accessToken, JWT_SECRET) as JWTPayload;
      
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
      const decoded = jwt.verify(refreshToken, JWT_SECRET) as JWTPayload;
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
          JWT_SECRET,
          { expiresIn: '15m' }
        );
        const newRefreshToken = jwt.sign(
          { id: userId, email, name, sessionId },
          JWT_SECRET,
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
        });

        cookieStore.set({
          name: refreshTokenName,
          value: newRefreshToken,
          httpOnly: true,
          secure: isProd,
          sameSite: 'strict',
          path: '/',
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
  const redis = getRedisClient();

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, JWT_SECRET) as JWTPayload;
      await redis.del(`user_session:${decoded.id}:${decoded.sessionId}`);
      await redis.del(`refresh_token:${decoded.id}:${decoded.sessionId}`);
    } catch (err) {
      // Ignore token decoding errors on logout
    }
  }

  cookieStore.delete(accessTokenName);
  cookieStore.delete(refreshTokenName);
  
  // Also clear legacy session cookie if it exists
  cookieStore.delete('drop_session');
}
