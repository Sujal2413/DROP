import Redis from 'ioredis';
import { env } from '@/shared/config/env';

let redis: Redis | null = null;

if (env.REDIS_URL) {
  try {
    redis = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      connectTimeout: 5000,
      lazyConnect: true, // Don't block startup if redis is offline
    });
    
    redis.on('error', (err) => {
      console.warn('⚠️ Redis Connection Error:', err.message);
    });
  } catch (error) {
    console.warn('⚠️ Failed to initialize ioredis Client:', error);
  }
} else {
  console.info('ℹ️ Redis URL not provided. Rate limiting will fallback to in-memory mode.');
}

export { redis };
