import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().url().default('postgresql://postgres:postgres@localhost:5432/drop'),
  REDIS_URL: z.string().url().optional(),
  
  // SMTP Email Config (Optional, falls back to Mock in Dev)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().email().default('no-reply@dropwater.in'),
  
  // Notification recipient
  TEAM_EMAIL: z.string().email().default('partnerships@dropwater.in'),
});

let env: z.infer<typeof envSchema>;

try {
  env = envSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_FROM: process.env.SMTP_FROM,
    TEAM_EMAIL: process.env.TEAM_EMAIL,
  });
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Invalid environment variables:', error.format());
  } else {
    console.error('❌ Failed to parse environment variables:', error);
  }
  // Standard fallback for build steps to prevent crash
  env = envSchema.parse({
    NODE_ENV: 'production',
    DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/drop',
    SMTP_FROM: 'no-reply@dropwater.in',
    TEAM_EMAIL: 'partnerships@dropwater.in',
  });
}

export { env };
