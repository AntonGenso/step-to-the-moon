import { headSkin, suit } from '@/src/utils/skinData';
import ArrowLeft from '@/public/images/profile/skin/svg/arrow-left.svg';
import ArrowRight from '@/public/images/profile/skin/svg/arrow-right.svg';
import styles from './Skin.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { MoonProgressBar } from '@/src/uikit/MoonProgressBar/MoonProgressBar';
import { MAX_XP } from '@/src/config/gameConfig';
import { useAuth } from '@/src/context/AuthContext';
import { updateUserSkin } from '@/src/services/userService';

interface ISuitProps {
  hair: string;
  costum: string;
}

interface ISkinProps {
  data: {
    name: string;
    points: number;
    place: number;
    avatar: string;
    skin: {
      hair: string;
      costum: string;
    };
  };
}

const SelectedSuit = ({ hair, costum }: ISuitProps) => {
  const mainSuit = suit.find((item) => item.name === costum);
  const mainHead = headSkin.find((item) => item.name === hair);

  const SuitIcon = mainSuit?.icon || suit[0].icon;
  const HeadIcon = mainHead?.icon || headSkin[0].icon;

  return (
    <div className={styles.skinWrapper}>
      <HeadIcon className={styles.headIcon} />
      <SuitIcon className={styles.costumIcon} />
    </div>
  );
};

const SelectedIcon = ({
  value,
  name,
  className,
}: {
  value: number;
  name: string;
  className: string;
}) => {
  let costum;

  if (name === 'suit') {
    costum = suit.find((item) => item.id === value);
  } else {
    costum = headSkin.find((item) => item.id === value);
  }

  const Icon = costum?.icon || suit[0].icon;

  return <Icon className={className} />;
};

export const Skin = ({ data }: ISkinProps) => {
  const { name, points } = data;
  const { nickname, profile } = useAuth();

  const [selectedHead, setSelectedHead] = useState(profile?.skin?.headId ?? 0);
  const [selectedCostum, setSelectedCostum] = useState(profile?.skin?.suitId ?? 0);

  useEffect(() => {
    if (profile?.skin) {
      setSelectedHead(profile.skin.headId);
      setSelectedCostum(profile.skin.suitId);
    }
  }, [profile?.skin?.headId, profile?.skin?.suitId]);

  const hair = headSkin.find((item) => item.id === selectedHead)?.name ?? headSkin[0].name;
  const costum = suit.find((item) => item.id === selectedCostum)?.name ?? suit[0].name;

  const saveSkin = useCallback(
    (headId: number, suitId: number) => {
      if (nickname) {
        updateUserSkin(nickname, { headId, suitId });
      }
    },
    [nickname],
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
      {/* Left: Character Preview */}
      <div className={styles.leftSide}>
        <SelectedSuit hair={hair} costum={costum} />
      </div>

      {/* Right: Controls */}
      <div className={styles.rightSide}>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.points}>
          {points}/{MAX_XP} XP
        </p>

        <div className={styles.progressBarWrapper}>
          <MoonProgressBar progress={points} distance={MAX_XP} />
        </div>

        <div className={styles.selectorsWrapper}>
          {/* Head selector */}
          <div className={styles.selectorRow}>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={handlePrevHead}
            >
              <ArrowLeft />
            </button>
            <div className={styles.iconDisplay}>
              <SelectedIcon value={selectedHead} name="head" className="h-auto w-[70%]" />
            </div>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={handleNextHead}
            >
              <ArrowRight />
            </button>
          </div>

          {/* Suit selector */}
          <div className={styles.selectorRow}>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={handlePrevCostum}
            >
              <ArrowLeft />
            </button>
            <div className={styles.iconDisplay}>
              <SelectedIcon value={selectedCostum} name="suit" className="h-auto w-[80%]" />
            </div>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={handleNextCostum}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
