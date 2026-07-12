import { NextResponse } from 'next/server';
import { WaitlistSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rateLimit';
import { WaitlistService } from '@/services/waitlist.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Zod Validation
    const parseResult = WaitlistSchema.safeParse(body);
    if (!parseResult.success) {
      console.error('Waitlist 400 Error (Validation Failed):', parseResult.error.issues);
      return NextResponse.json(
        { error: parseResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = parseResult.data;

    // 2. Rate Limiting (5 requests / min / IP)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const limitResult = await rateLimit(`waitlist:${ip}`, 5, 60);

    if (!limitResult.success) {
      console.error(`Waitlist 429 Error: Rate limit exceeded for IP ${ip}`);
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // 3. Service Layer
    const result = await WaitlistService.joinWaitlist(parseResult.data);

    return NextResponse.json({
      success: result.success,
      message: result.message,
    }, { status: result.status });
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
