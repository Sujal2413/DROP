import { NextResponse } from 'next/server';
import { ContactLeadSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rateLimit';
import { ContactService } from '@/services/contact.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Zod Validation
    const parseResult = ContactLeadSchema.safeParse(body);
    if (!parseResult.success) {
      console.error('Contact API 400 Error (Validation Failed):', parseResult.error.issues);
      return NextResponse.json(
        { error: parseResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = parseResult.data;

    // 2. Rate Limiting (5 requests / min / IP)
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const limitResult = await rateLimit(`contact:${ip}`, 5, 60);

    if (!limitResult.success) {
      console.error(`Contact API 429 Error: Rate limit exceeded for IP ${ip}`);
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // 3. Service Layer
    const result = await ContactService.submitLead(parseResult.data);

    return NextResponse.json({
      success: result.success,
      message: result.message,
    }, { status: result.status });
  } catch (error) {
    console.error('Contact Lead API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
