import { NextResponse } from 'next/server';

export const POST = async () => {
  const response = NextResponse.json({ ok: true });

  response.cookies.set('accessToken', 'mock_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return response;
};
