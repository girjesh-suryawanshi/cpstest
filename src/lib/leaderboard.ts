// src/lib/leaderboard.ts
import { db } from './firebase/server';
import { FieldValue } from 'firebase-admin/firestore';

export type ScorePayload = {
  name: string;
  score: number;
  game: string;
};

export type Score = {
    id: string;
    name: string;
    score: number;
    createdAt?: any;
}

export async function addScore(payload: ScorePayload) {
  if (!db) {
    console.error('[LEADERBOARD] Firestore not initialized. Cannot add score.');
    throw new Error('db-not-initialized');
  }

  const { name, score, game } = payload;

  if (!name || typeof score !== 'number' || !game) {
    throw new Error('invalid-payload');
  }

  try {
    const docRef = await db.collection('leaderboard').add({
      name,
      score,
      game,
      createdAt: FieldValue.serverTimestamp(),
    });

    return { id: docRef.id };
  } catch (err) {
    console.error('[LEADERBOARD] Error adding score to Firestore:', err);
    throw new Error('firestore-write-failed');
  }
}

export async function getTopScores(game: string, limit = 10): Promise<Score[]> {
  if (!db) {
    console.error('[LEADERBOARD] Firestore not initialized. Cannot get scores.');
    throw new Error('db-not-initialized');
  }
  try {
    const q = db
      .collection('leaderboard')
      .where('game', '==', game)
      .orderBy('score', 'desc')
      .limit(limit);
    const snap = await q.get();
    const results: Score[] = [];
    snap.forEach((doc) => {
      const d = doc.data();
      results.push({ id: doc.id, name: d.name, score: d.score, createdAt: d.createdAt });
    });
    return results;
  } catch (err) {
    console.error('[LEADERBOARD] Error reading leaderboard:', err);
    throw err;
  }
}
