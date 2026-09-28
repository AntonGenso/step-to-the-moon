import { NextRequest, NextResponse } from 'next/server';
import { getRefreshToken, decodeToken, clearSessionCookie } from '@/src/services/session';
import { revokeSession, getMe } from '@/src/services/sttmServer';
import { withStudentAuth } from '@/src/services/withStudentAuth';

/**
 * Reports the current session. Goes through withStudentAuth so a session whose
 * access token lapsed while the app was closed is transparently refreshed here
 * on mount — and the roles it returns are the fresh ones from that refresh.
 */
export const GET = (req: NextRequest) =>
  withStudentAuth(req, async (token) => {
    const payload = decodeToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Признака согласия в токене нет — он меняется без перевыпуска, поэтому
    // читается из профиля. Недоступный профиль не должен выкидывать игрока из
    // сессии: считаем согласие данным, блокировать по сетевой ошибке нельзя.
    let termsAccepted = true;
    try {
      termsAccepted = (await getMe(token)).termsAccepted !== false;
    } catch {
      termsAccepted = true;
    }

    return NextResponse.json({
      nickname: payload.name,
      roles: payload.roles,
      termsAccepted,
    });
  });

export const DELETE = async (req: NextRequest) => {
  // Best-effort server-side revoke so the refresh token can't be reused.
  const refreshToken = getRefreshToken(req);
  if (refreshToken) {
    try {
      await revokeSession(refreshToken);
    } catch {
      // A network/backend hiccup shouldn't block the client-side logout.
    }
  }

  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response);
  return response;
};
