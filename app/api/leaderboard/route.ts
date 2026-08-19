import { NextRequest, NextResponse } from 'next/server';
import { getLeaderboard, SttmError } from '@/src/services/sttmServer';
import { withStudentAuth } from '@/src/services/withStudentAuth';

/** Top students. Polled by the client (sttm-server has no realtime channel). */
export const GET = (req: NextRequest) =>
  withStudentAuth(req, async (token) => {
    try {
      const rows = await getLeaderboard(token);
      return NextResponse.json(rows);
    } catch (error) {
      const status = error instanceof SttmError ? error.status : 500;
      return NextResponse.json({ error: 'Error fetching leaderboard' }, { status });
    }
  });
