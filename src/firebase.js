// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCFV9lD_7GJaOsyKxE-rfmXaScLC-0VlN8",
  authDomain: "home-stay-connect.firebaseapp.com",
  projectId: "home-stay-connect",
  storageBucket: "home-stay-connect.appspot.com",
  messagingSenderId: "801766350429",
  appId: "1:801766350429:web:dc85d14a3e3275ecd3b7b4",
  measurementId: "G-5E2WLJTCPC",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Keep users logged in
setPersistence(auth, browserLocalPersistence);

window.auth = auth; // for debugging

export { auth };
export default app;
