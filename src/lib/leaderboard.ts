
'use server';

import { db } from '@/lib/firebase/server';
import { FieldValue } from 'firebase-admin/firestore';

// This is the interface for the data we expect from the client.
export interface ScoreData {
  id?: string;
  name: string;
  score: number;
  game: string;
  createdAt?: any;
}

// This function gets the leaderboard scores from Firestore.
export async function getLeaderboard(game: string, take: number = 10): Promise<ScoreData[]> {
  try {
    const scoresRef = db.collection('leaderboard');
    const querySnapshot = await scoresRef.where('game', '==', game).orderBy('score', 'desc').limit(take).get();
    
    const scores: ScoreData[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      scores.push({
        id: doc.id,
        name: data.name,
        score: data.score,
        game: data.game,
        createdAt: data.createdAt.toDate().toISOString(), // Convert Firestore Timestamp to ISO string
      });
    });
    
    return scores;
  } catch (error) {
    console.error("[LEADERBOARD_ERROR] Error getting leaderboard: ", error);
    // In case of an error, return an empty array.
    return [];
  }
}

// This function adds a new score to the Firestore leaderboard.
export async function addScore(score: Omit<ScoreData, 'id' | 'createdAt'>): Promise<{id: string} | null> {
    try {
        const docRef = await db.collection('leaderboard').add({
            ...score,
            createdAt: FieldValue.serverTimestamp(), // Use the server's timestamp
        });
        // On success, return the new document's ID.
        return { id: docRef.id };
    } catch (error) {
        console.error("[LEADERBOARD_ERROR] Error adding score to Firestore: ", error);
        // On failure, return null.
        return null;
    }
}
