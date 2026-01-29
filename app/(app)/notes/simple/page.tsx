"use client";

import { useState } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";
import { incrementUsage } from "@/lib/incrementUsage";
import Link from "next/link";

export default function SimpleNotesPage() {
  const { user } = useAuthUser();
  const { allowed, loading } = useFeatureAccess("simpleNotes");

  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  if (loading) return null;

  async function handleSaveNote() {
    if (!user || !allowed || !text) return;

    try {
      setSaving(true);

      // 💾 CRIAÇÃO REAL DA NOTA
      // await addDoc(collection(db, "notes"), {...})

      // ✅ INCREMENTA USO APÓS SUCESSO
      await incrementUsage(user.uid, "simpleNotes");

      setText("");
      alert("Nota criada com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar nota");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto py-10 space-y-4">
      <h1 className="text-xl font-bold text-white">
        Notas Simples
      </h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-32 bg-neutral-900 border border-neutral-700 rounded-lg p-4 text-white"
        placeholder="Escreva sua nota..."
      />

      {!allowed ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
          <p className="text-sm text-neutral-300 mb-3">
            Você atingiu o limite de notas simples do plano gratuito.
          </p>
          <Link
            href="/planos"
            className="inline-block bg-yellow-400 text-black px-4 py-2 rounded font-semibold"
          >
            Fazer upgrade
          </Link>
        </div>
      ) : (
        <button
          onClick={handleSaveNote}
          disabled={saving || !text}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Salvando..." : "Salvar nota"}
        </button>
      )}
    </div>
  );
}
