export function isPremiumUser(userData: any) {
  if (!userData?.stripe) return false;

  const { status, currentPeriodEnd } = userData.stripe;

  if (status !== "active") return false;
  if (!currentPeriodEnd) return false;

  return new Date(currentPeriodEnd).getTime() > Date.now();
}
