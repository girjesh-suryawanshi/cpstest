
"use client";

import { useState, useEffect } from 'react';
import { getFirestore, Firestore } from 'firebase/firestore';
import { useFirebaseApp } from './use-firebase-app';

export function useFirestore() {
  const app = useFirebaseApp();
  const [firestore, setFirestore] = useState<Firestore | null>(null);

  useEffect(() => {
    if (app) {
      setFirestore(getFirestore(app));
    }
  }, [app]);

  return firestore;
}
