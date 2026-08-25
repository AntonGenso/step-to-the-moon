import { NextRequest, NextResponse } from 'next/server';
import { getMission, SttmError } from '@/src/services/sttmServer';
import { withStudentAuth } from '@/src/services/withStudentAuth';

/**
 * One mission with its files. Needs the session because the student handout
 * lives in the private bucket and comes back as a short-lived signed link.
 */
export const GET = (req: NextRequest, { params }: { params: Promise<{ id: string }> }) =>
  withStudentAuth(req, async (token) => {
    const { id } = await params;
    const missionId = Number(id);

    if (!Number.isInteger(missionId) || missionId <= 0) {
      return NextResponse.json({ error: 'Invalid mission' }, { status: 400 });
    }

    try {
      const mission = await getMission(token, missionId);

      if (!mission.is_active) {
        return NextResponse.json({ error: 'Mission not found' }, { status: 404 });
      }

      return NextResponse.json(mission);
    } catch (error) {
      const status = error instanceof SttmError ? error.status : 500;
      return NextResponse.json({ error: 'Error fetching mission' }, { status });
    }
  });
