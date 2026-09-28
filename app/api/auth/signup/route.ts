import { NextRequest, NextResponse } from 'next/server';
import { validateNewNickname, validatePin } from '@/src/services/validators';
import { registerStudent, SttmError } from '@/src/services/sttmServer';
import { setSession } from '@/src/services/session';

export const POST = async (req: NextRequest) => {
  try {
    const { nickname, pin, classCode, termsAccepted } = await req.json();

    if (validateNewNickname(nickname ?? '')) {
      return NextResponse.json({ error: 'Invalid nickname' }, { status: 400 });
    }
    if (validatePin(pin ?? '')) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 400 });
    }

    // Код класса необязателен: без него ученик регистрируется вне класса и
    // войдёт в него позже. Непустой, но неверный код сервер по-прежнему
    // отклоняет — иначе опечатка молча оставляла бы ребёнка без класса.
    const code = typeof classCode === 'string' && classCode.trim() ? classCode.trim() : null;

    const { user, token, refreshToken } = await registerStudent(
      nickname,
      pin,
      code,
      termsAccepted === true,
    );

    const response = NextResponse.json({ ok: true, nickname: user.name });
    setSession(response, token, refreshToken);
    return response;
  } catch (error) {
    if (error instanceof SttmError) {
      // A taken nickname (409) or an unknown/invalid class code (404/400) is a
      // user-facing message; anything else is a server fault.
      if (error.status === 409) {
        return NextResponse.json({ error: 'This nickname is already taken' }, { status: 409 });
      }
      if (error.status === 404 || error.status === 400) {
        return NextResponse.json({ error: 'Invalid class code' }, { status: 400 });
      }
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
};
