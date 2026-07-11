/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { OAuth2Client } from 'google-auth-library';
import { createSession } from '@/lib/auth';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || '';

export async function POST(request: Request) {
  try {
    const { credential } = await request.json();

    if (!credential) {
      return NextResponse.json(
        { error: 'ID Token is required.' },
        { status: 400 }
      );
    }

    if (!GOOGLE_CLIENT_ID) {
      console.error('GOOGLE_CLIENT_ID is not configured. Google Sign-In is unavailable.');
      return NextResponse.json(
        { error: 'Google Sign-In is currently unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Verify token using official Google client library
    const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.json(
        { error: 'Failed to verify Google credentials.' },
        { status: 400 }
      );
    }

    return await handleUserPersistence({
      email: payload.email,
      name: payload.name || 'Google User',
    });
  } catch (error: any) {
    console.error('Google OAuth API Error:', error);
    return NextResponse.json(
      { error: 'Authentication failed. Please verify credentials.' },
      { status: 500 }
    );
  }
}

async function handleUserPersistence(googleUser: { email: string; name: string }) {
  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection('users');

  const email = googleUser.email.toLowerCase();

  // Search user in database
  let user = await usersCollection.findOne({ email });

  if (!user) {
    // Register new OAuth user
    const newUser = {
      name: googleUser.name,
      email,
      provider: 'google',
      createdAt: new Date(),
    };
    const result = await usersCollection.insertOne(newUser);
    user = {
      _id: result.insertedId,
      ...newUser,
    };
  }

  // Use centralized session creation (registers session in Redis & sets cookies)
  await createSession(user._id.toString(), user.email, user.name);

  return NextResponse.json({
    success: true,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
  });
}
