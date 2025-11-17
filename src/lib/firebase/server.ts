
import { initializeApp, getApps, cert, getApp, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import 'dotenv/config';

let app: App;

if (!getApps().length) {
  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountString) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Please follow the instructions in .env.local.');
  }
  
  try {
    const serviceAccount = JSON.parse(serviceAccountString);
    app = initializeApp({
      credential: cert(serviceAccount),
    });
  } catch (e: any) {
    console.error('Failed to parse or initialize Firebase Admin SDK:', e);
    throw new Error('Firebase initialization failed. Check your FIREBASE_SERVICE_ACCOUNT_KEY in .env.local.');
  }

} else {
  app = getApp();
}

export const db = getFirestore(app);
