/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { LoginSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rateLimit';
import { AuthService } from '@/services/auth.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Zod input validation
    const parseResult = LoginSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Please enter a valid email address and password.' },
        { status: 400 }
      );
    }

    const { email, password } = parseResult.data;

    // 2. Rate Limiting based on IP and Email to protect against brute-force
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const limitResult = await rateLimit(`login:${ip}:${email}`, 5, 300); // 5 attempts per 5 mins
    
    if (!limitResult.success) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again in 5 minutes.' },
        { status: 429 }
      );
    }

    // 3. Service Layer
    const result = await AuthService.login({ email, password });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Login API Error:', error);
    // Determine if it's a known error from the service
    if (error.message === 'Invalid email or password.') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    if (error.message === 'This account does not have password login enabled. Please use Google/Apple.') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
