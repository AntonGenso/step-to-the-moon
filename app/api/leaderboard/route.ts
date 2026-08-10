import { NextRequest, NextResponse } from 'next/server';
import { getLeaderboard, SttmError } from '@/src/services/sttmServer';
import { getToken } from '@/src/services/session';

/** Top students. Polled by the client (sttm-server has no realtime channel). */
export const GET = async (req: NextRequest) => {
  const token = getToken(req);
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const rows = await getLeaderboard(token);
    return NextResponse.json(rows);
  } catch (error) {
    const status = error instanceof SttmError ? error.status : 500;
    return NextResponse.json({ error: 'Error fetching leaderboard' }, { status });
  }
};
