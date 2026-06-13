// ===================================================
// Business Core — Types TypeScript partagés
// Ne pas modifier sans accord de l'équipe
// ===================================================

// --- Utilisateur & Auth ---
export type UserRole = "visiteur" | "utilisateur" | "administrateur";

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  password: string; // stocké en clair (simulation uniquement)
  role: UserRole;
  createdAt: string;
  avatar?: string;
}

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// --- Formations ---
export interface Formation {
  id: string;
  titre: string;
  description: string;
  categorie: string;
  niveau: "Débutant" | "Intermédiaire" | "Avancé";
  duree: string; // ex: "4h30"
  modules: number;
  image?: string;
  tags: string[];
  auteur: string;
  publishedAt: string;
  popular?: boolean;
}

// --- Articles / Décryptages ---
export interface Article {
  id: string;
  titre: string;
  resume: string;
  contenu: string;
  categorie: string;
  tags: string[];
  auteur: string;
  publishedAt: string;
  image?: string;
  readTime: number; // minutes
  featured?: boolean;
}

// --- Métiers / Carrières ---
export interface Metier {
  id: string;
  intitule: string;
  secteur: string;
  description: string;
  competences: string[];
  salaireMoyen: string;
  perspectives: string;
  formation: string[];
  image?: string;
}

// --- Startups / Innovation ---
export interface Startup {
  id: string;
  nom: string;
  secteur: string;
  description: string;
  fondateurs: string[];
  annee: number;
  pays: string;
  levee?: string;
  tags: string[];
  site?: string;
  logo?: string;
}

// --- Exercices / Pratiques ---
export interface Exercice {
  id: string;
  titre: string;
  description: string;
  categorie: string;
  difficulte: "Facile" | "Moyen" | "Difficile";
  duree: string;
  questions: Question[];
  tags: string[];
}

export interface Question {
  id: string;
  enonce: string;
  type: "qcm" | "vrai-faux" | "texte";
  options?: string[];
  reponseCorrecte: string | number;
  explication: string;
}

// --- Module générique pour la navigation ---
export interface NavModule {
  href: string;
  label: string;
  icon: string;
  description?: string;
  color?: string;
}
