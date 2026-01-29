"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserPlan } from "@/lib/useUserPlan";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requirePremium?: boolean;
}

export default function ProtectedRoute({
  children,
  requirePremium = false,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthUser();
  const { isPremium, loading: planLoading } = useUserPlan();

  const loading = authLoading || planLoading;

  useEffect(() => {
    if (loading) return;

    // Se não está logado, redireciona para auth
    if (!user) {
      router.push("/auth");
      return;
    }

    // Se requer premium mas não é premium, redireciona para upgrade/planos
    if (requirePremium && !isPremium) {
      router.push("/planos");
      return;
    }
  }, [user, isPremium, loading, requirePremium, router]);

  // Mostra loading enquanto verifica
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não está autenticado, não renderiza nada (vai redirecionar)
  if (!user) {
    return null;
  }

  // Se requer premium mas não é premium, não renderiza (vai redirecionar)
  if (requirePremium && !isPremium) {
    return null;
  }

  // Tudo ok, renderiza o conteúdo
  return <>{children}</>;
}