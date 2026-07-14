import { ConsumerLead } from '@prisma/client';

export type ConsumerLeadRecord = ConsumerLead;

export interface CreateLeadDto {
  name?: string;
  email: string;
  city?: string | null;
  drinkContext?: string | null;
  leadSource: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  status?: string;
}
