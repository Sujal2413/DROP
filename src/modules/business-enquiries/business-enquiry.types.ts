import { BusinessEnquiry } from '@prisma/client';

export type BusinessEnquiryRecord = BusinessEnquiry;

export interface CreateBusinessEnquiryDto {
  businessName: string;
  contactName: string;
  email: string;
  phone?: string | null;
  businessType: string;
  city?: string | null;
  monthlyRequirement?: string | null;
  message?: string | null;
  enquirySource: string;
  status?: string;
}
