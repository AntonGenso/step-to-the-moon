import { NextRequest, NextResponse } from 'next/server';
import { getLeaderboard, SttmError } from '@/src/services/sttmServer';
import { withStudentAuth } from '@/src/services/withStudentAuth';

/**
 * One page of the board. Polled by the client (sttm-server has no realtime
 * channel). Paging and the two filters are query params, passed straight
 * through: `page`, `pageSize`, `search` (name fragment) and `scope=class`,
 * which the backend resolves to the caller's own class from their token.
 */
export const GET = (req: NextRequest) =>
  withStudentAuth(req, async (token) => {
    const params = req.nextUrl.searchParams;
    const page = Number(params.get('page')) || undefined;
    const pageSize = Number(params.get('pageSize')) || undefined;
    const search = params.get('search') ?? undefined;
    const scope = params.get('scope') === 'class' ? ('class' as const) : undefined;

    try {
      const result = await getLeaderboard(token, { page, pageSize, search, scope });
      return NextResponse.json(result);
    } catch (error) {
      const status = error instanceof SttmError ? error.status : 500;
      return NextResponse.json({ error: 'Error fetching leaderboard' }, { status });
    }
  });
