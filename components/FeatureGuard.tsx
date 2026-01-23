"use client";

import { useUserPlan } from "@/lib/useUserPlan";
import UpgradeCTA from "./UpgradeCTA";
import { FeatureKey } from "@/lib/plans";

export default function FeatureGuard({
  feature,
  children,
}: {
  feature: FeatureKey;
  children: React.ReactNode;
}) {
  const { canUse, loading } = useUserPlan();

  if (loading) return null;

  if (!canUse(feature)) {
    return <UpgradeCTA feature={feature} />;
  }

  return <>{children}</>;
}
