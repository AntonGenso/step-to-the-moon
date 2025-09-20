'use client';

import React, { useState, useEffect } from 'react';
import styles from './test.module.scss';

interface IQuestion {
  question: string;
  options: Record<string, string>;
  answer: string;
}

interface TestProps {
  question?: IQuestion;
  current?: number;
  total?: number;
  onAnswer?: (option: string) => void;
}

const sampleQuestion: IQuestion = {
  question: 'На Меркурии год короче... чего?',
  options: {
    A: 'Ночи',
    B: 'Солнца',
    C: 'Дня',
    D: 'Месяца',
  },
  answer: 'C',
};

const Test: React.FC<TestProps> = ({
  question = sampleQuestion,
  current = 1,
  total = 8,
  onAnswer = () => {},
}) => {
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
        <div className={styles.questionBorder}>
          <div className={styles.questionBox}>
            <p>{question.question}</p>
            <span>
              {current}/{total}
            </span>
          </div>
        </div>

        <div className={styles.optionsGrid}>
          {Object.entries(question.options).map(([key, value]) => {
            let btnClass = styles.optionCard;

            if (selected === key) {
              if (key === question.answer) {
                btnClass = `${styles.optionCard} ${styles.correct}`;
              } else {
                btnClass = `${styles.optionCard} ${styles.wrong}`;
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
