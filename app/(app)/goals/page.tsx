"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import GenerateGoalsButton from "@/components/GenerateGoalsButton";

export default function GoalsPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-xl mx-auto py-10 space-y-6">
        <h1 className="text-2xl font-bold text-white">
          Gerador Inteligente de Metas
        </h1>

        <p className="text-neutral-400 text-sm">
          Defina metas claras com ajuda da inteligência artificial.
        </p>

        <GenerateGoalsButton />
      </div>
    </ProtectedRoute>
  );
}
