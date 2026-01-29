// hooks/useFeatureAccess.ts
"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import { canUseFeature, FeatureKey } from "@/lib/canUseFeature";

type AccessReason =
  | "loading"
  | "not_authenticated"
  | "limit_reached"
  | "allowed";

export function useFeatureAccess(feature: FeatureKey) {
  const { userData, loading } = useAuthUser();

  if (loading) {
    return {
      loading: true,
      allowed: false,
      reason: "loading" as AccessReason,
    };
  }

  if (!userData) {
    return {
      loading: false,
      allowed: false,
      reason: "not_authenticated" as AccessReason,
    };
  }

  const allowed = canUseFeature(userData, feature);

  return {
    loading: false,
    allowed,
    reason: allowed ? "allowed" : "limit_reached",
  };
}
