import { businessEnquiryRepository } from './business-enquiry.repository';
import { CreateBusinessEnquiryDto, BusinessEnquiryRecord } from './business-enquiry.types';
import { notificationService } from '../notifications/notification.service';
import { DuplicateResourceError } from '@/shared/errors/application-error';

export class BusinessEnquiryService {
  /**
   * Submit a new B2B business enquiry
   */
  public async submitEnquiry(
    dto: CreateBusinessEnquiryDto
  ): Promise<BusinessEnquiryRecord> {
    // Prevent duplicate B2B submissions within a 2-minute interval
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    const existingRecent = await businessEnquiryRepository.findRecent(
      dto.email,
      dto.businessName,
      twoMinutesAgo
    );

    if (existingRecent) {
      throw new DuplicateResourceError(
        'We have already received an enquiry for this business recently. Please wait a moment.'
      );
    }

    const enquiry = await businessEnquiryRepository.create(dto);

    // Send confirmation email to business contact
    notificationService.sendBusinessEnquiryConfirmation({
      businessName: enquiry.businessName,
      contactName: enquiry.contactName,
      email: enquiry.email,
      phone: enquiry.phone || undefined,
      businessType: enquiry.businessType,
      city: enquiry.city || undefined,
      monthlyRequirement: enquiry.monthlyRequirement || undefined,
      message: enquiry.message || undefined,
    }).catch((err) => {
      console.error('⚠️ Failed to send B2B confirmation email:', err.message);
    });

    // Send internal alert to the partnerships team
    notificationService.sendInternalBusinessEnquiryAlert({
      businessName: enquiry.businessName,
      contactName: enquiry.contactName,
      email: enquiry.email,
      phone: enquiry.phone || undefined,
      businessType: enquiry.businessType,
      city: enquiry.city || undefined,
      monthlyRequirement: enquiry.monthlyRequirement || undefined,
      message: enquiry.message || undefined,
    }).catch((err) => {
      console.error('⚠️ Failed to send B2B internal partnerships alert:', err.message);
    });

    return enquiry;
  }
}

export const businessEnquiryService = new BusinessEnquiryService();
