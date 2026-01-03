"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserPlan } from "@/lib/useUserPlan";

export default function ProtectedRoute({
  children,
  requirePremium = false,
}: {
  children: React.ReactNode;
  requirePremium?: boolean;
}) {
  const router = useRouter();
  const { loading, isPremium, plan } = useUserPlan();

  const isAuthenticated = plan !== null;

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (requirePremium && !isPremium) {
      router.replace("/planos");
    }
  }, [loading, isAuthenticated, isPremium, requirePremium, router]);

  if (loading) return <p>Carregando...</p>;

  return <>{children}</>;
}
