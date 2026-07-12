import { B2BRepository } from '@/repositories/b2b.repository';

export class B2BService {
  static async submitLead(data: { businessName: string; contactName: string; email: string; businessType: string; monthlyVolume?: string }) {
    const entry = {
      ...data,
      monthlyVolume: data.monthlyVolume || '',
      lead_type: 'b2b',
      createdAt: new Date(),
    };

    await B2BRepository.addLead(entry);

    return {
      success: true,
      message: "Request received. We'll be in touch with B2B details shortly.",
      status: 201,
    };
  }
}
