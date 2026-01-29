"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import PlanStatusCard from "@/components/PlanStatusCard";
import FeatureListCard from "@/components/FeatureListCard";
import UsageOverview from "@/components/UsageOverview";
import UserProductsCard from "@/components/UserProductsCard";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* TÍTULO */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Dashboard
          </h1>
          <p className="text-neutral-400 mt-1">
            Gerencie suas anotações, rotinas e objetivos
          </p>
        </div>
        
<UserProductsCard />
        {/* STATUS DO PLANO */}
        <PlanStatusCard />

        {/* USO DOS RECURSOS */}
        <UsageOverview />

        {/* LISTA DE RECURSOS */}
        <FeatureListCard />

        {/* ÁREAS FUTURAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-neutral-400">
            Área de anotações (em breve)
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 text-neutral-400">
            Rotinas & metas (em breve)
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
