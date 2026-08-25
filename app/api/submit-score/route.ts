import { NextRequest, NextResponse } from 'next/server';
import { submitMission, SttmError } from '@/src/services/sttmServer';
import { withStudentAuth } from '@/src/services/withStudentAuth';

interface SubmitResult {
  leaderboard: { stars: number; score: number; total: number };
}

/**
 * Called by the platform when a game reports a score. Auth is the session
 * cookie (JWT), so the score always lands on the student who is signed in —
 * the game itself never says who played. `mission` is the key the catalog
 * hands out (`mission_<id>`), where the id is `missions.id`.
 */
export const POST = (req: NextRequest) =>
  withStudentAuth(req, async (token) => {
    try {
      const { mission, score } = await req.json();

      const missionId = Number(String(mission ?? '').replace(/^mission_/, ''));
      if (!Number.isInteger(missionId) || missionId <= 0) {
        return NextResponse.json({ error: 'Invalid mission' }, { status: 400 });
      }
      if (typeof score !== 'number' || score < 0) {
        return NextResponse.json({ error: 'Invalid score' }, { status: 400 });
      }

      const result = (await submitMission(token, missionId, score)) as SubmitResult;

      return NextResponse.json({
        ok: true,
        stars: result.leaderboard.stars,
        total: result.leaderboard.total,
      });
    } catch (error) {
      const status = error instanceof SttmError ? error.status : 500;
      const message = error instanceof SttmError ? error.message : 'Server error';
      return NextResponse.json({ error: message }, { status });
    }
  });
