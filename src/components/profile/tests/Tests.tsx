'use client';

import { useState } from 'react';
import styles from './Tests.module.scss';
import { Card } from '@/src/uikit/card/Card';
import Test from '../test/Test';
import { testData } from '../../utils/testData';

export default function Tests() {
  const [activeTest, setActiveTest] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  if (activeTest !== null) {
    const test = testData.find((t) => t.id === activeTest)!;
    const total = test.questions.length;
    const question = test.questions[currentQuestion];

    return (
      <Test
        question={question}
        current={currentQuestion + 1}
        total={total}
        onAnswer={(option) => {
          console.log('answered:', option);

          if (currentQuestion + 1 < total) {
            setCurrentQuestion((prev) => prev + 1);
          } else {
            setActiveTest(null);
            setCurrentQuestion(0);
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
                status={i === 0}
                setActiveMission={setActiveTest}
                label="test"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
