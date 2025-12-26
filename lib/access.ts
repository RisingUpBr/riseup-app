import { User } from "firebase/auth";

export type AppPlan = "free" | "biweekly" | "monthly" | "annual";
export type ProductPlan = "free" | "basic" | "essential" | "pro";

export type UserAccessData = {
  appPlan: AppPlan;
  productPlan: ProductPlan;
  appPlanExpiresAt: any | null;
};

export function isAppPlanActive(userData: UserAccessData): boolean {
  if (!userData.appPlanExpiresAt) return true;

  const expires =
    userData.appPlanExpiresAt.toDate?.() ??
    new Date(userData.appPlanExpiresAt);

  return expires > new Date();
}
export function getAppCapabilities(plan: AppPlan) {
  switch (plan) {
    case "free":
      return {
        maxNotes: 10,
        maxTasks: 5,
        dailyCheckins: false,
        reports: false,
        timers: false,
      };

    case "biweekly":
    case "monthly":
    case "annual":
      return {
        maxNotes: Infinity,
        maxTasks: Infinity,
        dailyCheckins: true,
        reports: true,
        timers: true,
      };

    default:
      return {
        maxNotes: 0,
        maxTasks: 0,
        dailyCheckins: false,
        reports: false,
        timers: false,
      };
  }
}
export function canCreateItem(
  currentCount: number,
  maxAllowed: number
): boolean {
  if (maxAllowed === Infinity) return true;
  return currentCount < maxAllowed;
}
