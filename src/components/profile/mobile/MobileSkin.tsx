'use client';

import { useState, useCallback, useEffect } from 'react';
import { headSkin, suit } from '@/src/utils/skinData';
import { useAuth } from '@/src/context/AuthContext';
import { updateUserSkin } from '@/src/services/userService';
import styles from './MobileSkin.module.scss';
import ArrowIcon from '@/public/images/svg/mobile/other/arrow.svg';

export const MobileSkin = () => {
  const { nickname, profile } = useAuth();

  const [selectedHead, setSelectedHead] = useState(profile?.skin?.headId ?? 0);
  const [selectedCostum, setSelectedCostum] = useState(profile?.skin?.suitId ?? 0);

  useEffect(() => {
    if (profile?.skin) {
      setSelectedHead(profile.skin.headId);
      setSelectedCostum(profile.skin.suitId);
    }
  }, [profile?.skin?.headId, profile?.skin?.suitId]);

  const saveSkin = useCallback(
    (headId: number, suitId: number) => {
      if (nickname) {
        updateUserSkin(nickname, { headId, suitId });
      }
    },
    [nickname],
  );

  const HeadIcon = (headSkin.find((h) => h.id === selectedHead) ?? headSkin[0]).icon;
  const SuitIcon = (suit.find((s) => s.id === selectedCostum) ?? suit[0]).icon;

  const handlePrevHead = () => {
    setSelectedHead((prev) => {
      const next = prev <= 0 ? headSkin.length - 1 : prev - 1;
      saveSkin(next, selectedCostum);
      return next;
    });
  };

  const handleNextHead = () => {
    setSelectedHead((prev) => {
      const next = prev >= headSkin.length - 1 ? 0 : prev + 1;
      saveSkin(next, selectedCostum);
      return next;
    });
  };

  const handlePrevCostum = () => {
    setSelectedCostum((prev) => {
      const next = prev <= 0 ? suit.length - 1 : prev - 1;
      saveSkin(selectedHead, next);
      return next;
    });
  };

  const handleNextCostum = () => {
    setSelectedCostum((prev) => {
      const next = prev >= suit.length - 1 ? 0 : prev + 1;
      saveSkin(selectedHead, next);
      return next;
    });
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
              <ArrowIcon className={styles.arrowIcon} />
            </button>
            <div className="flex min-w-[129px] w-[34vw] items-center justify-end">
              <HeadIcon className={styles.headIcon} />
            </div>
            <button className={styles.arrowRight} onClick={handleNextHead}>
              <ArrowIcon className={styles.arrowIcon} />
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
