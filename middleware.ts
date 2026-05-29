import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('session')?.value;

  const locale = pathname.startsWith('/uz') ? 'uz' : 'ru';

  // Strip locale prefix to get the "real" path
  const pathnameWithoutLocale = pathname.replace(/^\/(uz)/, '') || '/';
  const isPublicPage =
    pathnameWithoutLocale === '/login' ||
    pathnameWithoutLocale === '/signup' ||
    pathnameWithoutLocale === '/intro';

  // Authenticated user on public auth/intro pages → redirect to home
  if (session && isPublicPage) {
    const redirectUrl = locale === 'uz' ? '/uz' : '/';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Unauthenticated user on any protected page → show intro first
  if (!session && !isPublicPage) {
    const introUrl = locale === 'uz' ? '/uz/intro' : '/intro';
    return NextResponse.redirect(new URL(introUrl, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
