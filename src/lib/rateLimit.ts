import Redis from 'ioredis';

let redisClient: Redis | null = null;

export const getRedisClient = () => {
  if (!redisClient) {
    redisClient = new Redis(process.env.REDIS_URL || '');
  }
  return redisClient;
};

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Slide/window rate limiter using Redis
 * @param key Unique key for the client (e.g. combination of IP and endpoint)
 * @param limit Maximum number of hits allowed within the window
 * @param windowSeconds Window length in seconds
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  const redis = getRedisClient();
  const currentKey = `rate_limit:${key}`;

  try {
    const now = Date.now();
    const windowStart = now - (windowSeconds * 1000);

    // Remove older entries outside the window
    await redis.zremrangebyscore(currentKey, 0, windowStart);
    // Add current request timestamp with a random component for uniqueness
    await redis.zadd(currentKey, now, `${now}-${Math.random()}`);
    // Count hits in the current window
    const hits = await redis.zcard(currentKey);
    // Set expiry on the set to avoid leaking memory
    await redis.expire(currentKey, windowSeconds);

    const reset = windowSeconds;

    if (hits > limit) {
      return {
        success: false,
        limit,
        remaining: 0,
        reset,
      };
    }

    return {
      success: true,
      limit,
      remaining: limit - hits,
      reset,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown Redis error';
    console.error('Rate limiting failed (Redis unreachable):', message);
    throw new Error('Rate limiting service unavailable.');
  }
}
