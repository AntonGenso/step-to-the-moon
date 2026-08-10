/**
 * Session helpers for the Next.js route handlers. The session cookie holds the
 * sttm-server JWT; it is httpOnly so the browser can never read the token, only
 * send it back with same-origin requests to `/api/**`.
 */
import { NextRequest, NextResponse } from 'next/server';

export const SESSION_COOKIE = 'session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, matches the JWT lifetime

export interface TokenPayload {
  sub: number;
  name: string;
  roles: string[];
  exp?: number;
}

/** Reads the JWT from the request cookie, or null when there is none. */
export const getToken = (req: NextRequest): string | null =>
  req.cookies.get(SESSION_COOKIE)?.value ?? null;

/**
 * Decodes the JWT payload without verifying the signature. Verification is done
 * by sttm-server on every authenticated call; here we only need the nickname to
 * hydrate the UI, so an unverified read is enough (and avoids sharing the secret
 * with the front-end).
 */
export const decodeToken = (token: string): TokenPayload | null => {
  try {
    const [, payload] = token.split('.');
    const json = Buffer.from(payload, 'base64url').toString('utf8');
    return JSON.parse(json) as TokenPayload;
  } catch {
    return null;
  }
};

/** Writes the JWT into the httpOnly session cookie on a response. */
export const setSessionCookie = (res: NextResponse, token: string): void => {
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
};

/** Clears the session cookie (logout). */
export const clearSessionCookie = (res: NextResponse): void => {
  res.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
};
