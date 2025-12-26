"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuthUser } from "@/lib/useAuthUser";
import { getAppCapabilities, canCreateItem } from "@/lib/access";

export default function NotesSection() {
  const router = useRouter();
  const { user, userData, loading } = useAuthUser();

  const [notesCount, setNotesCount] = useState(0);
  const [notesLoading, setNotesLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // ✅ aqui o uid é 100% string
    const uid = user.uid;

    async function fetchNotes() {
      const snap = await getDocs(
        collection(db, "users", uid, "notes")
      );
      setNotesCount(snap.size);
      setNotesLoading(false);
    }

    fetchNotes();
  }, [user]);

  if (!user || !userData || loading || notesLoading) return null;

  // ✅ uid seguro aqui também
  const uid = user.uid;

  const capabilities = getAppCapabilities(userData.appPlan);
  const canCreate = canCreateItem(notesCount, capabilities.maxNotes);

  async function handleCreateNote() {
    if (!canCreate) {
      router.push("/upgrade");
      return;
    }

    await addDoc(
      collection(db, "users", uid, "notes"),
      {
        content: "Nova nota",
        createdAt: serverTimestamp(),
      }
    );

    setNotesCount((c) => c + 1);
  }

  return (
    <section style={{ marginTop: 30 }}>
      <h3>📝 Notas</h3>

      <p>
        {notesCount} /{" "}
        {capabilities.maxNotes === Infinity
          ? "∞"
          : capabilities.maxNotes}
      </p>

      <button onClick={handleCreateNote}>
        Criar nota
      </button>

      {!canCreate && (
        <p style={{ marginTop: 8 }}>
          🔒 Limite do plano atingido — <strong>faça upgrade</strong>
        </p>
      )}
    </section>
  );
}

