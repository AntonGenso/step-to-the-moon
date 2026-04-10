import type { Metadata } from 'next';
import LayoutWrapper from '@/src/components/LayoutWrapper';
import { cookies } from 'next/headers';
import { redirect } from '@/src/i18n/navigation';

export const metadata: Metadata = {
  title: 'Galaxy Academy',
  description: '',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();

  const session = cookieStore.get('session');

  if (!session) {
    redirect('/login');
  }

  return <LayoutWrapper>{children}</LayoutWrapper>;
}
