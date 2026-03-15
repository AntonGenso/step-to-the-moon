'use client';

import { usePathname } from 'next/navigation';
import Header from '@/src/components/header/header';
import Footer from '@/src/components/footer/footer';
import { useMediaQuery } from '@/src/hooks/useMediaQuery';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const hideLayout = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isProfile = pathname.startsWith('/profile');
  const hideFooter = isProfile;
  const hideHeader = hideLayout || (isProfile && isMobile);

  return (
    <>
      {!hideHeader && <Header />}
      <main className={hideHeader ? '' : 'pt-30'}>{children}</main>
      {!hideLayout && !hideFooter && <Footer />}
    </>
  );
}
