'use client';

import StarScore from "@/public/images/profile/tests/star_score.svg";
import Home from "@/public/images/profile/tests/home.svg";
import Retry from "@/public/images/profile/tests/retry.svg";

import { useState } from 'react';
import styles from './Tests.module.scss';
import { Card } from '@/src/uikit/card/Card';
import Test from '../test/Test';
import { testData } from '../../utils/testData';

export default function Tests() {
  const [activeTest, setActiveTest] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  if (activeTest !== null) {
    const test = testData.find((t) => t.id === activeTest);
    if (!test) return null;
    const total = test.questions.length;
    const question = test.questions[currentQuestion];

    if (showResult) {
      return (
        <div className={styles.resultWrapper}>
          <div className={styles.resultCard}>
            <div className="flex flex-col items-center justify-center">
              <div className={styles.resultHeader}>
                <StarScore className={styles.starIcon} />
                <h2 className={styles.resultScore}>YOUR SCORE - {score}</h2>
              </div>

              <p className={styles.resultText}>
                CORRECT ANSWERS - {correctCount}/{total}
              </p>
            </div>

            <div className={styles.resultButtons}>
              <button
                className={styles.iconButton}
                onClick={() => {
                  setShowResult(false);
                  setCurrentQuestion(0);
                  setScore(0);
                  setCorrectCount(0);
                }}
              >
                <Retry />
              </button>

              <button
                className={styles.iconButton}
                onClick={() => {
                  setActiveTest(null);
                  setCurrentQuestion(0);
                  setScore(0);
                  setCorrectCount(0);
                  setShowResult(false);
                }}
              >
                <Home />
              </button>
            </div>

          </div>
        </div>
      );
    }

    return (
      <Test
        question={question}
        current={currentQuestion + 1}
        total={total}
        onAnswer={(option) => {
          const isCorrect = option === question.answer;
          if (isCorrect) {
            setScore((prev) => prev + 10);
            setCorrectCount((prev) => prev + 1);
          }

          if (currentQuestion + 1 < total) {
            setCurrentQuestion((prev) => prev + 1);
          } else {
            setShowResult(true);
          }
        }}
      />
    );
  }

  return (
    <div className={`${styles.container} relative flex h-[500px] w-full flex-col`}>
      <h2 className={`${styles.title} text-[48px] font-bold`}>Tests</h2>

      <div className="custom-scroll mt-[20px] flex-1 overflow-auto">
        <ul className="grid grid-cols-4 gap-[20px] p-[10px]">
          {testData.map((test, i) => (
            <li key={test.id}>
              <Card
                image={test.icon}
                title={test.title}
                level={i + 1}
                status={true}
                setActiveMission={() => setActiveTest(test.id)}
                label="test"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
