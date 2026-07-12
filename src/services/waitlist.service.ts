import { WaitlistRepository } from '@/repositories/waitlist.repository';

export class WaitlistService {
  static async joinWaitlist(data: { name: string; email: string; city?: string; drinkContext?: string }) {
    const existing = await WaitlistRepository.findByEmail(data.email);
    
    if (existing) {
      return { success: true, message: "You're already on the list! We'll be in touch.", status: 200 };
    }

    const entry = {
      ...data,
      city: data.city || '',
      drinkContext: data.drinkContext || '',
      lead_type: 'consumer',
      createdAt: new Date(),
    };

    await WaitlistRepository.addEntry(entry);

    return {
      success: true,
      message: "You're on the list. We'll reach out when DROP. is ready.",
      status: 201,
    };
  }
}
