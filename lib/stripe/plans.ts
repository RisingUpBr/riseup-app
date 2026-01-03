export const PRICE_ID_TO_PLAN: Record<string, string> = {
  [process.env.STRIPE_PRICE_MENSAL!]: "mensal",
  [process.env.STRIPE_PRICE_ANUAL!]: "anual",
  [process.env.STRIPE_PRICE_QUINZENAL!]: "quinzenal",
};
