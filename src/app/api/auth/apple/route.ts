import { NextResponse } from 'next/server';

/**
 * Apple Sign-In endpoint — DISABLED
 * 
 * The previous implementation used jwt.decode() (no signature verification),
 * which allows any attacker to forge a token and create/login as any user.
 * 
 * To re-enable, implement proper Apple JWKS verification:
 * https://developer.apple.com/documentation/sign_in_with_apple/fetch_apple_s_public_key_for_verifying_token_signature
 */
export async function POST() {
  return NextResponse.json(
    { error: 'Apple Sign-In is not currently available. Please use Google or email/password.' },
    { status: 501 }
  );
}
