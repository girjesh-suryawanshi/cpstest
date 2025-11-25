"use client";

import { useFirebaseApp } from '@/hooks/use-firebase-app';
import { useFirestore } from '@/hooks/use-firestore';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import React, { createContext, useContext } from 'react';

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
    const app = useFirebaseApp();
    const firestore = useFirestore();

    return (
        <FirebaseContext.Provider value={{ app, firestore }}>
            {children}
        </FirebaseContext.Provider>
    );
};
