import admin from 'firebase-admin';

let db: admin.firestore.Firestore;

function initializeAdminApp() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const rawKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!rawKey) {
    console.error('[FIREBASE_INIT] FATAL_ERROR: FIREBASE_SERVICE_ACCOUNT_KEY environment variable not set.');
    return null;
  }

  try {
    const decodedKey = Buffer.from(rawKey, 'base64').toString('utf-8');
    const serviceAccount = JSON.parse(decodedKey);

    // The 'private_key' needs to have its escaped newlines replaced with actual newlines.
    // This is a common issue when storing JSON keys in environment variables.
    if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    const app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('[FIREBASE_INIT] Firebase Admin initialized successfully.');
    return app;
  } catch (error: any) {
    console.error('[FIREBASE_INIT] FATAL_ERROR: Error initializing Firebase Admin:', error.message);
    return null;
  }
}

const adminApp = initializeAdminApp();

if (adminApp) {
  db = admin.firestore();
}

export { db };
