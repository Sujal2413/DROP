import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import { createSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { credential } = await request.json();

    if (!credential) {
      return NextResponse.json(
        { error: 'Credential is required.' },
        { status: 400 }
      );
    }

    // Decode mock JWT token sent from Apple simulation popup
    const decodedPayload = jwt.decode(credential) as { email: string; name?: string } | null;
    if (!decodedPayload) {
      return NextResponse.json(
        { error: 'Invalid Apple token.' },
        { status: 400 }
      );
    }

    return await handleUserPersistence({
      email: decodedPayload.email,
      name: decodedPayload.name || 'Apple User',
    });
  } catch (error) {
    console.error('Apple OAuth API Error:', error);
    return NextResponse.json(
      { error: 'Authentication failed.' },
      { status: 500 }
    );
  }
}

async function handleUserPersistence(appleUser: { email: string; name: string }) {
  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection('users');

  const email = appleUser.email.toLowerCase();

  // Search user in database
  let user = await usersCollection.findOne({ email });

  if (!user) {
    // Register new OAuth user
    const newUser = {
      name: appleUser.name,
      email,
      provider: 'apple',
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
