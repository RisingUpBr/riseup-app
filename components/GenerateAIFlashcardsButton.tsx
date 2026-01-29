"use client";

import { useFeatureAccess } from "@/hooks/useFeatureAccess";
import { useAuthUser } from "@/hooks/useAuthUser";
import { incrementUsage } from "@/lib/incrementUsage";
import { useState } from "react";
import Link from "next/link";

export default function GenerateAIFlashcardsButton({
  text,
}: {
  text: string;
}) {
  const { allowed, loading } = useFeatureAccess("aiFlashcards");
  const { user } = useAuthUser();
  const [generating, setGenerating] = useState(false);

  async function handleGenerate() {
    if (!allowed || !user || !text) return;

    try {
      setGenerating(true);

      // 🤖 IA REAL ENTRA AQUI (placeholder)
      await new Promise((res) => setTimeout(res, 1500));

      // ✅ SÓ INCREMENTA APÓS SUCESSO
      await incrementUsage(user.uid, "aiFlashcards");

      alert("Flashcards gerados com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar flashcards.");
    } finally {
      setGenerating(false);
    }
  }

  if (loading) return null;

  if (!allowed) {
    return (
      <div className="relative">
        <div className="blur-sm pointer-events-none select-none">
          <button className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg">
            Gerar flashcards por IA
          </button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/70 text-white p-6 rounded-xl max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-2">
              Limite atingido
            </h3>
            <p className="text-sm opacity-90 mb-4">
              Você atingiu o limite mensal de flashcards por IA.
            </p>

            <Link
              href="/planos"
              className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition"
            >
              Fazer upgrade
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleGenerate}
      disabled={generating || !text}
      className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
    >
      {generating ? "Gerando flashcards..." : "Gerar flashcards por IA"}
    </button>
  );
}
