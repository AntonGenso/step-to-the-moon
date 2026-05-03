'use client';

import { Suspense } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/src/i18n/navigation';
import { useSearchParams } from 'next/navigation';

const LanguageSwitcherInner = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSwitch = () => {
    const nextLocale = locale === 'ru' ? 'uz' : 'ru';
    const query = searchParams.toString();
    const href = query ? `${pathname}?${query}` : pathname;
    router.replace(href, { locale: nextLocale });
  };

  return (
    <button
      onClick={handleSwitch}
      className="cursor-pointer rounded-md border border-white/30 px-2 py-1 text-sm font-bold text-white transition-colors hover:bg-white/10"
    >
      {locale === 'ru' ? 'UZ' : 'RU'}
    </button>
  );
};

export const LanguageSwitcher = () => (
  <Suspense fallback={null}>
    <LanguageSwitcherInner />
  </Suspense>
);
