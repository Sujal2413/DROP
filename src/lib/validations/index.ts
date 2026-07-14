import { z } from 'zod';

export const WaitlistSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).trim().transform((val) => val.replace(/[<>]/g, '')),
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  city: z.string().max(100).trim().transform((val) => val.replace(/[<>]/g, '')).optional().or(z.literal('')),
  drinkContext: z.enum(['Gym', 'Café', 'Home', 'Work', 'Events', 'Other']).optional().or(z.literal('')),
});

export const ContactLeadSchema = z.object({
  businessName: z.string().min(1, 'Business name is required').max(200).trim().transform((val) => val.replace(/[<>]/g, '')),
  contactName: z.string().min(1, 'Contact name is required').max(100).trim().transform((val) => val.replace(/[<>]/g, '')),
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  businessType: z.enum(['Café', 'Gym', 'Hotel', 'Salon', 'Co-working', 'Event', 'Other']),
  monthlyVolume: z.enum(['<100 cans', '100–500', '500–1000', '1000+']).optional().or(z.literal('')),
});




