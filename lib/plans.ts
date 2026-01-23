export const PLANS = {
  free: {
    name: "Free",
    entitlements: {
      notes: 5,
      aiCalls: 3,
    },
  },

  premium: {
    name: "Premium",
    entitlements: {
      notes: null,     // ilimitado
      aiCalls: null,
    },
  },
} as const;

export type PlanKey = keyof typeof PLANS;
export type FeatureKey = keyof typeof PLANS.free.entitlements;
