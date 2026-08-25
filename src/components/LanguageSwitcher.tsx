'use client';

import { Suspense } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/src/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { routing } from '@/src/i18n/routing';

type Locale = (typeof routing.locales)[number];

/**
 * Both languages are always shown side by side and the active one is
 * highlighted — same switcher as in sttm-admin. Here the choice lives in the
 * URL locale segment, so picking a language replaces the current route with
 * its counterpart instead of writing to localStorage.
 */
const LanguageSwitcherInner = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSwitch = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    const query = searchParams.toString();
    const href = query ? `${pathname}?${query}` : pathname;
    router.replace(href, { locale: nextLocale });
  };

  return (
    <div className="flex items-center rounded-full border border-cyan-bright/25 bg-[rgba(2,37,51,0.5)] p-0.5">
      {routing.locales.map((lang) => {
        const isActive = lang === locale;
        return (
          <button
            key={lang}
            type="button"
            aria-pressed={isActive}
            onClick={() => handleSwitch(lang)}
            className={`cursor-pointer rounded-full px-3 py-1 font-ibm-plex-mono text-sm uppercase tracking-widest transition-colors ${
              isActive
                ? 'bg-cyan-bright/20 text-cyan-bright'
                : 'text-grey hover:text-white'
            }`}
          >
            {lang}
          </button>
        );
      })}
    </div>
  );
};

export const LanguageSwitcher = () => (
  <Suspense fallback={null}>
    <LanguageSwitcherInner />
  </Suspense>
);
