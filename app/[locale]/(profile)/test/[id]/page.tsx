'use client';

import { use } from 'react';
import { TestQuiz } from '@/src/components/profile/test/TestQuiz';

export default function TestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const testId = Number(id);

  return <TestQuiz testId={testId} />;
}
