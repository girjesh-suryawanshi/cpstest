
import { initializeApp, getApps, cert, getApp, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import 'dotenv/config';

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

let app: App;

if (!getApps().length) {
  if (!serviceAccountString) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set in the environment');
  }
  
  // The service account key from .env.local needs to be parsed
  const serviceAccount = JSON.parse(serviceAccountString);

  app = initializeApp({
    credential: cert(serviceAccount),
  });
} else {
  app = getApp();
}

export const db = getFirestore(app);
