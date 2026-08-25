import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

// Any configured locale can show up as a prefix — including the default one:
// next-intl's router forces a prefix when the language is switched explicitly,
// so leaving /uz/signup for Russian lands on /ru/signup before next-intl
// normalises it back to /signup. Matching only "/uz" made those URLs look like
// protected pages and bounced the visitor to /intro.
const LOCALE_PREFIX = new RegExp(`^/(${routing.locales.join('|')})(?=/|$)`);

const PUBLIC_PAGES = ['/login', '/signup', '/intro'];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('session')?.value;

  const locale = pathname.match(LOCALE_PREFIX)?.[1] ?? routing.defaultLocale;

  // Strip locale prefix to get the "real" path
  const pathnameWithoutLocale = pathname.replace(LOCALE_PREFIX, '') || '/';
  const isPublicPage = PUBLIC_PAGES.includes(pathnameWithoutLocale);

  // Keeps the visitor in the language they were browsing.
  const localized = (path: string) => {
    if (locale === routing.defaultLocale) return path;
    return path === '/' ? `/${locale}` : `/${locale}${path}`;
  };

  // Authenticated user on public auth/intro pages → redirect to home
  if (session && isPublicPage) {
    return NextResponse.redirect(new URL(localized('/'), request.url));
  }

  // Unauthenticated user on any protected page → show intro first
  if (!session && !isPublicPage) {
    return NextResponse.redirect(new URL(localized('/intro'), request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
