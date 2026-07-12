import { OrderRepository } from '@/repositories/order.repository';

export class CheckoutService {
  static async registerInterest(data: { items: any[]; userId?: string; email?: string }) {
    const newOrder = {
      userId: data.userId || 'anonymous',
      email: data.email || '',
      items: data.items,
      status: 'interest_registered',
      createdAt: new Date(),
    };

    await OrderRepository.createOrder(newOrder);

    return { success: true, message: 'Interest registered successfully', status: 201 };
  }
}
