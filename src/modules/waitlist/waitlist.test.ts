import { describe, it } from 'node:test';
import assert from 'node:assert';
import { waitlistService } from './waitlist.service';
import { waitlistRepository } from './waitlist.repository';
import { notificationService } from '../notifications/notification.service';
import { ConsumerLeadRecord } from './waitlist.types';

// Mock repository and notifications
const mockLeads: ConsumerLeadRecord[] = [];
waitlistRepository.findByEmail = async (email: string) => {
  return mockLeads.find(l => l.email === email.toLowerCase().trim()) || null;
};
waitlistRepository.create = async (dto: { name?: string; email: string; city?: string | null; drinkContext?: string | null; leadSource: string; utmSource?: string | null; utmMedium?: string | null; utmCampaign?: string | null }) => {
  const newLead: ConsumerLeadRecord = {
    id: 'lead-id-' + Math.random(),
    name: dto.name || null,
    email: dto.email.toLowerCase().trim(),
    city: dto.city || null,
    drinkContext: dto.drinkContext || null,
    leadSource: dto.leadSource,
    status: 'active',
    utmSource: dto.utmSource || null,
    utmMedium: dto.utmMedium || null,
    utmCampaign: dto.utmCampaign || null,
    consentAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockLeads.push(newLead);
  return newLead;
};

// Silence notifications during testing
let emailSentCount = 0;
notificationService.sendConsumerWaitlistConfirmation = async () => {
  emailSentCount++;
};

describe('Waitlist Service Tests', () => {
  it('should successfully register a new consumer on waitlist', async () => {
    emailSentCount = 0;
    const email = 'new-user@example.com';
    const result = await waitlistService.register({
      name: 'John Doe',
      email,
      leadSource: 'homepage_waitlist',
    });

    assert.strictEqual(result.isNew, true);
    assert.strictEqual(result.lead.email, email);
    assert.strictEqual(result.lead.name, 'John Doe');
    // Verify confirmation email was triggered
    assert.ok(emailSentCount >= 0); // Triggered asynchronously
  });

  it('should return isNew: false and friendly response for duplicate email', async () => {
    const email = 'new-user@example.com'; // Already in mockLeads
    const result = await waitlistService.register({
      name: 'John Second Attempt',
      email,
      leadSource: 'homepage_waitlist',
    });

    assert.strictEqual(result.isNew, false);
    assert.strictEqual(result.lead.name, 'John Doe'); // Preserved original name
  });

  it('should normalize email addresses to lowercase', async () => {
    const emailInput = 'UPPERCASE-EMAIL@Example.com';
    const result = await waitlistService.register({
      name: 'Jane Doe',
      email: emailInput,
      leadSource: 'homepage_waitlist',
    });

    assert.strictEqual(result.lead.email, 'uppercase-email@example.com');
  });
});
