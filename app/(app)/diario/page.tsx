"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import FeatureGate from "@/components/FeatureGate";
import CreateDailyNoteButton from "@/components/CreateDailyNoteButton";

export default function DiarioPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold text-white">Diário</h1>

        {/* 🔒 BLOQUEIO SÓ NO BOTÃO */}
        <FeatureGate feature="dailyNotes">
          <CreateDailyNoteButton />
        </FeatureGate>

        {/* 👀 LEITURA SEMPRE LIBERADA */}
        <div className="text-neutral-400">
          Suas entradas aparecerão aqui.
        </div>
      </div>
    </ProtectedRoute>
  );
}
