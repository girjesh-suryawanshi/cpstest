// src/lib/leaderboard.ts
import admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// --- Firebase Admin Initialization (Idempotent) ---
// This function ensures the Firebase Admin SDK is initialized only once.
function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    console.error("FATAL_ERROR: FIREBASE_SERVICE_ACCOUNT_KEY is not set.");
    throw new Error('db-not-initialized: Service account key is missing.');
  }

  try {
    // The key is base64 encoded. Decode it first.
    const decodedKey = Buffer.from(serviceAccountKey, 'base64').toString('utf-8');
    const serviceAccount = JSON.parse(decodedKey);

    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    console.error("FATAL_ERROR: Failed to initialize Firebase Admin SDK:", error.message);
    throw new Error(`db-not-initialized: ${error.message}`);
  }
}

// Get the initialized Firestore instance.
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
