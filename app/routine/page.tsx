"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import GenerateRoutineButton from "@/components/GenerateRoutineButton";

export default function RoutinePage() {
  return (
    <ProtectedRoute>
      <div className="max-w-xl mx-auto py-10 space-y-6">
        <h1 className="text-2xl font-bold text-white">
          Gerador de Rotina Inteligente
        </h1>

        <p className="text-neutral-400 text-sm">
          Crie uma rotina personalizada com base nos seus objetivos.
        </p>

        <GenerateRoutineButton />
      </div>
    </ProtectedRoute>
  );
}
