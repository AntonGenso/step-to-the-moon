import { NextRequest, NextResponse } from 'next/server';
import { getProfile, MISSION_ID_OFFSET, SttmError } from '@/src/services/sttmServer';
import { withStudentAuth } from '@/src/services/withStudentAuth';

/**
 * Serves the logged-in student's game state in the legacy `UserProfile` shape
 * the components already expect: missions/tests as records keyed by the
 * front-end (0-based) mission id and (1-based) test id, so no UI code changes.
 */
export const GET = (req: NextRequest) =>
  withStudentAuth(req, async (token) => {
    try {
      const profile = await getProfile(token);

      const missions: Record<string, { score: number; status: string }> = {};
      for (const m of profile.missions) {
        const frontId = (m.mission_id ?? 0) - MISSION_ID_OFFSET;
        missions[`mission_${frontId}`] = {
          score: m.best_score,
          status: m.status === 'done' ? 'done' : 'open',
        };
      }

      const tests: Record<string, { score: number; status: string }> = {};
      for (const t of profile.tests) {
        tests[`test_${t.test_id}`] = {
          score: t.best_score,
          status: t.status === 'done' ? 'done' : 'open',
        };
      }

      return NextResponse.json({
        skin: profile.skin,
        leaderboard: profile.leaderboard,
        missions,
        tests,
      });
    } catch (error) {
      const status = error instanceof SttmError ? error.status : 500;
      return NextResponse.json({ error: 'Error fetching profile' }, { status });
    }
  });
