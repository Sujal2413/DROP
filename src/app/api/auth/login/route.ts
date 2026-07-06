/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { rateLimit } from '@/lib/rateLimit';
import { createSession } from '@/lib/auth';

// Zod schema for login validation
const loginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(1, 'Password is required.'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Zod input validation
    const parseResult = loginSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Please enter a valid email address and password.' },
        { status: 400 }
      );
    }

    const { email, password } = parseResult.data;

    // 2. Rate Limiting based on IP and Email to protect against brute-force
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const limitResult = await rateLimit(`login:${ip}:${email}`, 5, 300); // 5 attempts per 5 mins
    
    if (!limitResult.success) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again in 5 minutes.' },
        { status: 429 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection('users');

    // Find user
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Allow password login for any account that has a stored password hash.
    const storedPassword = user.password;
    if (typeof storedPassword !== 'string' || storedPassword.length === 0) {
      return NextResponse.json(
        { error: 'This account does not have password login enabled. Please use Google/Apple.' },
        { status: 400 }
      );
    }

    // Match password
    const isMatch = await bcrypt.compare(password, storedPassword);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 3. Create Session with rotated JWTs and Redis SAS policy
    await createSession(user._id.toString(), user.email, user.name);

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
