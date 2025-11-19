// src/lib/leaderboard.ts
import admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// --- Firebase Admin Initialization ---
// This logic will now be self-contained in this file to ensure it runs correctly
// in the serverless environment.

// Function to initialize Firebase Admin SDK
function initializeAdmin() {
  // Check if the app is already initialized to prevent re-initialization
  if (admin.apps.length > 0) {
    return admin.app();
  }

  // Get the service account key from environment variables
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    console.error("FATAL_ERROR: FIREBASE_SERVICE_ACCOUNT_KEY is not set. The server cannot connect to Firebase.");
    return null;
  }

  try {
    // The key is base64 encoded in the environment variable. Decode it.
    const decodedKey = Buffer.from(serviceAccountKey, 'base64').toString('utf-8');
    const serviceAccount = JSON.parse(decodedKey);

    // Initialize the Firebase Admin App
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    console.error("FATAL_ERROR: Failed to initialize Firebase Admin SDK:", error.message);
    return null;
  }
}

// Call the initialization function.
const adminApp = initializeAdmin();
const db = adminApp ? admin.firestore() : null;

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
  } catch (err: any) {
    console.error('[LEADERBOARD] Error adding score to Firestore:', err.message);
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