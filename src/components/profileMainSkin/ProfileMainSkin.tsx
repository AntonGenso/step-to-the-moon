'use client';

import Image from 'next/image';
import MoonImage from '@/public/images/profile/svg/planet_profile.png';
import styles from './ProfileMainSkin.module.scss';
import { headSkin, suit } from '@/src/utils/skinData';
import { useEffect, useState } from 'react';

interface ISkin {
  hair: string;
  costume: string;
}

export const ProfileMainSkin = () => {
  const [skin, setSkin] = useState<ISkin | null>({
    hair: headSkin[0].icon,
    costume: suit[0].icon,
  });

  useEffect(() => {
    const stored = localStorage.getItem('skin');

    if (stored) {
      setSkin(JSON.parse(stored));
    }

    const handleStorageChange = () => {
      const newSkin = localStorage.getItem('skin');
      if (newSkin) {
        setSkin(JSON.parse(newSkin));
      }
    };

    window.addEventListener('skinChange', handleStorageChange);

    return () => {
      window.removeEventListener('skinChange', handleStorageChange);
    };
  }, []);

  const hair = headSkin[0].icon;
  const costum = suit[0].icon;

  const AstronautHead = hair?.icon;
  const AstronautSuit = costum?.icon;

  return (
    <>
      <Image src={MoonImage} width={500} height={500} alt="moon" className={styles.moon} />
      {skin && AstronautHead && AstronautSuit && (
        <>
          <AstronautHead className="absolute bottom-[561px] left-[140px] z-30 h-auto w-[260px]" />
          <AstronautSuit className="absolute bottom-[370px] left-[140px] z-20 h-auto w-[260px]" />
        </>
      )}
    </>
  );
};
