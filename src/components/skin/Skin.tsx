import { boyHead, suit } from '@/src/utils/skinData';
import Star from '@/public/images/profile/skin/svg/star.svg';
import ArrowLeft from '@/public/images/profile/skin/svg/arrow-left.svg';
import ArrowRight from '@/public/images/profile/skin/svg/arrow-right.svg';
import styles from './Skin.module.scss';
import { useEffect, useState } from 'react';
import { MoonProgressBar } from '@/src/uikit/MoonProgressBar/MoonProgressBar';

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
  const mainHead = boyHead.find((item) => item.name === hair);

  const SuitIcon = mainSuit?.icon || suit[0].icon;
  const HeadIcon = mainHead?.icon || boyHead[0].icon;

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
    costum = boyHead.find((item) => item.id === value);
  }

  const Icon = costum?.icon || suit[0].icon;

  return <Icon className={className} />;
};

export const Skin = ({ data }: ISkinProps) => {
  const { name, points, place, skin } = data;
  const [selectedHead, setSelectedHead] = useState(0);
  const [selectedCostum, setSelectedCostum] = useState(0);

  const [hair, setHair] = useState(skin.hair);
  const [costum, setCostum] = useState(skin.costum);

  useEffect(() => {
    const curentHead = boyHead.find((item) => item.id === selectedHead);
    const currentCostum = suit.find((item) => item.id === selectedCostum);

    setHair(curentHead?.name || '');
    setCostum(currentCostum?.name || '');
  }, [selectedHead, selectedCostum]);

  return (
    <div className={styles.skinContainer}>
      <div className={`flex w-full flex-row items-center justify-between ${styles.titleWrapper}`}>
        <div className="flex w-[50%] items-center justify-between">
          <h1 className={styles.title}>{name}</h1>
          <div className="flex items-center gap-[16px]">
            <Star />
            <p className={styles.place}>{place}</p>
          </div>
        </div>
        <div className={styles.progressBarWrapper}>
          <MoonProgressBar progress={points} distance={384400} />
        </div>
      </div>
      <div className="mt-auto flex h-full w-full">
        <div className="bg-blue flex h-full w-[50%] bg-[url('/images/profile/skin/backlight.webp')] bg-cover bg-center">
          <SelectedSuit hair={hair} costum={costum} />
        </div>
        <div className={`flex h-full w-[50%] flex-col items-center ${styles.rightSide}`}>
          <p className={styles.points}>
            {points}/{384400}
          </p>
          <div className={styles.rightSideContent}>
            <div className="flex">
              <button
                type="button"
                onClick={() => {
                  if (selectedHead > 0) {
                    setSelectedHead(selectedHead - 1);
                  }
                }}
              >
                <ArrowLeft className="w-full" />
              </button>
              <div className={styles.headIconWrapper}>
                {<SelectedIcon value={selectedHead} name="head" className="h-auto w-[80%]" />}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (selectedHead < boyHead.length - 1) {
                    setSelectedHead(selectedHead + 1);
                  }
                }}
              >
                <ArrowRight className="w-full" />
              </button>
            </div>
            <div className="flex">
              <button
                type="button"
                onClick={() => {
                  if (selectedCostum > 0) {
                    setSelectedCostum(selectedCostum - 1);
                  }
                }}
              >
                <ArrowLeft className="w-full" />
              </button>
              <div className={styles.suitIconWrapper}>
                {<SelectedIcon value={selectedCostum} name="suit" className="h-auto w-[100%]" />}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (selectedCostum < suit.length - 1) {
                    setSelectedCostum(selectedCostum + 1);
                  }
                }}
              >
                <ArrowRight className="w-full" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
