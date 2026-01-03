"use client";

import { useUserPlan } from "@/lib/useUserPlan";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  const { isPremium } = useUserPlan();

  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>

        {!isPremium && (
          <div className="mt-4 p-4 border rounded bg-yellow-100">
            <p className="mb-2">
              Desbloqueie todo o conteúdo premium da RiseUp
            </p>
            <Link
              href="/planos"
              className="bg-black text-yellow-400 px-4 py-2 rounded"
            >
              Virar Premium
            </Link>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}


