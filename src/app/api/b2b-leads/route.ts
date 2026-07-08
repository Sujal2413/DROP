import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { z } from 'zod';
import { rateLimit } from '@/lib/rateLimit';

const B2BLeadSchema = z.object({
  businessName: z.string().min(1, 'Business name is required').max(200).trim().transform((val) => val.replace(/[<>]/g, '')),
  contactName: z.string().min(1, 'Contact name is required').max(100).trim().transform((val) => val.replace(/[<>]/g, '')),
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  businessType: z.enum(['Café', 'Gym', 'Hotel', 'Salon', 'Co-working', 'Event', 'Other']),
  monthlyVolume: z.enum(['<100 cans', '100–500', '500–1000', '1000+']).optional().or(z.literal('')),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Zod Validation
    const parseResult = B2BLeadSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { businessName, contactName, email, businessType, monthlyVolume } = parseResult.data;

    // 2. Rate Limiting (5 per hour per IP)
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const limitResult = await rateLimit(`b2b:${ip}`, 5, 3600);

    if (!limitResult.success) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const b2bCollection = db.collection('b2b_leads');

    const entry = {
      businessName,
      contactName,
      email,
      businessType,
      monthlyVolume: monthlyVolume || '',
      lead_type: 'b2b',
      createdAt: new Date(),
    };

    await b2bCollection.insertOne(entry);

    return NextResponse.json({
      success: true,
      message: "Request received. We'll be in touch with B2B details shortly.",
    });
  } catch (error) {
    console.error('B2B Lead API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
