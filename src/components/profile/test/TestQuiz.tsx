'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { submitTestScore } from '@/src/services/userService';
import { POINTS_PER_QUESTION } from '@/src/config/gameConfig';
import { testData } from '@/src/components/utils/testData';
import { MobileBottomNav } from '@/src/components/profile/mobile/MobileBottomNav';
import Test from './Test';
import StarScore from '@/public/images/profile/tests/star_score.svg';
import Home from '@/public/images/profile/tests/home.svg';
import Retry from '@/public/images/profile/tests/retry.svg';
import styles from './TestQuiz.module.scss';

interface TestQuizProps {
  testId: number;
}

export const TestQuiz = ({ testId }: TestQuizProps) => {
  const router = useRouter();
  const { nickname, refreshProfile } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const scoreSaved = useRef(false);

  const test = testData.find((t) => t.id === testId);

  if (!test) {
    router.replace('/');
    return null;
  }

  const total = test.questions.length;

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setCorrectCount(0);
    setShowResult(false);
    scoreSaved.current = false;
  };

  const goBack = () => {
    router.push('/?activeTab=test');
  };

  if (showResult) {
    if (!scoreSaved.current && nickname && score > 0) {
      scoreSaved.current = true;
      submitTestScore(nickname, `test_${testId}`, score).then(() => {
        refreshProfile();
      });
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.page}>
          <div className={styles.resultCard}>
            <div className={styles.resultHeader}>
              <StarScore className={styles.starIcon} />
              <h2 className={styles.resultScore}>YOUR SCORE - {score}</h2>
            </div>
            <p className={styles.resultText}>
              CORRECT ANSWERS - {correctCount}/{total}
            </p>
            <div className={styles.resultButtons}>
              <button className={styles.iconButton} onClick={resetQuiz}>
                <Retry />
              </button>
              <button className={styles.iconButton} onClick={goBack}>
                <Home />
              </button>
            </div>
          </div>
        </div>
        <div className="hidden max-tablet:block">
          <MobileBottomNav activeTab="tests" />
        </div>
      </div>
    );
  }

  const question = test.questions[currentQuestion];

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <Test
          question={question}
          current={currentQuestion + 1}
          total={total}
          title={test.title}
          icon={test.icon}
          onBack={goBack}
          onAnswer={(option) => {
            const isCorrect = option === question.answer;
            if (isCorrect) {
              setScore((prev) => prev + POINTS_PER_QUESTION);
              setCorrectCount((prev) => prev + 1);
            }
            if (currentQuestion + 1 < total) {
              setCurrentQuestion((prev) => prev + 1);
            } else {
              setShowResult(true);
            }
          }}
        />
      </div>
      <div className="hidden max-tablet:block">
        <MobileBottomNav activeTab="tests" />
      </div>
    </div>
  );
};
