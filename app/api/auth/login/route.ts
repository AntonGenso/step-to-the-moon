import { NextRequest, NextResponse } from 'next/server';
import { validateNickname, validatePin } from '@/src/services/validators';
import { login, SttmError } from '@/src/services/sttmServer';
import { setSessionCookie } from '@/src/services/session';

export const POST = async (req: NextRequest) => {
  try {
    const { nickname, pin } = await req.json();

    if (validateNickname(nickname ?? '') || validatePin(pin ?? '')) {
      return NextResponse.json({ error: 'Wrong nickname or PIN' }, { status: 401 });
    }

    // Nicknames are stored lower-cased at registration; match that on login so
    // "Teacher" and "teacher" resolve to the same account.
    const { user, token } = await login(nickname.trim().toLowerCase(), pin);

    const response = NextResponse.json({ ok: true, nickname: user.name });
    setSessionCookie(response, token);
    return response;
  } catch (error) {
    if (error instanceof SttmError && error.status === 401) {
      return NextResponse.json({ error: 'Wrong nickname or PIN' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
};
