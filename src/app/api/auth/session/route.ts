import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await verifySession();

    if (!user) {
      return NextResponse.json(
        { authenticated: false, error: 'Session expired or invalid.' },
        { status: 200 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user,
    });
  } catch (error) {
    console.error('Session API Error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
