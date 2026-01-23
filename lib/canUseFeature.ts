// lib/canUseFeature.ts

export type FeatureKey =
  | "simpleNotes"
  | "dailyNotes"
  | "mindmaps"
  | "manualFlashcards"
  | "aiFlashcards"
  | "aiRoutineGenerator"
  | "aiGoalsGenerator"
  | "calendarRoutine"
  | "exclusiveLibrary";

export function canUseFeature(
  userData: any,
  feature: FeatureKey
): boolean {
  if (!userData) return false;

  const limits = userData.limits ?? {};
  const usage = userData.usage ?? {};

  const limit = limits[feature];
  const used = usage[feature] ?? 0;

  // 🔒 Feature não configurada → bloqueia por segurança
  if (limit === undefined) return false;

  // 💎 Premium / ilimitado
  if (limit === Infinity) return true;

  if (typeof limit !== "number") return false;

  return used < limit;
}
