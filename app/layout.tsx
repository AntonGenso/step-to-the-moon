import type { Metadata } from 'next';
import { Alumni_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/src/context/AuthContext';

const alumni = Alumni_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-alumni',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Galaxy Academy',
  description: '',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={alumni.variable}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
