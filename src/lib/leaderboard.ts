'use server';

import { db } from '@/lib/firebase/server';
import { FieldValue } from 'firebase-admin/firestore';

// Note: The Score interface from the client-side might have a `Timestamp`
// type from the client SDK. The server-side equivalent is `FieldValue`.
// For simplicity in this file, we'll use a more generic interface.
export interface ScoreData {
  id?: string;
  name: string;
  score: number;
  game: string;
  createdAt?: any; // Can be Timestamp or FieldValue
}

export async function getLeaderboard(game: string, take: number = 10): Promise<ScoreData[]> {
  try {
    const scoresRef = db.collection('leaderboard');
    const q = scoresRef.where('game', '==', game).orderBy('score', 'desc').limit(take);
    const querySnapshot = await q.get();
    
    const scores: ScoreData[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      scores.push({
        id: doc.id,
        name: data.name,
        score: data.score,
        game: data.game,
        createdAt: data.createdAt,
      });
    });
    
    return scores;
  } catch (error) {
    console.error("Error getting leaderboard: ", error);
    return [];
  }
}

export async function addScore(score: Omit<ScoreData, 'id' | 'createdAt'>): Promise<{id: string} | null> {
    try {
        const docRef = await db.collection('leaderboard').add({
            ...score,
            createdAt: FieldValue.serverTimestamp(),
        });
        return { id: docRef.id };
    } catch (error) {
        console.error("Error adding score: ", error);
        return null;
    }
}
