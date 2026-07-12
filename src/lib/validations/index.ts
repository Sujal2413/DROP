import { z } from 'zod';

export const WaitlistSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).trim().transform((val) => val.replace(/[<>]/g, '')),
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  city: z.string().max(100).trim().transform((val) => val.replace(/[<>]/g, '')).optional().or(z.literal('')),
  drinkContext: z.enum(['Gym', 'Café', 'Home', 'Work', 'Events', 'Other']).optional().or(z.literal('')),
});

export const B2BLeadSchema = z.object({
  businessName: z.string().min(1, 'Business name is required').max(200).trim().transform((val) => val.replace(/[<>]/g, '')),
  contactName: z.string().min(1, 'Contact name is required').max(100).trim().transform((val) => val.replace(/[<>]/g, '')),
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  businessType: z.enum(['Café', 'Gym', 'Hotel', 'Salon', 'Co-working', 'Event', 'Other']),
  monthlyVolume: z.enum(['<100 cans', '100–500', '500–1000', '1000+']).optional().or(z.literal('')),
});

export const CartItemSchema = z.object({
  id: z.string().min(1).max(100),
  name: z.string().min(1).max(200).transform((val) => val.replace(/[<>]/g, '')),
  flavor: z.string().max(100).transform((val) => val.replace(/[<>]/g, '')),
  price: z.string().max(20),
  image: z.string().max(500),
});

export const CheckoutSchema = z.object({
  items: z.array(CartItemSchema).min(1, 'Cart is empty').max(50, 'Too many items'),
  userId: z.string().max(100).optional(),
  email: z.string().email('Invalid email address').max(254).optional().or(z.literal('')),
});


