import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('session')?.value;

  // Strip locale prefix to get the "real" path
  const pathnameWithoutLocale = pathname.replace(/^\/(uz)/, '') || '/';
  const isAuthPage =
    pathnameWithoutLocale === '/login' || pathnameWithoutLocale === '/signup';

  // Authenticated user on login/signup → redirect to home
  if (session && isAuthPage) {
    const locale = pathname.startsWith('/uz') ? 'uz' : 'ru';
    const redirectUrl = locale === 'uz' ? '/uz' : '/';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
