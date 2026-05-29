'use client';

import { useEffect } from 'react';
import { useRouter } from '@/src/i18n/navigation';

export default function IntroPage() {
  const router = useRouter();

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'intro:start') {
        router.push('/signup');
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [router]);

  return (
    <iframe
      src="/intro.html"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        border: 'none',
      }}
      title="intro"
    />
  );
}
