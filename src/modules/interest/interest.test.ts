import { describe, it } from 'node:test';
import assert from 'node:assert';
import { interestService } from './interest.service';
import { waitlistRepository } from '../waitlist/waitlist.repository';
import { InterestRecord } from './interest.types';

// Mock repository methods
const mockLeads: InterestRecord[] = [];
waitlistRepository.findByEmail = async (email: string) => {
  return mockLeads.find(l => l.email === email.toLowerCase().trim()) || null;
};
waitlistRepository.create = async (dto: { name?: string; email: string; city?: string | null; drinkContext?: string | null; leadSource: string; utmSource?: string | null; utmMedium?: string | null; utmCampaign?: string | null }) => {
  const newLead: InterestRecord = {
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
waitlistRepository.update = async (id: string, data: { name?: string; city?: string | null; drinkContext?: string | null; leadSource: string; status?: string; utmSource?: string | null; utmMedium?: string | null; utmCampaign?: string | null }) => {
  const idx = mockLeads.findIndex(l => l.id === id);
  if (idx !== -1) {
    mockLeads[idx] = {
      ...mockLeads[idx],
      ...data,
      updatedAt: new Date()
    };
    return mockLeads[idx];
  }
  throw new Error('Not found');
};

describe('Interest Service Tests', () => {
  it('should successfully register a new consumer lead via interest flow', async () => {
    const email = 'interest-user@example.com';
    const result = await interestService.expressInterest({
      email,
      leadSource: 'footer_interest',
    });

    assert.strictEqual(result.isNew, true);
    assert.strictEqual(result.lead.email, email);
    assert.strictEqual(result.lead.leadSource, 'footer_interest');
  });

  it('should update the leadSource of an existing lead instead of duplicating', async () => {
    const email = 'interest-user@example.com'; // Already registered above
    const result = await interestService.expressInterest({
      email,
      leadSource: 'story_page',
    });

    assert.strictEqual(result.isNew, false);
    assert.strictEqual(result.lead.leadSource, 'story_page');
  });
});
