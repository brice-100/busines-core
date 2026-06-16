import type { Formation, Article, Metier, Startup, Exercice, CollegeCourse, LyceeCourse, UniversiteCourse } from "@/types";

// ===================================================
// Import des données JSON mockées
// ===================================================
import formationsData from "@/data/formations.json";
import articlesData from "@/data/articles.json";
import metiersData from "@/data/metiers.json";
import startupsData from "@/data/startups.json";
import exercicesData from "@/data/exercices.json";
import collegeCoursesData from "@/data/college_courses.json";
import lyceCoursesData from "@/data/lycee_courses.json";
import universiteCoursesData from "@/data/universite_courses.json";

// ===================================================
// Formations
// ===================================================
export const getAllFormations = (): Formation[] =>
  formationsData as Formation[];

export const getFormationById = (id: string): Formation | undefined =>
  (formationsData as Formation[]).find((f) => f.id === id);

export const getPopularFormations = (): Formation[] =>
  (formationsData as Formation[]).filter((f) => f.popular);

export const getFormationsByCategorie = (categorie: string): Formation[] =>
  (formationsData as Formation[]).filter(
    (f) => f.categorie.toLowerCase() === categorie.toLowerCase()
  );

// ===================================================
// Articles / Décryptages
// ===================================================
export const getAllArticles = (): Article[] => articlesData as Article[];

export const getArticleById = (id: string): Article | undefined =>
  (articlesData as Article[]).find((a) => a.id === id);

export const getFeaturedArticles = (): Article[] =>
  (articlesData as Article[]).filter((a) => a.featured);

export const getArticlesByCategorie = (categorie: string): Article[] =>
  (articlesData as Article[]).filter(
    (a) => a.categorie.toLowerCase() === categorie.toLowerCase()
  );

// ===================================================
// Métiers / Carrières
// ===================================================
export const getAllMetiers = (): Metier[] => metiersData as Metier[];

export const getMetierById = (id: string): Metier | undefined =>
  (metiersData as Metier[]).find((m) => m.id === id);

export const getMetiersBySecteur = (secteur: string): Metier[] =>
  (metiersData as Metier[]).filter(
    (m) => m.secteur.toLowerCase() === secteur.toLowerCase()
  );

// ===================================================
// Startups / Innovation
// ===================================================
export const getAllStartups = (): Startup[] => startupsData as Startup[];

export const getStartupById = (id: string): Startup | undefined =>
  (startupsData as Startup[]).find((s) => s.id === id);

export const getStartupsByPays = (pays: string): Startup[] =>
  (startupsData as Startup[]).filter((s) =>
    s.pays.toLowerCase().includes(pays.toLowerCase())
  );

// ===================================================
// Exercices / Pratiques
// ===================================================
export const getAllExercices = (): Exercice[] => exercicesData as unknown as Exercice[];

export const getExerciceById = (id: string): Exercice | undefined =>
  (exercicesData as unknown as Exercice[]).find((e) => e.id === id);

export const getExercicesByDifficulte = (
  difficulte: "Facile" | "Moyen" | "Difficile"
): Exercice[] =>
  (exercicesData as unknown as Exercice[]).filter(
    (e) => e.difficulte === difficulte
  );

// ===================================================
// Juniors / Collège
// ===================================================
export const getAllCollegeCourses = (): CollegeCourse[] =>
  collegeCoursesData as CollegeCourse[];

export const getCollegeCourseById = (id: string): CollegeCourse | undefined =>
  (collegeCoursesData as CollegeCourse[]).find((c) => c.id === id);

export const getCollegeCoursesByCategorie = (categorie: string): CollegeCourse[] =>
  (collegeCoursesData as CollegeCourse[]).filter(
    (c) => c.categorie.toLowerCase() === categorie.toLowerCase()
  );

// ===================================================
// Juniors / Lycée
// ===================================================
export const getAllLyceeCourses = (): LyceeCourse[] =>
  lyceCoursesData as LyceeCourse[];

export const getLyceeCourseById = (id: string): LyceeCourse | undefined =>
  (lyceCoursesData as LyceeCourse[]).find((c) => c.id === id);

export const getLyceeCoursesByCategorie = (categorie: string): LyceeCourse[] =>
  (lyceCoursesData as LyceeCourse[]).filter(
    (c) => c.categorie.toLowerCase() === categorie.toLowerCase()
  );

// ===================================================
// Juniors / Université
// ===================================================
export const getAllUniversiteCourses = (): UniversiteCourse[] =>
  universiteCoursesData as UniversiteCourse[];

export const getUniversiteCourseById = (id: string): UniversiteCourse | undefined =>
  (universiteCoursesData as UniversiteCourse[]).find((c) => c.id === id);

export const getUniversiteCoursesByCategorie = (categorie: string): UniversiteCourse[] =>
  (universiteCoursesData as UniversiteCourse[]).filter(
    (c) => c.categorie.toLowerCase() === categorie.toLowerCase()
  );

// ===================================================
// Utilitaires génériques
// ===================================================
/** Formate une date ISO en date lisible */
export const formatDate = (iso: string): string => {
  return new Date(iso).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/** Retourne les initiales d'un nom complet */
export const getInitials = (nom: string, prenom: string): string => {
  return `${prenom[0] ?? ""}${nom[0] ?? ""}`.toUpperCase();
};

/** Tronque un texte à N caractères */
export const truncate = (text: string, maxLength = 120): string =>
  text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
