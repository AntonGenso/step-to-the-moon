import { NextRequest, NextResponse } from 'next/server';
import { submitMission, MISSION_ID_OFFSET, SttmError } from '@/src/services/sttmServer';
import { withStudentAuth } from '@/src/services/withStudentAuth';

interface SubmitResult {
  leaderboard: { stars: number; score: number; total: number };
}

/**
 * Called by the platform when a game reports a score. Auth is the session
 * cookie (JWT); the mission arrives as the front-end key `mission_<n>`, which
 * maps to `missions.id = n + MISSION_ID_OFFSET`.
 */
export const POST = (req: NextRequest) =>
  withStudentAuth(req, async (token) => {
    try {
      const { mission, score } = await req.json();

      const frontId = Number(String(mission ?? '').replace(/^mission_/, ''));
      if (!Number.isInteger(frontId) || frontId < 0) {
        return NextResponse.json({ error: 'Invalid mission' }, { status: 400 });
      }
      if (typeof score !== 'number' || score < 0) {
        return NextResponse.json({ error: 'Invalid score' }, { status: 400 });
      }

      const result = (await submitMission(
        token,
        frontId + MISSION_ID_OFFSET,
        score
      )) as SubmitResult;

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
