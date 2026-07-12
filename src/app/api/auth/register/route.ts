/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { RegisterSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rateLimit';
import { AuthService } from '@/services/auth.service';

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting based on IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const limitResult = await rateLimit(`register:${ip}`, 5, 300); // 5 attempts per 5 minutes
    
    if (!limitResult.success) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again in 5 minutes.' },
        { status: 429 }
      );
    }

    // 2. Input Parsing and Sanitization with Zod
    const body = await request.json();
    const parseResult = RegisterSchema.safeParse(body);
    
    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues.map(err => err.message).join('. ');
      return NextResponse.json(
        { error: errorMsg || 'Invalid input data.' },
        { status: 400 }
      );
    }

    // 3. Service Layer
    const result = await AuthService.register(parseResult.data);

    return NextResponse.json(
      { message: result.message },
      { status: result.status }
    );
  } catch (error: any) {
    console.error('Registration API Error:', error);
    if (error.message === 'User with this email already exists.') {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
