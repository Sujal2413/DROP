import { NextResponse } from 'next/server';

// Temporary mock store (would be replaced by actual DB in production)
const subscribers: Set<string> = new Set();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (subscribers.has(normalizedEmail)) {
      return NextResponse.json(
        { success: false, error: 'This email is already subscribed.' },
        { status: 409 }
      );
    }

    // Save subscriber
    subscribers.add(normalizedEmail);
    
    // Simulating delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to the DROP. newsletter.',
        timestamp: new Date().toISOString()
      },
      { status: 201 }
    );
  } catch (error) {
    // Keep error logged for server side debugging but unused in response
    console.error("Newsletter API Error:", error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
