import { NextRequest, NextResponse } from 'next/server';
import { getProfile, SttmError } from '@/src/services/sttmServer';
import { withStudentAuth } from '@/src/services/withStudentAuth';

/**
 * Serves the logged-in student's game state in the `UserProfile` shape the
 * components expect: missions and tests as records keyed by their database id
 * (`mission_27`, `test_3`) — the same ids the catalog and the score submission
 * use, so a card can look up its own progress without any mapping.
 */
export const GET = (req: NextRequest) =>
  withStudentAuth(req, async (token) => {
    try {
      const profile = await getProfile(token);

      const missions: Record<string, { score: number; status: string }> = {};
      for (const m of profile.missions) {
        missions[`mission_${m.mission_id}`] = {
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
