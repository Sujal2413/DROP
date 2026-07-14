import { OrderRepository } from '@/repositories/order.repository';

interface CheckoutItem {
  id: string;
  name: string;
  flavor: string;
  price: string;
  image: string;
}

export class CheckoutService {
  static async registerInterest(data: { items: CheckoutItem[]; userId?: string; email?: string }) {
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
