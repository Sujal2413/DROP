import { redis } from './client';
import { RateLimitError } from '@/shared/errors/application-error';

interface RateLimiterOptions {
  windowMs: number; // Duration of window in milliseconds
  max: number;      // Maximum number of requests in window
}

// In-Memory fallback store
const memoryStore = new Map<string, { count: number; expiresAt: number }>();

// Cleanup memory store occasionally to prevent memory leak
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, val] of memoryStore.entries()) {
      if (now > val.expiresAt) {
        memoryStore.delete(key);
      }
    }
  }, 60000);
}

export async function rateLimit(
  key: string,
  options: RateLimiterOptions
): Promise<void> {
  const { windowMs, max } = options;
  const fullKey = `ratelimit:${key}`;

  if (redis && redis.status === 'ready') {
    try {
      const now = Date.now();
      const clearBefore = now - windowMs;

      // Pipeline Redis operations for efficiency
      const pipeline = redis.multi();
      pipeline.zremrangebyscore(fullKey, 0, clearBefore);
      pipeline.zadd(fullKey, now, now.toString());
      pipeline.zcard(fullKey);
      pipeline.pexpire(fullKey, windowMs);

      const results = await pipeline.exec();
      if (results) {
        // ZCARD is the 3rd operation (index 2)
        const zcardResult = results[2];
        const count = typeof zcardResult[1] === 'number' ? zcardResult[1] : 0;
        
        if (count > max) {
          throw new RateLimitError();
        }
      }
      return;
    } catch (error) {
      if (error instanceof RateLimitError) {
        throw error;
      }
      console.warn('⚠️ Redis Rate Limiter failed, falling back to Memory:', error);
    }
  }

  // In-Memory Fallback
  const now = Date.now();
  const entry = memoryStore.get(fullKey);

  if (!entry || now > entry.expiresAt) {
    memoryStore.set(fullKey, {
      count: 1,
      expiresAt: now + windowMs,
    });
    return;
  }

  entry.count += 1;
  if (entry.count > max) {
    throw new RateLimitError();
  }
}
