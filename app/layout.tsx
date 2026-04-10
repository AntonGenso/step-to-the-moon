import type { Metadata } from 'next';
import { Alumni_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const alumni = Alumni_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-alumni',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ibm-plex-mono',
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
    <html>
      <body className={`${alumni.variable} ${ibmPlexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
