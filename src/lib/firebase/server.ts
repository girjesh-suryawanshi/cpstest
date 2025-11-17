import { initializeApp, getApps, cert, getApp, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import 'dotenv/config';

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

let app: App;

if (!getApps().length) {
  if (!serviceAccountString) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set in .env.local');
  }
  const serviceAccount = JSON.parse(serviceAccountString);
  app = initializeApp({
    credential: cert(serviceAccount),
  });
} else {
  app = getApp();
}

export const db = getFirestore(app);
