import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 });
    }

    const response = NextResponse.json({ ok: true });

    response.cookies.set('accessToken', token, {
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

export const DELETE = async () => {
  const response = NextResponse.json({ ok: true });

  response.cookies.set('accessToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
};
