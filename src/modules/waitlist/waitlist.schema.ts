import { z } from 'zod';

export const waitlistInputSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(100, 'Name is too long.'),
  email: z.string().trim().email('Valid email is required.').max(150, 'Email is too long.'),
  city: z.string().trim().max(100, 'City is too long.').optional().nullable(),
  drinkContext: z.string().trim().max(100, 'Context is too long.').optional().nullable(),
  leadSource: z.string().trim().max(100, 'Lead source is too long.').default('homepage_waitlist'),
  utmSource: z.string().trim().max(100).optional().nullable(),
  utmMedium: z.string().trim().max(100).optional().nullable(),
  utmCampaign: z.string().trim().max(100).optional().nullable(),
  
  // Honeypot field for bot protection (should be empty in valid consumer requests)
  website: z.string().max(100).optional().nullable(),
});

export type WaitlistInput = z.infer<typeof waitlistInputSchema>;
