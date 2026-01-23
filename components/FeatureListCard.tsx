"use client";

import { useUserPlan } from "@/lib/useUserPlan";
import Link from "next/link";

const FEATURES = [
  { label: "Notas ilimitadas", premium: true },
  { label: "Flashcards automáticos", premium: true },
  { label: "Organizador de rotina com IA", premium: true },
  { label: "Notas em árvore (mind map)", premium: true },
  { label: "Diário básico", premium: false },
  { label: "Calendário simples", premium: false },
];

export default function FeatureListCard() {
  const { isPremium } = useUserPlan();

  return (
    <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
      <h3 className="text-lg font-semibold text-white mb-4">
        Recursos disponíveis
      </h3>

      <ul className="space-y-3">
        {FEATURES.map((f) => {
          const locked = f.premium && !isPremium;

          return (
            <li
              key={f.label}
              className={`flex justify-between items-center text-sm ${
                locked ? "text-neutral-500" : "text-white"
              }`}
            >
              <span>{f.label}</span>

              {locked ? (
                <span className="text-xs bg-neutral-700 px-2 py-1 rounded">
                  Premium
                </span>
              ) : (
                <span className="text-green-400 text-xs">✔</span>
              )}
            </li>
          );
        })}
      </ul>

      {!isPremium && (
        <Link
          href="/planos"
          className="block mt-6 text-center bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-300 transition"
        >
          Liberar todos os recursos
        </Link>
      )}
    </div>
  );
}
