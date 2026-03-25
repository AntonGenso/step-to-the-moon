'use client';

import { usePathname } from 'next/navigation';
import Header from '@/src/components/header/header';
import Footer from '@/src/components/footer/footer';
import { useMediaQuery } from '@/src/hooks/useMediaQuery';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const hideLayout = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isAppPage = pathname === '/' || pathname.startsWith('/test/');
  const hideFooter = isAppPage;
  const hideHeader = hideLayout || (isAppPage && isMobile);

  return (
    <div className="flex h-screen flex-col">
      {!hideHeader && <Header />}
      <main className="min-h-0 flex-1">{children}</main>
      {!hideLayout && !hideFooter && <Footer />}
    </div>
  );
}
