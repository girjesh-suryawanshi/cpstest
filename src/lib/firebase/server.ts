import admin from 'firebase-admin';

let db: admin.firestore.Firestore;

function parseServiceAccount() {
  const rawKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!rawKey) {
    console.error('[FIREBASE_INIT] FIREBASE_SERVICE_ACCOUNT_KEY environment variable not set.');
    return null;
  }
  try {
    const decodedKey = Buffer.from(rawKey, 'base64').toString('utf-8');
    return JSON.parse(decodedKey);
  } catch (e) {
    console.error('[FIREBASE_INIT] Failed to parse service account key from Base64:', e);
    return null;
  }
}

if (!admin.apps.length) {
  const serviceAccount = parseServiceAccount();
  if (serviceAccount) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('[FIREBASE_INIT] Firebase Admin initialized.');
      db = admin.firestore();
    } catch (error) {
      console.error('[FIREBASE_INIT] Error initializing Firebase Admin:', error);
    }
  } else {
    console.error('[FIREBASE_INIT] Could not initialize Firebase Admin: Service account details are missing or invalid.');
  }
} else {
  db = admin.firestore();
}

export { db };
