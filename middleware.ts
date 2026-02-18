import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  // if (token) {
  //   console.log('Нет авторизации');
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // console.log('Пользователь авторизован.');
  return NextResponse.next();
}
