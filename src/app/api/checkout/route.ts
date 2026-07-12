import { NextResponse } from 'next/server';
import { CheckoutSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rateLimit';
import { CheckoutService } from '@/services/checkout.service';

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
    
    // 2. Rate Limiting (5 requests / min / IP)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const limitResult = await rateLimit(`checkout:${ip}`, 5, 60);
    
    if (!limitResult.success) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // 3. Service Layer
    const result = await CheckoutService.registerInterest(parseResult.data);

    return NextResponse.json({ success: result.success, message: result.message }, { status: result.status });
  } catch (error) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
