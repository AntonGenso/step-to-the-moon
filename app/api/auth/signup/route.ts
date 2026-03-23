// Signup is now handled directly via Firebase Auth on the client.
// This route is kept as a placeholder — remove if not needed.

import { NextResponse } from 'next/server';

export const POST = async () => {
  return NextResponse.json(
    { message: 'Signup is handled via Firebase Auth on the client' },
    { status: 410 },
  );
};
