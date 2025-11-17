'use server';

import { db } from '@/lib/firebase/server';
import { collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';

export interface Score {
  id?: string;
  name: string;
  score: number;
  game: string;
  createdAt: any;
}

export async function getLeaderboard(game: string, take: number = 10): Promise<Score[]> {
  try {
    const scoresRef = collection(db, 'leaderboard');
    const q = query(scoresRef, orderBy('score', 'desc'), limit(take));
    const querySnapshot = await getDocs(q);
    
    const scores: Score[] = [];
    querySnapshot.forEach((doc) => {
      scores.push({ id: doc.id, ...doc.data() } as Score);
    });
    
    return scores;
  } catch (error) {
    console.error("Error getting leaderboard: ", error);
    return [];
  }
}

export async function addScore(score: Omit<Score, 'id' | 'createdAt'>): Promise<{id: string} | null> {
    try {
        const scoresRef = collection(db, 'leaderboard');
        const docRef = await addDoc(scoresRef, {
            ...score,
            createdAt: serverTimestamp(),
        });
        return { id: docRef.id };
    } catch (error) {
        console.error("Error adding score: ", error);
        return null;
    }
}
