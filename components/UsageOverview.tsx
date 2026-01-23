"use client";

import { useAuthUser } from "@/lib/useAuthUser";
import { FEATURE_DEFINITIONS } from "@/lib/features";
import FeatureUsageCard from "./FeatureUsageCard";

export default function UsageOverview() {
  const { userData, loading } = useAuthUser();

  if (loading || !userData) return null;

  const limits = userData.limits ?? {};
  const usage = userData.usage ?? {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {FEATURE_DEFINITIONS.map((feature) => {
        const limit = limits[feature.key];
        const used = usage[feature.key] ?? 0;

        return (
          <FeatureUsageCard
            key={feature.key}
            label={feature.label}
            description={feature.description}
            used={used}
            limit={limit === Infinity ? "∞" : limit ?? 0}
          />
        );
      })}
    </div>
  );
}
