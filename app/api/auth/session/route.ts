import { NextRequest, NextResponse } from 'next/server';
import {
  getToken,
  decodeToken,
  clearSessionCookie,
} from '@/src/services/session';

export const GET = async (req: NextRequest) => {
  const token = getToken(req);
  const payload = token ? decodeToken(token) : null;

  if (!payload) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  return NextResponse.json({ nickname: payload.name, roles: payload.roles });
};

export const DELETE = async () => {
  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response);
  return response;
};
