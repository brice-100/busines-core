// ===================================================
// Univers Formations — accès aux données
// Source : data/formations-cameroun.json
// (généré depuis les fichiers filiere-*.html, ou saisi à la main)
// ===================================================

import data from "@/data/formations-cameroun.json";

// ---------- Types ----------
export interface Matiere {
  num: string;
  intitule: string;
  volume: string;
  /** lien optionnel vers un cours (ouvert dans un nouvel onglet) */
  lien?: string;
}

export interface Semestre {
  label: string;
  description: string;
  matieres: Matiere[];
}

export interface Formation {
  /** id local au métier (index) */
  id: string;
  slug: string;
  etablissement: string;
  parcours: string;
  semestres: Semestre[];
}

export interface Metier {
  /** id global, ex. "f1-metier-a" */
  id: string;
  slug: string;
  nom: string;
  description: string;
  filiereId: string;
  filiereNum: number;
  filiereTitre: string;
  formations: Formation[];
}

export interface Filiere {
  id: string;
  numero: number;
  slug: string;
  titre: string;
  sousTitre: string;
  image: string;
  metiers: Metier[];
}

interface FormationsData {
  filieres: Filiere[];
}

const dataset = data as unknown as FormationsData;

// ---------- Accès ----------
export const getFilieres = (): Filiere[] => dataset.filieres;

export const getFiliereByNum = (numero: number): Filiere | undefined =>
  dataset.filieres.find((f) => f.numero === numero);

export const getAllMetiers = (): Metier[] =>
  dataset.filieres.flatMap((f) => f.metiers);

export const getMetierById = (id: string): Metier | undefined =>
  getAllMetiers().find((m) => m.id === id);

export const getFormation = (
  metierId: string,
  formationId: string
): { metier: Metier; formation: Formation } | undefined => {
  const metier = getMetierById(metierId);
  if (!metier) return undefined;
  const formation = metier.formations.find((f) => f.id === formationId);
  if (!formation) return undefined;
  return { metier, formation };
};

// ---------- Helpers d'affichage ----------
/** Nombre total de matières d'une formation (tous semestres confondus) */
export const countMatieres = (formation: Formation): number =>
  formation.semestres.reduce((acc, s) => acc + s.matieres.length, 0);

/** Nombre total de matières d'un métier (toutes formations) */
export const countMatieresMetier = (metier: Metier): number =>
  metier.formations.reduce((acc, f) => acc + countMatieres(f), 0);

// ---------- Charte visuelle par filière (couleurs douces) ----------
export type FiliereTheme = {
  /** clé d'accent Tailwind du projet */
  accent: "primary" | "violet" | "cyan" | "green" | "indigo" | "orange";
  /** classes utilitaires pré-composées */
  text: string;
  bg: string;
  bgSoft: string;
  border: string;
  ring: string;
  gradient: string;
};

const THEMES: Record<number, FiliereTheme> = {
  1: {
    accent: "primary",
    text: "text-primary-600",
    bg: "bg-primary-600",
    bgSoft: "bg-primary-50",
    border: "border-primary-100",
    ring: "ring-primary-100",
    gradient: "from-primary-600 to-primary-400",
  },
  2: {
    accent: "violet",
    text: "text-accent-violet-500",
    bg: "bg-accent-violet-500",
    bgSoft: "bg-accent-violet-50",
    border: "border-accent-violet-100",
    ring: "ring-accent-violet-100",
    gradient: "from-accent-violet-500 to-accent-violet-400",
  },
  3: {
    accent: "cyan",
    text: "text-accent-cyan-500",
    bg: "bg-accent-cyan-500",
    bgSoft: "bg-accent-cyan-50",
    border: "border-accent-cyan-100",
    ring: "ring-accent-cyan-100",
    gradient: "from-accent-cyan-500 to-accent-cyan-400",
  },
  4: {
    accent: "green",
    text: "text-accent-green-600",
    bg: "bg-accent-green-500",
    bgSoft: "bg-accent-green-50",
    border: "border-accent-green-100",
    ring: "ring-accent-green-100",
    gradient: "from-accent-green-600 to-accent-green-400",
  },
};

const FALLBACK_THEME: FiliereTheme = THEMES[1];

export const getFiliereTheme = (numero: number): FiliereTheme =>
  THEMES[numero] ?? FALLBACK_THEME;
