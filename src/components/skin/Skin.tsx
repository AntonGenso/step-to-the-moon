import { headSkin, suit } from '@/src/utils/skinData';
import ArrowLeft from '@/public/images/profile/skin/svg/arrow-left.svg';
import ArrowRight from '@/public/images/profile/skin/svg/arrow-right.svg';
import styles from './Skin.module.scss';
import { useEffect, useState } from 'react';
import { MoonProgressBar } from '@/src/uikit/MoonProgressBar/MoonProgressBar';
import { MAX_XP } from '@/src/config/gameConfig';

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
  const { name, points, skin } = data;
  const [selectedHead, setSelectedHead] = useState(0);
  const [selectedCostum, setSelectedCostum] = useState(0);

  const [hair, setHair] = useState(skin.hair);
  const [costum, setCostum] = useState(skin.costum);

  useEffect(() => {
    const curentHead = headSkin.find((item) => item.id === selectedHead);
    const currentCostum = suit.find((item) => item.id === selectedCostum);

    setHair(curentHead?.name || '');
    setCostum(currentCostum?.name || '');
  }, [selectedHead, selectedCostum]);

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
              onClick={() => {
                if (selectedHead > 0) setSelectedHead(selectedHead - 1);
              }}
            >
              <ArrowLeft />
            </button>
            <div className={styles.iconDisplay}>
              <SelectedIcon value={selectedHead} name="head" className="h-auto w-[70%]" />
            </div>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => {
                if (selectedHead < headSkin.length - 1) setSelectedHead(selectedHead + 1);
              }}
            >
              <ArrowRight />
            </button>
          </div>

          {/* Suit selector */}
          <div className={styles.selectorRow}>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => {
                if (selectedCostum > 0) setSelectedCostum(selectedCostum - 1);
              }}
            >
              <ArrowLeft />
            </button>
            <div className={styles.iconDisplay}>
              <SelectedIcon value={selectedCostum} name="suit" className="h-auto w-[80%]" />
            </div>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => {
                if (selectedCostum < suit.length - 1) setSelectedCostum(selectedCostum + 1);
              }}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
