import { instance } from '@/src/services/api';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { data } = await instance.post('/student/register', body);
    const response = NextResponse.json(data);

    if (data.bearer_token) {
      response.cookies.set('accessToken', data.bearer_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
    }

    return response;
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 401 });
  }
};
