import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const nickname = req.cookies.get('session')?.value;

  if (!nickname) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  return NextResponse.json({ nickname });
};

export const DELETE = async () => {
  const response = NextResponse.json({ ok: true });

  response.cookies.set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
};
