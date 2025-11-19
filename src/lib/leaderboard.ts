'use server';

import { db } from '@/lib/firebase/server';
import { FieldValue } from 'firebase-admin/firestore';

export interface Score {
  id?: string;
  name: string;
  score: number;
  game: string;
  createdAt?: any;
}

export async function getLeaderboard(game: string, take: number = 10): Promise<Score[]> {
  if (!db) {
    console.error("[LEADERBOARD_ERROR] Firestore is not initialized.");
    return [];
  }
  try {
    const scoresRef = db.collection('leaderboard');
    const querySnapshot = await scoresRef.where('game', '==', game).orderBy('score', 'desc').limit(take).get();
    
    const scores: Score[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      scores.push({
        id: doc.id,
        name: data.name,
        score: data.score,
        game: data.game,
        createdAt: data.createdAt.toDate().toISOString(),
      });
    });
    
    return scores;
  } catch (error) {
    console.error("[LEADERBOARD_ERROR] Error getting leaderboard: ", error);
    return [];
  }
}

export async function addScore(score: Omit<Score, 'id' | 'createdAt'>): Promise<{id: string} | null> {
    if (!db) {
      console.error("[LEADERBOARD_ERROR] Firestore is not initialized. Cannot add score.");
      return null;
    }
    try {
        const docRef = await db.collection('leaderboard').add({
            ...score,
            createdAt: FieldValue.serverTimestamp(),
        });
        return { id: docRef.id };
    } catch (error) {
        console.error("[LEADERBOARD_ERROR] Error adding score to Firestore: ", error);
        return null;
    }
}
