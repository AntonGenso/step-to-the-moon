'use client';

import React, { useState, useEffect, ElementType } from 'react';
import styles from './test.module.scss';
import BackIcon from '@/public/images/svg/mobile/other/arrow.svg';
import { LinearBorder } from '@/src/uikit/linearBorder/LinearBorder';
import { useTranslations } from 'next-intl';

interface IQuestion {
  question: string;
  options: Record<string, string>;
  answer: string;
}

interface TestProps {
  question: IQuestion;
  current: number;
  total: number;
  title?: string;
  icon?: ElementType;
  onAnswer: (option: string) => void;
  onBack?: () => void;
}

const Test: React.FC<TestProps> = ({
  question,
  current,
  total,
  title,
  icon: Icon,
  onAnswer,
  onBack,
}) => {
  const t = useTranslations('test');
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setSelected(null);
  }, [question]);

  const handleClick = (key: string) => {
    if (!selected) {
      setSelected(key);
      setTimeout(() => {
        onAnswer(key);
      }, 800);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Header bar */}
        {title && (
          <div className={styles.header}>
            <button type="button" className={styles.backBtn} onClick={onBack}>
              <BackIcon className={styles.backIcon} />
            </button>
            <div className={styles.titleBadge}>
              <span>{title}</span>
            </div>
            {Icon ? (
              <div className={styles.decorIcon}>
                <Icon className={styles.decorSvg} />
              </div>
            ) : (
              <div className={styles.decorIcon} />
            )}
          </div>
        )}
        {/* Question label */}
        <div className={styles.questionLabel}>
          <h2 className={styles.questionHeading}>{t('question')}</h2>
          <p className={styles.questionSub}>
            {t('chooseCorrect', { current, total })}
          </p>
        </div>
        {/* Question box */}
        <LinearBorder
          className="from-card-orange-dark to-card-orange-light mb-[12px] shadow-[0_0_12px_var(--color-orange-dark),inset_0_0_16px_var(--color-orange)]"
          innerClassName="from-bg-card-light to-bg-card-dark shadow-[0_0_20px_rgba(0,200,200,0.08)]"
        >
          <p>{question.question}</p>
        </LinearBorder>
        {/* Options grid */}
        <div className={styles.optionsGrid}>
          {Object.entries(question.options).map(([key, value]) => {
            let btnClass = styles.optionCard;

            if (selected) {
              if (key === question.answer) {
                btnClass = `${styles.optionCard} ${styles.correct}`;
              } else if (selected === key) {
                btnClass = `${styles.optionCard} ${styles.wrong}`;
              } else {
                btnClass = `${styles.optionCard} ${styles.dimmed}`;
              }
            }

            return (
              <button
                key={key}
                onClick={() => handleClick(key)}
                className={btnClass}
                disabled={!!selected}
              >
                <span className={styles.optionLetter}>{key}</span>
                <p>{value}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Test;
