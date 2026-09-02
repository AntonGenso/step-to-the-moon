import { NextRequest, NextResponse } from 'next/server';
import { getMission, SttmError } from '@/src/services/sttmServer';
import { withStudentAuth } from '@/src/services/withStudentAuth';
import { isMissionOpen } from '@/src/services/missionSchedule';

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

      // Hidden, or scheduled for a date that has not come yet: either way the
      // student has no business inside it. The catalog still lists it, so the
      // card can be shown closed — this is what stops the URL being typed in.
      if (!mission.is_active || !isMissionOpen(mission.opens_at)) {
        return NextResponse.json({ error: 'Mission not found' }, { status: 404 });
      }

      return NextResponse.json(mission);
    } catch (error) {
      const status = error instanceof SttmError ? error.status : 500;
      return NextResponse.json({ error: 'Error fetching mission' }, { status });
    }
  });
