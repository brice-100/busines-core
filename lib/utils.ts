// ===================================================
// Business Core — Utilitaires généraux
// ===================================================
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Génère un ID unique simple */
export const generateId = (prefix = "id"): string =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

/** * Classe CSS conditionnelle améliorée avec fusion Tailwind.
 * Combine clsx pour les conditions et twMerge pour écraser les conflits (ex: p-4 vs p-7).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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