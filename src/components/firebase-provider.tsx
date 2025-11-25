"use client";

import { firebaseConfig } from '@/lib/firebase/config';
import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface FirebaseContextType {
    app: FirebaseApp | null;
    firestore: Firestore | null;
}

const FirebaseContext = createContext<FirebaseContextType>({
    app: null,
    firestore: null,
});

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [app, setApp] = useState<FirebaseApp | null>(null);
    const [firestore, setFirestore] = useState<Firestore | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const apps = getApps();
            const initializedApp = apps.length > 0 ? apps[0] : initializeApp(firebaseConfig);
            const firestoreInstance = getFirestore(initializedApp);
            
            setApp(initializedApp);
            setFirestore(firestoreInstance);
        }
    }, []);

    return (
        <FirebaseContext.Provider value={{ app, firestore }}>
            {children}
        </FirebaseContext.Provider>
    );
};
