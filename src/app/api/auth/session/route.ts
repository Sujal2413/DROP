import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'drop_default_secret_key';

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    
    // Simple helper to parse cookie
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map((c) => c.trim().split('='))
    );
    
    const token = cookies['drop_session'];

    if (!token) {
      return NextResponse.json(
        { authenticated: false, error: 'No session cookie found.' },
        { status: 200 }
      );
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      return NextResponse.json({
        authenticated: true,
        user: {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
        },
      });
    } catch (err) {
      return NextResponse.json(
        { authenticated: false, error: 'Session has expired or is invalid.' },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Session API Error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
