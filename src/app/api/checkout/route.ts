import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { z } from 'zod';
import { rateLimit } from '@/lib/rateLimit';

// Properly typed item schema — prevents arbitrary data injection into MongoDB
const CartItemSchema = z.object({
  id: z.string().min(1).max(100),
  name: z.string().min(1).max(200).transform((val) => val.replace(/[<>]/g, '')),
  flavor: z.string().max(100).transform((val) => val.replace(/[<>]/g, '')),
  price: z.string().max(20),
  image: z.string().max(500),
});

const CheckoutSchema = z.object({
  items: z.array(CartItemSchema).min(1, 'Cart is empty').max(50, 'Too many items'),
  userId: z.string().max(100).optional(),
  email: z.string().email('Invalid email address').max(254).optional().or(z.literal('')),
});

export async function POST(request: Request) {
  try {
    // Guard against oversized payloads
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 50_000) {
      return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
    }

    const body = await request.json();
    
    // 1. Zod Validation with typed schema
    const parseResult = CheckoutSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.issues[0].message }, { status: 400 });
    }
    
    const { items, userId, email } = parseResult.data;

    // 2. Rate Limiting (max 3 per hour per IP)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const limitResult = await rateLimit(`checkout:${ip}`, 3, 3600);
    
    if (!limitResult.success) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const client = await clientPromise;
    const db = client.db('Drop');
    const ordersCollection = db.collection('orders');

    const newOrder = {
      userId: userId || 'anonymous',
      email: email || '',
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

