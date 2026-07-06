/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRedisClient } from './auth';

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
    const hits = await redis.incr(currentKey);

    if (hits === 1) {
      await redis.expire(currentKey, windowSeconds);
    }

    const ttl = await redis.ttl(currentKey);
    const reset = Math.max(0, ttl);

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
  } catch (err: any) {
    // Fail open in case Redis is down to avoid blocking legitimate users, but log it
    console.error('Rate limiting failed, allowed query through:', err.message);
    return {
      success: true,
      limit,
      remaining: 1,
      reset: 0,
    };
  }
}
