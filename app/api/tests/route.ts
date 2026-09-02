import { NextRequest, NextResponse } from 'next/server';
import { getTests, SttmError } from '@/src/services/sttmServer';
import { withStudentAuth } from '@/src/services/withStudentAuth';

/**
 * The test catalog. Needs the session because the backend keeps `GET /tests`
 * behind a login — the list exposes unpublished tests, which is exactly what
 * gets filtered here.
 *
 * Hidden tests are dropped: a test the admin switched off should not reach the
 * game at all. Scheduled ones are kept, so their card can be shown closed.
 */
export const GET = (req: NextRequest) =>
  withStudentAuth(req, async (token) => {
    try {
      const tests = await getTests(token);
      return NextResponse.json(tests.filter((test) => test.is_active));
    } catch (error) {
      const status = error instanceof SttmError ? error.status : 500;
      return NextResponse.json({ error: 'Error fetching tests' }, { status });
    }
  });
