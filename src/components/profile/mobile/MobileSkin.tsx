'use client';

import { useState, useEffect } from 'react';
import { headSkin, suit } from '@/src/utils/skinData';
import styles from './MobileSkin.module.scss';
import ArrowIcon from '@/public/images/svg/mobile/other/arrow.svg';

interface IMobileSkinProps {
  data: {
    name: string;
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

  const handlePrevCostum = () => {
    setSelectedCostum((prev) => (prev <= 0 ? suit.length - 1 : prev - 1));
  };

  const handleNextCostum = () => {
    setSelectedCostum((prev) => (prev >= suit.length - 1 ? 0 : prev + 1));
  };

  const handlePrevHead = () => {
    setSelectedHead((prev) => (prev <= 0 ? headSkin.length - 1 : prev - 1));
  };

  const handleNextHead = () => {
    setSelectedHead((prev) => (prev >= headSkin.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.mobileSkin}>
      <h2 className={styles.title}>PROFILE</h2>
      <p className={styles.subtitle}>Select a character skin</p>

      <div className={styles.characterArea}>
        <div className={styles.characterColumn}>
          {/* Head with arrows */}
          <div className={styles.headRow}>
            <button className={styles.arrowLeft} onClick={handlePrevHead}>
              <ArrowIcon className={styles.arrowIconSmall} />
            </button>
            <HeadIcon className={styles.headIcon} />
            <button className={styles.arrowRight} onClick={handleNextHead}>
              <ArrowIcon className={styles.arrowIconSmall} />
            </button>
          </div>

          {/* Costume with arrows */}
          <div className={styles.costumRow}>
            <button className={styles.arrowLeft} onClick={handlePrevCostum}>
              <ArrowIcon className={styles.arrowIcon} />
            </button>
            <SuitIcon className={styles.costumIcon} />
            <button className={styles.arrowRight} onClick={handleNextCostum}>
              <ArrowIcon className={styles.arrowIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
