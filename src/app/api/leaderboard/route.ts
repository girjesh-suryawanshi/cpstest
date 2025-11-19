// src/app/api/leaderboard/route.ts
import { NextResponse } from 'next/server';
import { addScore, getTopScores } from '@/lib/leaderboard';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const game = searchParams.get('game');
    const limit = searchParams.get('limit');

    if (!game) {
        return NextResponse.json({ error: 'game-parameter-is-required' }, { status: 400 });
    }

    try {
        const scores = await getTopScores(game, limit ? parseInt(limit) : 10);
        return NextResponse.json(scores);
    } catch (err: any) {
        console.error('[API /api/leaderboard GET] Error:', err?.message ?? err);
        return NextResponse.json({ error: 'server-error' }, { status: 500 });
    }
}


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

    const result = await addScore({ name: String(name).trim(), score: Number(score), game: String(game) });

    return NextResponse.json({ ok: true, id: result.id }, { status: 201 });
  } catch (err: any) {
    console.error('[API /api/leaderboard POST] Error:', err?.message ?? err);
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
