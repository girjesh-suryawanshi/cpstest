
"use client";

import { useState, useEffect } from 'react';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { firebaseConfig } from '@/lib/firebase/config';

export function useFirebaseApp() {
  const [app, setApp] = useState<FirebaseApp | null>(null);

  useEffect(() => {
    // Initialize Firebase only on the client side, and only once.
    if (typeof window !== 'undefined') {
      const apps = getApps();
      if (apps.length === 0) {
        setApp(initializeApp(firebaseConfig));
      } else {
        setApp(apps[0]);
      }
    }
  }, []);

  return app;
}
