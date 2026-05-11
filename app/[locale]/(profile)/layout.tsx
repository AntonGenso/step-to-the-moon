import type { Metadata } from 'next';
import LayoutWrapper from '@/src/components/LayoutWrapper';

export const metadata: Metadata = {
  title: 'Galaxy Academy',
  description: '',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
