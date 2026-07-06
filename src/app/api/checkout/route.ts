import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { z } from 'zod';
import { rateLimit } from '@/lib/rateLimit';

const CheckoutSchema = z.object({
  items: z.array(z.any()).min(1, 'Cart is empty'),
  userId: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Zod Validation
    const parseResult = CheckoutSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.issues[0].message }, { status: 400 });
    }
    
    const { items, userId, email } = parseResult.data;

    // 2. Rate Limiting (max 3 per hour per IP)
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const limitResult = await rateLimit(`checkout:${ip}`, 3, 3600);
    
    if (!limitResult.success) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const ordersCollection = db.collection('orders');

    const newOrder = {
      userId: userId || 'anonymous',
      email: email || 'anonymous@example.com',
      items,
      status: 'interest_registered',
      createdAt: new Date(),
    };

    await ordersCollection.insertOne(newOrder);

    return NextResponse.json({ success: true, message: 'Interest registered successfully' });
  } catch (error) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
