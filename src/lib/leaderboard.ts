// src/lib/leaderboard.ts
import admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// --- Firebase Admin Initialization (Idempotent) ---
function initializeFirebaseAdmin() {
  // Check if the app is already initialized to prevent errors
  if (admin.apps.length > 0) {
    return admin.app();
  }

  // Get the service account key from environment variables
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    console.error("FATAL_ERROR: FIREBASE_SERVICE_ACCOUNT_KEY is not set.");
    throw new Error('db-not-initialized: Service account key is missing.');
  }

  try {
    // The key in .env.local is a stringified JSON. Parse it directly.
    const serviceAccount = JSON.parse(serviceAccountKey);

    // Initialize the app with the service account
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    // Log a detailed error message if initialization fails
    console.error("FATAL_ERROR: Failed to initialize Firebase Admin SDK. Check the format of your FIREBASE_SERVICE_ACCOUNT_KEY.", error.message);
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
