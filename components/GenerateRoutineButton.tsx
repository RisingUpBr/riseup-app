"use client";

import { useState } from "react";
import { useAuthUser } from "@/lib/useAuthUser";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";
import { incrementUsage } from "@/lib/incrementUsage";
import Link from "next/link";

export default function GenerateRoutineButton() {
  const { user } = useAuthUser();
  const { allowed, loading } = useFeatureAccess("aiRoutineGenerator");

  const [generating, setGenerating] = useState(false);

  async function handleGenerate() {
    if (!allowed || !user) return;

    try {
      setGenerating(true);

      // 🔮 FUTURA GERAÇÃO REAL COM IA
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ✅ INCREMENTA USO SOMENTE APÓS SUCESSO
      await incrementUsage(user.uid, "aiRoutineGenerator");

      alert("Rotina gerada com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar rotina.");
    } finally {
      setGenerating(false);
    }
  }

  if (loading) return null;

  if (!allowed) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
        <p className="text-sm text-neutral-300 mb-3">
          Você atingiu o limite de geração automática de rotina deste plano.
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
      onClick={handleGenerate}
      disabled={generating}
      className="w-full bg-yellow-500 text-black font-semibold px-4 py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
    >
      {generating ? "Gerando rotina..." : "Gerar rotina automática"}
    </button>
  );
}
