import type { Metadata } from 'next';
import '../globals.css';
import LayoutWrapper from '@/src/components/LayoutWrapper';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Galaxy Academy',
  description: '',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  // const defaultClose = cookieStore.get('sidebar:state')?.value === 'false';

  const session = cookieStore.get('session');

  if (!session) {
    redirect('/login');
  }

  return <LayoutWrapper>{children}</LayoutWrapper>;
}
