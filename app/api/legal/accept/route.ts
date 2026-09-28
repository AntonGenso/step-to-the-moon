import { NextRequest, NextResponse } from 'next/server';
import { acceptLegal } from '@/src/services/sttmServer';
import { withStudentAuth } from '@/src/services/withStudentAuth';

/** Согласие текущего игрока. Кто именно — решает токен, а не тело запроса. */
export const POST = (req: NextRequest) =>
  withStudentAuth(req, async (token) => {
    await acceptLegal(token);
    return NextResponse.json({ ok: true });
  });
