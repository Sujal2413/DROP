import { prisma } from '@/infrastructure/database/client';
import { BusinessEnquiryRecord, CreateBusinessEnquiryDto } from './business-enquiry.types';

export class BusinessEnquiryRepository {
  /**
   * Find a B2B enquiry created recently to prevent spam/accidental clicks
   */
  public async findRecent(
    email: string,
    businessName: string,
    since: Date
  ): Promise<BusinessEnquiryRecord | null> {
    return prisma.businessEnquiry.findFirst({
      where: {
        email: {
          equals: email.trim().toLowerCase(),
          mode: 'insensitive',
        },
        businessName: {
          equals: businessName.trim(),
          mode: 'insensitive',
        },
        createdAt: {
          gte: since,
        },
      },
    });
  }

  /**
   * Create a new B2B enquiry record
   */
  public async create(
    dto: CreateBusinessEnquiryDto
  ): Promise<BusinessEnquiryRecord> {
    return prisma.businessEnquiry.create({
      data: {
        businessName: dto.businessName.trim(),
        contactName: dto.contactName.trim(),
        email: dto.email.trim().toLowerCase(),
        phone: dto.phone || null,
        businessType: dto.businessType.trim(),
        city: dto.city || null,
        monthlyRequirement: dto.monthlyRequirement || null,
        message: dto.message || null,
        enquirySource: dto.enquirySource,
        status: dto.status || 'new',
      },
    });
  }
}

export const businessEnquiryRepository = new BusinessEnquiryRepository();
