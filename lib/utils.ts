// ===================================================
// Business Core — Utilitaires généraux
// ===================================================

/** Génère un ID unique simple */
export const generateId = (prefix = "id"): string =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

/** Classe CSS conditionnelle (équivalent léger de clsx) */
export const cn = (...classes: (string | undefined | false | null)[]): string =>
  classes.filter(Boolean).join(" ");

/** Délai asynchrone */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** Formate un nombre en devise */
export const formatCurrency = (
  amount: number,
  currency = "EUR",
  locale = "fr-FR"
): string =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
