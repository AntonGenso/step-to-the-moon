'use client';

import { useState, useEffect } from 'react';
import { headSkin, suit } from '@/src/utils/skinData';
import styles from './MobileSkin.module.scss';

interface IMobileSkinProps {
  data: {
    name: string;
    points: number;
    place: number;
    skin: {
      hair: string;
      costum: string;
    };
  };
}

export const MobileSkin = ({ data }: IMobileSkinProps) => {
  const { skin } = data;
  const [selectedHead, setSelectedHead] = useState(0);
  const [selectedCostum, setSelectedCostum] = useState(0);
  const [hair, setHair] = useState(skin.hair);
  const [costum, setCostum] = useState(skin.costum);

  useEffect(() => {
    const currentHead = headSkin.find((item) => item.id === selectedHead);
    const currentCostum = suit.find((item) => item.id === selectedCostum);
    setHair(currentHead?.name || '');
    setCostum(currentCostum?.name || '');
  }, [selectedHead, selectedCostum]);

  const mainSuit = suit.find((item) => item.name === costum) || suit[0];
  const mainHead = headSkin.find((item) => item.name === hair) || headSkin[0];

  const SuitIcon = mainSuit.icon;
  const HeadIcon = mainHead.icon;

  return (
    <div className={styles.mobileSkin}>
      <div className={styles.characterArea}>
        <div className={styles.characterWrapper}>
          <HeadIcon className={styles.headIcon} />
          <SuitIcon className={styles.costumIcon} />
        </div>
      </div>
    </div>
  );
};
