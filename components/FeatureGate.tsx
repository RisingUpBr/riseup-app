"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { FeatureKey } from "@/lib/canUseFeature";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";

type Props = {
  feature: FeatureKey;
  children: ReactNode;
};

export default function FeatureGate({ feature, children }: Props) {
  const { loading, allowed, reason } = useFeatureAccess(feature);

  // ⏳ Loading → mantém layout, sem piscar
  if (loading) {
    return (
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
    );
  }

  // ✅ Acesso liberado
  if (allowed) {
    return <>{children}</>;
  }

  // 🎯 Texto dinâmico conforme motivo
  const title =
    reason === "limit_reached"
      ? "Limite atingido"
      : "Recurso Premium";

  const description =
    reason === "limit_reached"
      ? "Você utilizou o limite desta funcionalidade no seu plano atual."
      : "Este recurso está disponível apenas para planos pagos da Rise Up.";

  return (
    <div className="relative">
      {/* Conteúdo original desfocado */}
      <div className="blur-sm pointer-events-none select-none opacity-60">
        {children}
      </div>

      {/* Overlay de bloqueio */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/80 text-white p-6 rounded-xl max-w-sm text-center border border-neutral-700 space-y-4">
          <h3 className="text-lg font-semibold">
            {title}
          </h3>

          <p className="text-sm text-neutral-300">
            {description}
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/planos"
              className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition"
            >
              Ver planos
            </Link>

            <Link
              href="/sobre"
              className="text-sm text-neutral-400 hover:underline"
            >
              Por que confiar na Rise Up?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
