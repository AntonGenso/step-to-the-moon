'use client';

import { useState, useRef } from 'react';
import { useRouter } from '@/src/i18n/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { submitTestScore } from '@/src/services/userService';
import { POINTS_PER_QUESTION } from '@/src/config/gameConfig';
import { testData } from '@/src/components/utils/testData';
import { MobileBottomNav } from '@/src/components/profile/mobile/MobileBottomNav';
import { useTranslations } from 'next-intl';
import Test from './Test';
import BackIcon from '@/public/images/svg/mobile/other/arrow.svg';
import styles from './TestQuiz.module.scss';
import testStyles from './test.module.scss';

interface TestQuizProps {
  testId: number;
}

export const TestQuiz = ({ testId }: TestQuizProps) => {
  const router = useRouter();
  const { nickname, refreshProfile } = useAuth();
  const t = useTranslations('test');
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

    const Icon = test.icon;

    return (
      <div className={styles.wrapper}>
        <div className={styles.page}>
          <div className={styles.resultContainer}>
            {/* Header */}
            <div className={testStyles.header}>
              <button type="button" className={testStyles.backBtn} onClick={goBack}>
                <BackIcon className={testStyles.backIcon} />
              </button>
              <div className={testStyles.titleBadge}>
                <span>{test.title}</span>
              </div>
              {Icon ? (
                <div className={testStyles.decorIcon}>
                  <Icon className={testStyles.decorSvg} />
                </div>
              ) : (
                <div className={testStyles.decorIcon} />
              )}
            </div>

            {/* Test Complete */}
            <div className={styles.completeLabel}>
              <h2 className={styles.completeTitle}>{t('complete')}</h2>
              <p className={styles.completeSub}>{t('completeSub')}</p>
            </div>

            {/* Score Card */}
            <div className={styles.scoreCard}>
              <div className={styles.scoreCardInner}>
                <h3 className={styles.scoreLabel}>{t('yourScore')}</h3>
                <span className={styles.scoreValue}>{score}</span>
                <h3 className={styles.scoreLabel}>{t('correctAnswers')}</h3>
                <span className={styles.scoreValue}>
                  {correctCount}/{total}
                </span>
              </div>
            </div>

            {/* Hint */}
            <p className={styles.retryHint}>
              {t('retryHint')}
            </p>

            {/* Action buttons */}
            <div className={styles.actionButtons}>
              <button className={styles.retryBtn} onClick={resetQuiz}>
                {t('retry')}
              </button>
              <button className={styles.nextBtn} onClick={goBack}>
                {t('next')}
              </button>
            </div>
          </div>
        </div>
        <div className="max-tablet:block hidden">
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
      <div className="max-tablet:block hidden">
        <MobileBottomNav activeTab="tests" />
      </div>
    </div>
  );
};
