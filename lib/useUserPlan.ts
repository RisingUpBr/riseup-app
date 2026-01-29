"use client";

import { useEffect, useState, useCallback } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuthUser } from "@/hooks/useAuthUser";
import { PLANS, FeatureKey, PlanKey } from "@/lib/plans";

export function useUserPlan() {
  const { user, loading: authLoading } = useAuthUser();

  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<PlanKey>("free");
  const [entitlements, setEntitlements] = useState<Record<string, number | null>>(
    PLANS.free.entitlements
  );
  const [usage, setUsage] = useState<Record<string, number>>({});

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setPlan("free");
      setEntitlements(PLANS.free.entitlements);
      setUsage({});
      setLoading(false);
      return;
    }

    const ref = doc(db, "users", user.uid);

    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.data();

      const userPlan: PlanKey = data?.plan ?? "free";

      setPlan(userPlan);
      setEntitlements(
        data?.entitlements ?? PLANS[userPlan].entitlements
      );
      setUsage(data?.usage ?? {});
      setLoading(false);
    });

    return () => unsub();
  }, [user, authLoading]);

  const isUnlimited = useCallback(
    (feature: FeatureKey) => entitlements[feature] === null,
    [entitlements]
  );

  const remaining = useCallback(
    (feature: FeatureKey) => {
      if (entitlements[feature] === null) return null;
      return Math.max(
        0,
        (entitlements[feature] ?? 0) - (usage[feature] ?? 0)
      );
    },
    [entitlements, usage]
  );

  const canUse = useCallback(
    (feature: FeatureKey) => {
      if (entitlements[feature] === null) return true;
      return (usage[feature] ?? 0) < (entitlements[feature] ?? 0);
    },
    [entitlements, usage]
  );

  return {
    loading,
    plan,
    entitlements,
    usage,
    canUse,
    remaining,
    isUnlimited,
    isPremium: plan !== "free",
  };
}