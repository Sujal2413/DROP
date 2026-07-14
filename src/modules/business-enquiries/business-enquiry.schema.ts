import { z } from 'zod';

export const businessEnquiryInputSchema = z.object({
  businessName: z.string().trim().min(1, 'Business name is required.').max(100, 'Business name is too long.'),
  contactName: z.string().trim().min(1, 'Contact name is required.').max(100, 'Contact name is too long.'),
  email: z.string().trim().email('Valid email is required.').max(150, 'Email is too long.'),
  phone: z.string().trim().max(30, 'Phone is too long.').optional().nullable(),
  businessType: z.string().trim().min(1, 'Business type is required.').max(50, 'Business type is too long.'),
  city: z.string().trim().max(100, 'City name is too long.').optional().nullable(),
  monthlyRequirement: z.string().trim().max(50).optional().nullable(),
  message: z.string().trim().max(2000, 'Message is too long.').optional().nullable(),
  enquirySource: z.string().trim().max(100).default('business_enquiry_page'),
  
  // Honeypot field for bot protection (should be empty in valid requests)
  website: z.string().max(100).optional().nullable(),
});

export type BusinessEnquiryInput = z.infer<typeof businessEnquiryInputSchema>;
