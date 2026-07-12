import { ContactRepository } from '@/repositories/contact.repository';

export class ContactService {
  static async submitLead(data: { businessName: string; contactName: string; email: string; businessType: string; monthlyVolume?: string }) {
    const entry = {
      ...data,
      monthlyVolume: data.monthlyVolume || '',
      lead_type: 'b2b',
      createdAt: new Date(),
    };

    await ContactRepository.addLead(entry);

    return {
      success: true,
      message: "Request received. We'll be in touch with B2B details shortly.",
      status: 201,
    };
  }
}
