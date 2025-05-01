/**
 * Firebase Initialization Module
 *
 * This module initializes and exports Firebase services such as Auth
 * using environment-based configuration. It ensures Firebase is only
 * initialized once using the `getApps()` check.
 *
 * @module firebase
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

/**
 * Firebase configuration loaded from environment variables.
 * Make sure the following variables are defined in `.env`:
 * - NEXT_PUBLIC_FIREBASE_API_KEY
 * - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
 * - NEXT_PUBLIC_FIREBASE_PROJECT_ID
 * - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
 * - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
 * - NEXT_PUBLIC_FIREBASE_APP_ID
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Initializes and returns the Firebase App instance.
 * Ensures the app is initialized only once.
 */
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

/**
 * Auth instance from Firebase, initialized from the app.
 */
export const auth = getAuth(app);

