'use client';

import { usePathname } from '@/src/i18n/navigation';
import Header from '@/src/components/header/header';
import Footer from '@/src/components/footer/footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideLayout = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isAppPage =
    pathname === '/' || pathname.startsWith('/test/') || pathname.startsWith('/mission/');
  const hideFooter = isAppPage;

  return (
    <div className="flex h-screen flex-col">
      {!hideLayout && (
        <div className={isAppPage ? 'max-tablet:hidden' : ''}>
          <Header />
        </div>
      )}
      <main className="min-h-0 flex-1">{children}</main>
      {!hideLayout && !hideFooter && <Footer />}
    </div>
  );
}
