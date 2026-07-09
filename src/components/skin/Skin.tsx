import { headSkin, suit } from '@/src/utils/skinData';
import styles from './Skin.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { updateUserSkin } from '@/src/services/userService';
import { MAX_XP } from '@/src/config/gameConfig';
import ArrowIcon from '@/public/images/svg/mobile/other/arrow.svg';

export const Skin = () => {
  const { nickname, profile } = useAuth();

  const [selectedHead, setSelectedHead] = useState(profile?.skin?.headId ?? 0);
  const [selectedCostum, setSelectedCostum] = useState(profile?.skin?.suitId ?? 0);

  useEffect(() => {
    if (profile?.skin) {
      setSelectedHead(profile.skin.headId);
      setSelectedCostum(profile.skin.suitId);
    }
  }, [profile?.skin?.headId, profile?.skin?.suitId]);

  const HeadIcon = (headSkin.find((item) => item.id === selectedHead) ?? headSkin[0]).icon;
  const SuitIcon = (suit.find((item) => item.id === selectedCostum) ?? suit[0]).icon;

  const total = profile?.leaderboard?.total ?? 0;
  const progress = MAX_XP > 0 ? Math.min((total / MAX_XP) * 100, 100) : 0;

  const saveSkin = useCallback(
    (headId: number, suitId: number) => {
      if (nickname) {
        updateUserSkin(nickname, { headId, suitId });
      }
    },
    [nickname]
  );

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
    <div className={styles.skinContainer}>
      {/* Profile badge: nickname + vertical XP bar + avatar */}
      <div className={styles.profileBadge}>
        <span className={styles.badgeNick}>{nickname ?? ''}</span>
        <div className={styles.badgePill}>
          <span className={styles.badgeValue}>
            {total}/{MAX_XP}
          </span>
          <div className={styles.badgeTrack}>
            <div className={styles.badgeFill} style={{ height: `${progress}%` }} />
          </div>
          <div className={styles.badgeAvatar}>
            <HeadIcon className={styles.badgeAvatarIcon} />
          </div>
        </div>
      </div>

      {/* Character stage with head/suit selectors */}
      <div className={styles.stage}>
        <div className={styles.characterColumn}>
          {/* Head with arrows */}
          <div className={styles.headRow}>
            <button type="button" className={styles.arrowLeft} onClick={handlePrevHead}>
              <ArrowIcon className={styles.arrowIcon} />
            </button>
            <div className={styles.headSlot}>
              <HeadIcon className={styles.headIcon} />
            </div>
            <button type="button" className={styles.arrowRight} onClick={handleNextHead}>
              <ArrowIcon className={styles.arrowIcon} />
            </button>
          </div>

          {/* Costume with arrows */}
          <div className={styles.costumRow}>
            <button type="button" className={styles.arrowLeft} onClick={handlePrevCostum}>
              <ArrowIcon className={styles.arrowIcon} />
            </button>
            <SuitIcon className={styles.costumIcon} />
            <button type="button" className={styles.arrowRight} onClick={handleNextCostum}>
              <ArrowIcon className={styles.arrowIcon} />
            </button>
          </div>

          <div className={styles.platform} />
        </div>
      </div>
    </div>
  );
};
