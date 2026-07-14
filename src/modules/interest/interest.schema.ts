import { z } from 'zod';

export const interestInputSchema = z.object({
  email: z.string().trim().email('Valid email is required.').max(150, 'Email is too long.'),
  leadSource: z.string().trim().max(100).default('footer_interest'),
  utmSource: z.string().trim().max(100).optional().nullable(),
  utmMedium: z.string().trim().max(100).optional().nullable(),
  utmCampaign: z.string().trim().max(100).optional().nullable(),
  
  // Honeypot field for bot protection (should be empty in valid requests)
  website: z.string().max(100).optional().nullable(),
});

export type InterestInput = z.infer<typeof interestInputSchema>;
