"use client";

import { useUserPlan } from "@/lib/useUserPlan";
import Link from "next/link";

export default function PlanStatusCard() {
  const { loading, isPremium, plan } = useUserPlan();

  if (loading) {
    return (
      <div className="bg-neutral-900 p-6 rounded-xl animate-pulse h-32" />
    );
  }

  return (
    <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">
          Seu plano
        </h2>

        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            isPremium
              ? "bg-yellow-400 text-black"
              : "bg-neutral-700 text-white"
          }`}
        >
          {isPremium ? "Premium" : "Gratuito"}
        </span>
      </div>

      <p className="text-sm text-neutral-400 mt-2">
        {isPremium
          ? `Plano ativo: ${plan}`
          : "Você está usando o plano gratuito"}
      </p>

      {!isPremium && (
        <Link
          href="/planos"
          className="inline-block mt-4 bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-300 transition"
        >
          Fazer upgrade
        </Link>
      )}
    </div>
  );
}
