// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// analytics only in browser (optional)
if (typeof window !== "undefined") {
  try {
    getAnalytics(app);
  } catch (e) {
    // ignore in dev or unsupported environments
    console.warn("Analytics init failed:", e?.message ?? e);
  }
}

// initialize auth and db
export const auth = getAuth(app);
export const db = getFirestore(app);

// persist auth in local storage (keeps login across reloads)
setPersistence(auth, browserLocalPersistence).catch((e) => {
  console.warn("setPersistence error:", e?.message || e);
});

// DEBUG helper: attach to window so you can inspect from console.
// REMOVE or comment out this line before production.
if (typeof window !== "undefined") {
  window.auth = auth;
  window.db = db;
  window.__FIREBASE_CONFIG__ = firebaseConfig; // helpful to confirm envs in runtime
}

export default app;
