import { NextRequest, NextResponse } from 'next/server';
import { getUserProfile } from '@/src/services/userService';
import { validateNickname, validatePin } from '@/src/services/validators';

export const POST = async (req: NextRequest) => {
  try {
    const { nickname, pin } = await req.json();

    const nickErr = validateNickname(nickname ?? '');
    const pinErr = validatePin(pin ?? '');
    if (nickErr || pinErr) {
      return NextResponse.json(
        { error: 'Wrong nickname or PIN' },
        { status: 401 },
      );
    }

    const profile = await getUserProfile(nickname);

    if (!profile || profile.pin !== pin) {
      return NextResponse.json(
        { error: 'Wrong nickname or PIN' },
        { status: 401 },
      );
    }

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
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
};
