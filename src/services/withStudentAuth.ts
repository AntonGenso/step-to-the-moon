/**
 * Auth wrapper for the game's Next.js route handlers.
 *
 * The access token now lives ~15 min, so route handlers can no longer assume
 * the session cookie holds a still-valid JWT. This wrapper resolves a usable
 * access token — refreshing it via the refresh cookie when the current one is
 * expired (or about to be) — runs the handler with it, and writes any rotated
 * tokens back onto the response so the browser stays in sync.
 *
 * Refresh is proactive (driven by the JWT `exp`), which is enough here: access
 * tokens are self-contained and stay valid until they expire, regardless of the
 * refresh-token table.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getToken, getRefreshToken, decodeToken, setSession, clearSessionCookie } from './session';
import { refreshSession, type AuthResult } from './sttmServer';

// Refresh a touch before the real expiry so a request that starts with a
// barely-valid token doesn't reach the backend after it lapses.
const REFRESH_SKEW_MS = 10_000;

type Resolved = { token: string; refreshed?: AuthResult } | { token: null; response: NextResponse };

const unauthenticated = (message: string): { token: null; response: NextResponse } => {
  const response = NextResponse.json({ error: message }, { status: 401 });
  clearSessionCookie(response);
  return { token: null, response };
};

const resolveToken = async (req: NextRequest): Promise<Resolved> => {
  const access = getToken(req);
  const payload = access ? decodeToken(access) : null;
  const stillValid = !!payload?.exp && payload.exp * 1000 > Date.now() + REFRESH_SKEW_MS;

  if (access && stillValid) {
    return { token: access };
  }

  const refresh = getRefreshToken(req);
  if (!refresh) {
    return unauthenticated('Not authenticated');
  }

  try {
    const refreshed = await refreshSession(refresh);
    return { token: refreshed.token, refreshed };
  } catch {
    return unauthenticated('Session expired');
  }
};

export const withStudentAuth = async (
  req: NextRequest,
  handler: (token: string) => Promise<NextResponse>
): Promise<NextResponse> => {
  const resolved = await resolveToken(req);
  if (resolved.token === null) {
    return resolved.response;
  }

  const response = await handler(resolved.token);

  if (resolved.refreshed) {
    setSession(response, resolved.refreshed.token, resolved.refreshed.refreshToken);
  }
  return response;
};
