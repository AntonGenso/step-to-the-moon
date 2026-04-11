import { NextRequest, NextResponse } from 'next/server';
import { submitMissionScore } from '@/src/services/userService';

export const POST = async (req: NextRequest) => {
  const nickname = req.cookies.get('session')?.value;
  if (!nickname) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { mission, score } = await req.json();

    if (!mission || typeof score !== 'number' || score < 0) {
      return NextResponse.json({ error: 'Missing or invalid mission/score' }, { status: 400 });
    }

    const updated = await submitMissionScore(nickname, mission, score);

    if (!updated) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      stars: updated.leaderboard.stars,
      total: updated.leaderboard.total,
    });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
};
