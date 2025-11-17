
'use server';

import { db } from '@/lib/firebase/server';
import { FieldValue } from 'firebase-admin/firestore';

export interface ScoreData {
  id?: string;
  name: string;
  score: number;
  game: string;
  createdAt?: any;
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
        createdAt: data.createdAt.toDate().toISOString(), // Convert timestamp to string
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
        console.error("Error adding score to Firestore: ", error);
        return null;
    }
}
