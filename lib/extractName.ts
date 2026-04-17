export function extractNameFromEmail(email: string): string {
  const local = email.split("@")[0];

  // Tenta separar por pontos, underscores, hifens primeiro
  const bySeparator = local.split(/[._\-+]/).filter(Boolean)[0];
  if (bySeparator && bySeparator.length >= 2) {
    const clean = bySeparator.replace(/[^a-zA-ZÀ-ÿ]/g, "");
    if (clean.length >= 2) {
      return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
    }
  }

  // Sem separador — tenta extrair só as letras iniciais antes de números
  const onlyLetters = local.replace(/[^a-zA-ZÀ-ÿ]/g, "");

  // Tenta detectar transição camelCase: "kaykyHcosta" → ["kayky", "Hcosta"]
  const camelSplit = onlyLetters.split(/(?=[A-ZÀ-Ÿ])/);
  if (camelSplit.length > 1 && camelSplit[0].length >= 2) {
    return camelSplit[0].charAt(0).toUpperCase() + camelSplit[0].slice(1).toLowerCase();
  }

  // Tudo minúsculo sem separador — pega até 8 chars como nome base
  const maxLen = Math.min(onlyLetters.length, 8);
  const base = onlyLetters.slice(0, maxLen);

  if (!base) return "Você";
  return base.charAt(0).toUpperCase() + base.slice(1).toLowerCase();
}
