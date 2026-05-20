import { NextRequest, NextResponse } from 'next/server';
import { submitMissionScore } from '@/src/services/userService';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://antongenso.github.io',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const OPTIONS = () => NextResponse.json({}, { headers: CORS_HEADERS });

export const POST = async (req: NextRequest) => {
  // Cookie-based auth for calls from the platform itself
  const sessionNickname = req.cookies.get('session')?.value;

  try {
    const { uid, mission, score } = await req.json();

    // uid from body is used when games (on github.io) call this endpoint directly
    const nickname = sessionNickname ?? uid;

    if (!nickname) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401, headers: CORS_HEADERS });
    }

    if (!mission || typeof score !== 'number' || score < 0) {
      return NextResponse.json({ error: 'Missing or invalid mission/score' }, { status: 400, headers: CORS_HEADERS });
    }

    const updated = await submitMissionScore(nickname, mission, score);

    if (!updated) {
      return NextResponse.json({ error: 'User not found' }, { status: 404, headers: CORS_HEADERS });
    }

    return NextResponse.json(
      { ok: true, stars: updated.leaderboard.stars, total: updated.leaderboard.total },
      { headers: CORS_HEADERS },
    );
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500, headers: CORS_HEADERS });
  }
};
