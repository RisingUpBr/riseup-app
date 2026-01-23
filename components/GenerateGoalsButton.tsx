"use client";

import { useState } from "react";
import { useAuthUser } from "@/lib/useAuthUser";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";
import { incrementUsage } from "@/lib/incrementUsage";
import Link from "next/link";

export default function GenerateGoalsButton() {
  const { user } = useAuthUser();
  const { allowed, loading } = useFeatureAccess("aiGoalsGenerator");

  const [generating, setGenerating] = useState(false);

  async function handleGenerate() {
    if (!allowed || !user) return;

    try {
      setGenerating(true);

      // 🎯 FUTURA IA DE GERAÇÃO DE METAS
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ✅ INCREMENTA USO APENAS SE DEU CERTO
      await incrementUsage(user.uid, "aiGoalsGenerator");

      alert("Metas geradas com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar metas.");
    } finally {
      setGenerating(false);
    }
  }

  if (loading) return null;

  if (!allowed) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center">
        <p className="text-sm text-neutral-300 mb-3">
          Você atingiu o limite de geração automática de metas deste plano.
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
      className="w-full bg-indigo-600 text-white font-semibold px-4 py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
    >
      {generating ? "Gerando metas..." : "Gerar metas automaticamente"}
    </button>
  );
}
