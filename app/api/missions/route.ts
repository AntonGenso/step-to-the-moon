import { NextResponse } from 'next/server';
import { getMissions, SttmError } from '@/src/services/sttmServer';

/**
 * The mission catalog. Public on the backend too, but it still goes through
 * this route so the browser only ever talks to its own origin — the backend
 * host is an internal name the client cannot resolve.
 *
 * Inactive missions are dropped here: a mission the admin switched off should
 * not reach the game at all, and no client has a reason to see it.
 */
export const GET = async () => {
  try {
    const missions = await getMissions();
    return NextResponse.json(missions.filter((mission) => mission.is_active));
  } catch (error) {
    const status = error instanceof SttmError ? error.status : 500;
    return NextResponse.json({ error: 'Error fetching missions' }, { status });
  }
};
