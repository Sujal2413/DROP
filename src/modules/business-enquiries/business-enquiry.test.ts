import { describe, it } from 'node:test';
import assert from 'node:assert';
import { businessEnquiryService } from './business-enquiry.service';
import { businessEnquiryRepository } from './business-enquiry.repository';
import { DuplicateResourceError } from '@/shared/errors/application-error';
import { BusinessEnquiryRecord, CreateBusinessEnquiryDto } from './business-enquiry.types';

// Mock repository methods
const mockEnquiries: BusinessEnquiryRecord[] = [];
businessEnquiryRepository.create = async (dto: CreateBusinessEnquiryDto) => {
  const newEnquiry: BusinessEnquiryRecord = {
    id: 'enquiry-id-' + Math.random(),
    businessName: dto.businessName,
    contactName: dto.contactName,
    email: dto.email.toLowerCase().trim(),
    phone: dto.phone || null,
    businessType: dto.businessType,
    city: dto.city || null,
    monthlyRequirement: dto.monthlyRequirement || null,
    message: dto.message || null,
    enquirySource: dto.enquirySource,
    status: 'new',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockEnquiries.push(newEnquiry);
  return newEnquiry;
};

// Mock recent checker
let simulateRecentFound = false;
businessEnquiryRepository.findRecent = async () => {
  return simulateRecentFound 
    ? { 
        id: 'existing-id',
        businessName: 'Premium Gym Ltd',
        contactName: 'Jane Manager',
        email: 'jane@premiumgym.com',
        phone: null,
        businessType: 'Gym',
        city: null,
        monthlyRequirement: null,
        message: null,
        enquirySource: 'business_enquiry_page',
        status: 'new',
        createdAt: new Date(),
        updatedAt: new Date(),
      } 
    : null;
};

describe('Business Enquiry Service Tests', () => {
  it('should successfully submit a new B2B enquiry', async () => {
    simulateRecentFound = false;
    const result = await businessEnquiryService.submitEnquiry({
      businessName: 'Premium Gym Ltd',
      contactName: 'Jane Manager',
      email: 'jane@premiumgym.com',
      businessType: 'Gym',
      enquirySource: 'business_enquiry_page',
    });

    assert.strictEqual(result.businessName, 'Premium Gym Ltd');
    assert.strictEqual(result.contactName, 'Jane Manager');
    assert.strictEqual(result.email, 'jane@premiumgym.com');
  });

  it('should prevent duplicate B2B submissions within short intervals', async () => {
    simulateRecentFound = true; // Force recent entry found state
    
    await assert.rejects(
      async () => {
        await businessEnquiryService.submitEnquiry({
          businessName: 'Premium Gym Ltd',
          contactName: 'Jane Manager',
          email: 'jane@premiumgym.com',
          businessType: 'Gym',
          enquirySource: 'business_enquiry_page',
        });
      },
      (err) => {
        return err instanceof DuplicateResourceError;
      }
    );
  });
});
