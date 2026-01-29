"use client";

import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot, getDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";
import { ensureUserDocument } from "@/lib/ensureUserDocument";
import { normalizeUser } from "@/lib/normalizeUser";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const normalizedRef = useRef(false);

  useEffect(() => {
    let unsubscribeUserSnapshot: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        if (unsubscribeUserSnapshot) unsubscribeUserSnapshot();
        normalizedRef.current = false;
        setUser(null);
        setUserData(null);
        setLoading(false);
        return;
      }

      setUser(firebaseUser);

      await ensureUserDocument(firebaseUser);

      const ref = doc(db, "users", firebaseUser.uid);

      if (!normalizedRef.current) {
        const snap = await getDoc(ref);
        if (snap.exists()) {
          await normalizeUser(firebaseUser.uid, snap.data());
          normalizedRef.current = true;
        }
      }

      unsubscribeUserSnapshot = onSnapshot(ref, (snap) => {
        if (snap.exists()) {
          setUserData(snap.data());
        }
        setLoading(false);
      });
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUserSnapshot) unsubscribeUserSnapshot();
    };
  }, []);

  return {
    user,
    userData,
    loading,
    isAuthenticated: !!user,
  };
}
