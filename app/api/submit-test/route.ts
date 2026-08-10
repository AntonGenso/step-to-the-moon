import { NextRequest, NextResponse } from 'next/server';
import { submitTest, SttmError } from '@/src/services/sttmServer';
import { getToken } from '@/src/services/session';

interface SubmitResult {
  leaderboard: { stars: number; score: number; total: number };
}

/**
 * Submits a test result. Test ids are 1-based on both the front-end and the DB,
 * so there is no offset here (unlike missions).
 */
export const POST = async (req: NextRequest) => {
  const token = getToken(req);
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { test, score } = await req.json();

    const testId = Number(String(test ?? '').replace(/^test_/, ''));
    if (!Number.isInteger(testId) || testId <= 0) {
      return NextResponse.json({ error: 'Invalid test' }, { status: 400 });
    }
    if (typeof score !== 'number' || score < 0) {
      return NextResponse.json({ error: 'Invalid score' }, { status: 400 });
    }

    const result = (await submitTest(token, testId, score)) as SubmitResult;

    return NextResponse.json({
      ok: true,
      score: result.leaderboard.score,
      total: result.leaderboard.total,
    });
  } catch (error) {
    const status = error instanceof SttmError ? error.status : 500;
    const message = error instanceof SttmError ? error.message : 'Server error';
    return NextResponse.json({ error: message }, { status });
  }
};
