// ===================================================
// Univers Carrières — accès aux données
// Source : data/carrieres-cameroun.json
// (où se former + évolution de carrière par métier)
// ===================================================

import data from "@/data/carrieres-cameroun.json";

// On utilise une charte visuelle violette pour tout l'univers Carrières comme demandé
import { getFiliereTheme as getOriginalFiliereTheme, type FiliereTheme } from "@/lib/formations-data";

export const getFiliereTheme = (numero: number): FiliereTheme => {
  // Retourne toujours le thème 2 (Violet) pour forcer la couleur sur toute la section Carrières
  return getOriginalFiliereTheme(2);
};

export type { FiliereTheme };

// ---------- Types ----------
export interface LieuFormation {
  etablissement: string;
  diplome: string;
  niveau: string;
  /** lien optionnel vers le cursus détaillé dans l'univers Formations */
  metierId?: string;
  formationId?: string;
}

export interface EtapeCarriere {
  niveau: string;
  poste: string;
  description: string;
  experience: string;
}

export interface CarriereMetier {
  id: string;
  slug: string;
  nom: string;
  filiereNum: number;
  filiereTitre: string;
  accroche: string;
  mission: string;
  ouSeFormer: LieuFormation[];
  evolution: EtapeCarriere[];
}

interface CarrieresData {
  metiers: CarriereMetier[];
}

const dataset = data as unknown as CarrieresData;

// ---------- Accès ----------
export const getCarrieres = (): CarriereMetier[] => dataset.metiers;

export const getCarriereById = (id: string): CarriereMetier | undefined =>
  dataset.metiers.find((m) => m.id === id);
