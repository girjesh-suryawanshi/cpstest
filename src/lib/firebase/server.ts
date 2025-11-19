import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let app;
let db;

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (serviceAccountKey) {
  try {
    // Before parsing, replace the escaped newlines with actual newlines
    const formattedKey = JSON.parse(serviceAccountKey);

    if (!getApps().length) {
      app = initializeApp({
        credential: cert(formattedKey),
      });
    } else {
      app = getApp();
    }
    db = getFirestore(app);
  } catch (e: any) {
    console.error('Firebase Admin SDK initialization failed:', e);
  }
} else {
  console.warn('FIREBASE_SERVICE_ACCOUNT_KEY is not set. Firebase Admin SDK not initialized.');
}

export { db };
