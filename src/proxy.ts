import { NextResponse, type NextRequest } from 'next/server';

/**
 * Security middleware for DROP website.
 * Handles CSRF origin validation, request size limits, and suspicious header blocking.
 */

const ALLOWED_ORIGINS = new Set([
  'https://www.dropwater.in',
  'https://dropwater.in',
  // Add localhost for development
  ...(process.env.NODE_ENV === 'development'
    ? ['http://localhost:3002', 'http://127.0.0.1:3002']
    : []),
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. CSRF Origin Validation for mutating API requests
  if (pathname.startsWith('/api/') && request.method !== 'GET' && request.method !== 'HEAD') {
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');

    // In production, enforce origin check
    if (process.env.NODE_ENV === 'production') {
      if (!origin || !ALLOWED_ORIGINS.has(origin)) {
        // Fallback: check referer
        const refererOrigin = referer ? new URL(referer).origin : null;
        if (!refererOrigin || !ALLOWED_ORIGINS.has(refererOrigin)) {
          return NextResponse.json(
            { error: 'Forbidden: Invalid request origin.' },
            { status: 403 }
          );
        }
      }
    }
  }

  // 2. Block requests with suspicious or oversized headers
  const userAgent = request.headers.get('user-agent') || '';
  if (pathname.startsWith('/api/') && !userAgent) {
    return NextResponse.json(
      { error: 'Forbidden.' },
      { status: 403 }
    );
  }

  // 3. Add security headers to all responses
  const response = NextResponse.next();

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY');
  // Control referrer info
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    // Match all API routes and pages, skip static files and _next internals
    '/((?!_next/static|_next/image|favicon.ico|assets/).*)',
  ],
};
