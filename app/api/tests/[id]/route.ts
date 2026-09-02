import { NextRequest, NextResponse } from 'next/server';
import { getTestForPlay, SttmError } from '@/src/services/sttmServer';
import { withStudentAuth } from '@/src/services/withStudentAuth';

/**
 * One test with its questions, ready to play.
 *
 * The backend's `/play` route already refuses a hidden test and one whose
 * opening date has not arrived, answering 404 either way — so a typed-in URL
 * cannot start a test early even if the browser's clock says otherwise.
 */
export const GET = (req: NextRequest, { params }: { params: Promise<{ id: string }> }) =>
  withStudentAuth(req, async (token) => {
    const { id } = await params;
    const testId = Number(id);

    if (!Number.isInteger(testId) || testId <= 0) {
      return NextResponse.json({ error: 'Invalid test' }, { status: 400 });
    }

    try {
      return NextResponse.json(await getTestForPlay(token, testId));
    } catch (error) {
      const status = error instanceof SttmError ? error.status : 500;
      return NextResponse.json({ error: 'Error fetching the test' }, { status });
    }
  });
