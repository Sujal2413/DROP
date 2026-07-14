import { prisma } from '@/infrastructure/database/client';
import { ConsumerLeadRecord, CreateLeadDto } from './waitlist.types';

export class WaitlistRepository {
  /**
   * Find a lead by email address (case-insensitive lookup by lowercasing input)
   */
  public async findByEmail(email: string): Promise<ConsumerLeadRecord | null> {
    const normalizedEmail = email.trim().toLowerCase();
    return prisma.consumerLead.findFirst({
      where: {
        email: {
          equals: normalizedEmail,
          mode: 'insensitive',
        },
      },
    });
  }

  /**
   * Create a new lead record
   */
  public async create(dto: CreateLeadDto): Promise<ConsumerLeadRecord> {
    const normalizedEmail = dto.email.trim().toLowerCase();
    return prisma.consumerLead.create({
      data: {
        name: dto.name || null,
        email: normalizedEmail,
        city: dto.city || null,
        drinkContext: dto.drinkContext || null,
        leadSource: dto.leadSource,
        utmSource: dto.utmSource || null,
        utmMedium: dto.utmMedium || null,
        utmCampaign: dto.utmCampaign || null,
        status: dto.status || 'active',
      },
    });
  }

  /**
   * Update an existing lead record
   */
  public async update(
    id: string,
    data: Partial<Omit<CreateLeadDto, 'email'>>
  ): Promise<ConsumerLeadRecord> {
    return prisma.consumerLead.update({
      where: { id },
      data: {
        name: data.name,
        city: data.city,
        drinkContext: data.drinkContext,
        leadSource: data.leadSource,
        status: data.status,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
      },
    });
  }
}

export const waitlistRepository = new WaitlistRepository();
