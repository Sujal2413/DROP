/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { rateLimit } from '@/lib/rateLimit';

// Zod schema for registration validation
const registerSchema = z.object({
  name: z.string().min(2).max(100).trim().transform((val) => val.replace(/[<>]/g, '')),
  email: z.string().email().max(254).toLowerCase().trim(),
  password: z.string().min(8, 'Password must be at least 8 characters.').max(100)
    .regex(/[a-z]/, 'Password must contain a lowercase letter.')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter.')
    .regex(/[0-9]/, 'Password must contain a number.'),
});

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
    const parseResult = registerSchema.safeParse(body);
    
    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues.map(err => err.message).join('. ');
      return NextResponse.json(
        { error: errorMsg || 'Invalid input data.' },
        { status: 400 }
      );
    }

    const { name, email, password } = parseResult.data;

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      const existingPassword = existingUser.password;
      const hasPassword = typeof existingPassword === 'string' && existingPassword.length > 0;

      if (!hasPassword) {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        await usersCollection.updateOne(
          { _id: existingUser._id },
          {
            $set: {
              name: existingUser.name || name,
              password: hashedPassword,
              passwordEnabledAt: new Date(),
              updatedAt: new Date(),
            },
          }
        );

        return NextResponse.json(
          { message: 'Password login enabled successfully.' },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: 'User with this email already exists.' },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      provider: 'credentials',
      createdAt: new Date(),
    };

    await usersCollection.insertOne(newUser);

    return NextResponse.json(
      { message: 'User registered successfully.' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
