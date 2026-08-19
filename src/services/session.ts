/**
 * Session helpers for the Next.js route handlers. The session cookie holds the
 * sttm-server JWT; it is httpOnly so the browser can never read the token, only
 * send it back with same-origin requests to `/api/**`.
 */
import { NextRequest, NextResponse } from 'next/server';

export const SESSION_COOKIE = 'session';
export const REFRESH_COOKIE = 'refresh';
// The access JWT lives ~15 min; the cookie itself is kept as long as the
// refresh token so a returning visitor still carries something to refresh with.
// decodeToken reads an expired JWT fine (it never verifies), so keeping the
// stale access cookie around lets us read the nickname before refreshing.
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days, matches the refresh token

export interface TokenPayload {
  sub: number;
  name: string;
  roles: string[];
  exp?: number;
}

/** Reads the JWT from the request cookie, or null when there is none. */
export const getToken = (req: NextRequest): string | null =>
  req.cookies.get(SESSION_COOKIE)?.value ?? null;

/** Reads the refresh token from its cookie, or null when there is none. */
export const getRefreshToken = (req: NextRequest): string | null =>
  req.cookies.get(REFRESH_COOKIE)?.value ?? null;

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

const cookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge,
});

/** Writes the JWT into the httpOnly session cookie on a response. */
export const setSessionCookie = (res: NextResponse, token: string): void => {
  res.cookies.set(SESSION_COOKIE, token, cookieOptions(SESSION_MAX_AGE));
};

/** Writes the refresh token into its own httpOnly cookie. */
export const setRefreshCookie = (res: NextResponse, token: string): void => {
  res.cookies.set(REFRESH_COOKIE, token, cookieOptions(SESSION_MAX_AGE));
};

/**
 * Persists a full session (access + refresh) after login/signup/refresh. The
 * server always hands out both together, so writing them together keeps them
 * in step.
 */
export const setSession = (res: NextResponse, token: string, refreshToken: string): void => {
  setSessionCookie(res, token);
  setRefreshCookie(res, refreshToken);
};

/** Clears both auth cookies (logout). */
export const clearSessionCookie = (res: NextResponse): void => {
  res.cookies.set(SESSION_COOKIE, '', cookieOptions(0));
  res.cookies.set(REFRESH_COOKIE, '', cookieOptions(0));
};
