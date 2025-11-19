// src/app/api/leaderboard/route.ts
import { NextResponse } from 'next/server';
import { addScoreToFirestore } from '@/lib/leaderboard';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
    }

    const { name, score, game } = body;

    if (!name || typeof score !== 'number' || !game) {
      return NextResponse.json({ error: 'invalid-payload' }, { status: 400 });
    }

    const result = await addScoreToFirestore({ name: String(name).trim(), score: Number(score), game: String(game) });

    return NextResponse.json({ ok: true, id: result.id }, { status: 201 });
  } catch (err: any) {
    console.error('[API /api/leaderboard] Error:', err?.message ?? err);
    // map known errors to cleaner messages:
    if ((err as Error).message === 'db-not-initialized') {
      return NextResponse.json({ error: 'db-not-initialized' }, { status: 500 });
    }
    if ((err as Error).message === 'invalid-payload') {
      return NextResponse.json({ error: 'invalid-payload' }, { status: 400 });
    }
    return NextResponse.json({ error: 'server-error' }, { status: 500 });
  }
}
