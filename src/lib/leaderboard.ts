// src/lib/leaderboard.ts
import admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// --- Firebase Admin Initialization (Idempotent & using ADC) ---
function initializeFirebaseAdmin() {
  // Check if the app is already initialized to prevent errors
  if (admin.apps.length > 0) {
    return admin.app();
  }

  // In a Google Cloud environment (like Firebase Studio), the SDK
  // can automatically find the project and credentials. This is called
  // Application Default Credentials (ADC). This is the most robust method.
  try {
    return admin.initializeApp();
  } catch (error: any) {
    // Log a detailed error message if initialization fails
    console.error("FATAL_ERROR: Failed to initialize Firebase Admin SDK with Application Default Credentials.", error.message);
    throw new Error(`db-not-initialized: ${error.message}`);
  }
}

// Get the initialized Firestore instance.
// This will only run once per server instance.
const db = initializeFirebaseAdmin().firestore();

// --- Leaderboard Functions ---

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
};

export async function addScore(payload: ScorePayload) {
  const { name, score, game } = payload;

  if (!name || typeof score !== 'number' || !game) {
    throw new Error('invalid-payload');
  }

  if (!db) {
      throw new Error('db-not-initialized');
  }

  try {
    const docRef = await db.collection('leaderboard').add({
      name,
      score,
      game,
      createdAt: FieldValue.serverTimestamp(),
    });

    return { id: docRef.id };
  } catch (err: any) {
    console.error('[LEADERBOARD] Error adding score to Firestore:', err.message);
    throw new Error('firestore-write-failed');
  }
}

export async function getTopScores(game: string, limit = 10): Promise<Score[]> {
  if (!db) {
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
  } catch (err: any) {
    console.error('[LEADERBOARD] Error reading leaderboard:', err);
    throw new Error('firestore-read-failed');
  }
}
