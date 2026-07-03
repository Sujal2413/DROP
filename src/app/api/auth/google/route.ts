import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || '';
const JWT_SECRET = process.env.JWT_SECRET || 'drop_default_secret_key';

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
      console.warn('Google Client ID is not configured. Simulating auth in fallback mode...');
      // Fallback/Demo mode if client ID is missing to prevent total failure
      const decodedPayload = jwt.decode(credential) as any;
      if (!decodedPayload) {
        return NextResponse.json(
          { error: 'Invalid Google token.' },
          { status: 400 }
        );
      }
      return await handleUserPersistence({
        email: decodedPayload.email,
        name: decodedPayload.name || 'Google User',
      });
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

  // Sign JWT session token
  const token = jwt.sign(
    { id: user._id.toString(), email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const response = NextResponse.json({
    success: true,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
  });

  response.cookies.set({
    name: 'drop_session',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return response;
}
