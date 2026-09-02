'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from '@/src/i18n/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { submitTestScore } from '@/src/services/userService';
import { POINTS_PER_QUESTION } from '@/src/config/gameConfig';
import {
  getTestCard,
  getTestCards,
  testProgressKey,
  type TestView,
} from '@/src/services/testService';
import { MobileBottomNav } from '@/src/components/profile/mobile/MobileBottomNav';
import { useTranslations, useLocale } from 'next-intl';
import Test from './Test';
import BackIcon from '@/public/images/svg/mobile/other/arrow.svg';
import { LanguageSwitcher } from '@/src/components/LanguageSwitcher';
import styles from './TestQuiz.module.scss';
import testStyles from './test.module.scss';

interface TestQuizProps {
  testId: number;
}

export const TestQuiz = ({ testId }: TestQuizProps) => {
  const router = useRouter();
  const { nickname, refreshProfile } = useAuth();
  const t = useTranslations('test');
  const locale = useLocale();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const scoreSaved = useRef(false);

  /** The test itself; `null` while loading, and after a test that cannot be played. */
  const [test, setTest] = useState<TestView | null>(null);
  const [notFound, setNotFound] = useState(false);
  /** The test that follows this one, for the "next" button on the result screen. */
  const [nextTest, setNextTest] = useState<TestView | null>(null);

  useEffect(() => {
    let active = true;

    // A hidden test, or one whose date has not come, answers 404 here — the
    // player is sent back rather than shown an empty quiz.
    getTestCard(testId, locale)
      .then((loaded) => {
        if (!active) return;
        if (loaded) setTest(loaded);
        else setNotFound(true);
      })
      .catch(() => {
        if (active) setNotFound(true);
      });

    getTestCards(locale)
      .then((cards) => {
        if (!active) return;
        const index = cards.findIndex((card) => card.id === testId);
        setNextTest(index >= 0 ? (cards[index + 1] ?? null) : null);
      })
      .catch(() => {
        if (active) setNextTest(null);
      });

    return () => {
      active = false;
    };
  }, [testId, locale]);

  useEffect(() => {
    if (notFound) router.replace('/?activeSlide=tests');
  }, [notFound, router]);

  const total = test?.questions.length ?? 0;

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setCorrectCount(0);
    setShowResult(false);
    scoreSaved.current = false;
  };

  const goBack = () => {
    router.push('/?activeSlide=tests');
  };

  const goNext = () => {
    if (nextTest) {
      router.push(`/test/${nextTest.id}`);
    } else {
      router.push('/?activeSlide=tests');
    }
  };

  // Still loading, or on the way out after a 404.
  if (!test) return null;

  if (showResult) {
    if (!scoreSaved.current && nickname && score > 0) {
      scoreSaved.current = true;
      submitTestScore(nickname, testProgressKey(testId), score).then(() => {
        refreshProfile();
      });
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.topBar}>
          <LanguageSwitcher />
        </div>
        <div className={styles.page}>
          <div className={styles.resultContainer}>
            <div className={testStyles.header}>
              <button type="button" className={testStyles.backBtn} onClick={goBack}>
                <BackIcon className={testStyles.backIcon} />
              </button>
              <div className={testStyles.titleBadge}>
                <span>{test.title}</span>
              </div>
              {test.icon ? (
                <div className={testStyles.decorIcon}>
                  <Image
                    src={test.icon}
                    alt=""
                    width={80}
                    height={80}
                    unoptimized
                    className={testStyles.decorSvg}
                  />
                </div>
              ) : (
                <div className={testStyles.decorIcon} />
              )}
            </div>

            <div className={styles.completeLabel}>
              <h2 className={styles.completeTitle}>{t('complete')}</h2>
              <p className={styles.completeSub}>{t('completeSub')}</p>
            </div>

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

            <p className={styles.retryHint}>{t('retryHint')}</p>

            <div className={styles.actionButtons}>
              <button className={styles.retryBtn} onClick={resetQuiz}>
                {t('retry')}
              </button>
              <button className={styles.nextBtn} onClick={goNext}>
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

  const current = test.questions[currentQuestion];
  if (!current) return null;

  const question = {
    question: current.text,
    options: current.options,
    answer: current.answer,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <LanguageSwitcher />
      </div>
      <div className={styles.page}>
        <Test
          key={currentQuestion}
          question={question}
          current={currentQuestion + 1}
          total={total}
          title={test.title}
          icon={test.icon}
          onBack={goBack}
          onAnswer={(option) => {
            const isCorrect = option === current.answer;
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
