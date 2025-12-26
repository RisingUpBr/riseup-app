import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkv_NQtO4HEmLdAGAvPMVxeAqcQYYfjv4",
  authDomain: "rise-up-ecosystem.firebaseapp.com",
  projectId: "rise-up-ecosystem",
  storageBucket: "rise-up-ecosystem.firebasestorage.app",
  messagingSenderId: "508077648670",
  appId: "1:508077648670:web:6a3982e659095309d0f70f",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 🔑 Auth
export const auth = getAuth(app);

// 🗄️ Firestore
export const db = getFirestore(app);

