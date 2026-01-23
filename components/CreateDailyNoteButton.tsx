"use client";

import { useFeatureAccess } from "@/hooks/useFeatureAccess";
import { useAuthUser } from "@/lib/useAuthUser";
import { incrementUsage } from "@/lib/incrementUsage";
import { useState } from "react";
import Link from "next/link";

export default function CreateDailyNoteButton() {
  const { allowed, loading } = useFeatureAccess("dailyNotes");
  const { user } = useAuthUser();
  const [creating, setCreating] = useState(false);

  async function handleCreate() {
    if (!allowed || !user) return;

    setCreating(true);

    try {
      // 📝 AQUI ENTRA A CRIAÇÃO REAL DO DIÁRIO
      // ex: await addDoc(collection(db, "dailyNotes"), {...})

      await new Promise((res) => setTimeout(res, 800));

      // ✅ INCREMENTA USO
      await incrementUsage(user.uid, "dailyNotes");

      alert("Entrada de diário criada com sucesso!");
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  }

  if (loading) return null;

  if (!allowed) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
        <p className="text-sm text-neutral-300 mb-3">
          Você atingiu o limite de entradas de diário deste plano.
        </p>
        <Link
          href="/planos"
          className="inline-block bg-yellow-400 text-black px-4 py-2 rounded font-semibold"
        >
          Fazer upgrade
        </Link>
      </div>
    );
  }

  return (
    <button
      onClick={handleCreate}
      disabled={creating}
      className="bg-emerald-600 text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-50"
    >
      {creating ? "Criando..." : "Nova entrada de diário"}
    </button>
  );
}
