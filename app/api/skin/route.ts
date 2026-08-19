import { NextRequest, NextResponse } from 'next/server';
import { updateSkin, SttmError } from '@/src/services/sttmServer';
import { withStudentAuth } from '@/src/services/withStudentAuth';

export const POST = (req: NextRequest) =>
  withStudentAuth(req, async (token) => {
    try {
      const { headId, suitId } = await req.json();
      if (!Number.isInteger(headId) || headId < 0 || !Number.isInteger(suitId) || suitId < 0) {
        return NextResponse.json({ error: 'Invalid skin' }, { status: 400 });
      }

      await updateSkin(token, headId, suitId);
      return NextResponse.json({ ok: true, skin: { headId, suitId } });
    } catch (error) {
      const status = error instanceof SttmError ? error.status : 500;
      return NextResponse.json({ error: 'Error updating skin' }, { status });
    }
  });
