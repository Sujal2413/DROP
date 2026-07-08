import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { z } from 'zod';
import { rateLimit } from '@/lib/rateLimit';

const WaitlistSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).trim().transform((val) => val.replace(/[<>]/g, '')),
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  city: z.string().max(100).trim().transform((val) => val.replace(/[<>]/g, '')).optional().or(z.literal('')),
  drinkContext: z.enum(['Gym', 'Café', 'Home', 'Work', 'Events', 'Other']).optional().or(z.literal('')),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Zod Validation
    const parseResult = WaitlistSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, city, drinkContext } = parseResult.data;

    // 2. Rate Limiting (10 per hour per IP)
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const limitResult = await rateLimit(`waitlist:${ip}`, 10, 3600);

    if (!limitResult.success) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const client = await clientPromise;
    const db = client.db('Drop');
    const waitlistCollection = db.collection('waitlist');

    // Check if email already exists on waitlist
    const existing = await waitlistCollection.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: true, message: "You're already on the list! We'll be in touch." },
        { status: 200 }
      );
    }

    const entry = {
      name,
      email,
      city: city || '',
      drinkContext: drinkContext || '',
      lead_type: 'consumer',
      createdAt: new Date(),
    };

    await waitlistCollection.insertOne(entry);

    return NextResponse.json({
      success: true,
      message: "You're on the list. We'll reach out when DROP. is ready.",
    });
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
