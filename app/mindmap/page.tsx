"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";
import Link from "next/link";

export default function MindmapPage() {
  return (
    <ProtectedRoute>
      <MindmapContent />
    </ProtectedRoute>
  );
}

function MindmapContent() {
  const { allowed, loading } = useFeatureAccess("mindmaps");

  if (loading) return null;

  if (!allowed) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-3">
          Recurso Premium
        </h1>

        <p className="text-neutral-400 mb-6">
          Notas em árvore (Mindmap) estão disponíveis
          apenas para usuários Premium.
        </p>

        <Link
          href="/planos"
          className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold"
        >
          Fazer upgrade
        </Link>
      </div>
    );
  }

  // ✅ PREMIUM — ACESSO TOTAL
  return (
    <div className="max-w-5xl mx-auto p-8 text-white">
      <h1 className="text-xl font-bold mb-4">
        Mindmap / Notas em Árvore
      </h1>

      {/* Editor real entra aqui no futuro */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <p className="text-neutral-400">
          Editor de Mindmap em desenvolvimento.
        </p>
      </div>
    </div>
  );
}
