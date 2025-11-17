import { initializeApp, getApps, cert, getApp, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import 'dotenv/config';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

let app: App;
if (getApps().length === 0) {
  if (serviceAccount) {
    app = initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    // This is a fallback for local development. It will allow the server to start,
    // but Firestore operations will fail until the service account is configured.
    console.warn("Firebase Admin SDK not initialized. Missing FIREBASE_SERVICE_ACCOUNT_KEY. Firestore operations will fail.");
    app = initializeApp();
  }
} else {
  app = getApp();
}

export const db = getFirestore(app);
