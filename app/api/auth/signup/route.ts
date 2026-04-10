import { NextRequest, NextResponse } from 'next/server';
import {
  nicknameExists,
  createUserProfile,
} from '@/src/services/userService';
import { validateNickname, validatePin } from '@/src/services/validators';

export const POST = async (req: NextRequest) => {
  try {
    const { nickname, pin } = await req.json();

    const nickErr = validateNickname(nickname ?? '');
    if (nickErr) {
      return NextResponse.json({ error: 'Invalid nickname' }, { status: 400 });
    }

    const pinErr = validatePin(pin ?? '');
    if (pinErr) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 400 });
    }

    const exists = await nicknameExists(nickname);
    if (exists) {
      return NextResponse.json(
        { error: 'This nickname is already taken' },
        { status: 409 },
      );
    }

    await createUserProfile(nickname, pin);

    const response = NextResponse.json({
      ok: true,
      nickname: nickname.toLowerCase(),
    });

    response.cookies.set('session', nickname.toLowerCase(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
};
