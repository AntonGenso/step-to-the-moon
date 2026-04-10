'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/src/i18n/navigation';

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = () => {
    const nextLocale = locale === 'ru' ? 'uz' : 'ru';
    router.replace(pathname, { locale: nextLocale });
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
