// ===================================================
// Images des métiers — source unique partagée
// ===================================================
// Une image DIFFÉRENTE par métier, indexée par l'identifiant global
// du métier (ex. "f1-metier-a"). Cet identifiant est IDENTIQUE dans les
// univers Formations et Carrières — utiliser l'id (et non le slug, qui
// diffère parfois entre les deux univers) garantit que le même métier
// porte la même image dans les deux sections.
//
// Utilisé par :
//   - components/modules/formations/MetierCard.tsx
//   - components/modules/carrieres/CarriereCard.tsx

export const METIER_IMAGES: Record<string, string> = {
  // Filière 1 — Finance d'Entreprise, Audit et Comptabilité
  "f1-metier-a": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80", // Contrôleur de gestion / Trésorier
  "f1-metier-b": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80", // Auditeur financier
  "f1-metier-c": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80", // Directeur Administratif et Financier (DAF)
  "f1-metier-d": "https://images.unsplash.com/photo-1450101499163-c8848c66cb85?w=600&q=80", // Expert-Comptable
  "f1-metier-e": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80", // Comptable (BTS CGE vers Master CCA)

  // Filière 2 — Finance de Marché, Risque et Actuariat
  "f2-metier-a": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80", // Opérateur de marché (Trader)
  "f2-metier-b": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", // Analyste financier
  "f2-metier-c": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80", // Gestionnaire de portefeuille / Fund Manager
  "f2-metier-d": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80", // Ingénieur financier
  "f2-metier-e": "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600&q=80", // Cadre de banque

  // Filière 3 — Banque, Microfinance et Services Financiers
  "f3-metier-a": "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80", // Gestionnaire de Clientèle Entreprises
  "f3-metier-b": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", // Analyste de crédit
  "f3-metier-c": "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=600&q=80", // Chef d'agence de microfinance
  "f3-metier-d": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&q=80", // Compliance Officer
  "f3-metier-e": "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&q=80", // Ingénieur Statisticien Économiste (ISE)

  // Filière 4 — Assurance et Gestion des Risques
  "f4-metier-a": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80", // Actuaire
  "f4-metier-b": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", // Souscripteur (Underwriter)
  "f4-metier-c": "https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=600&q=80", // Gestionnaire de sinistres
  "f4-metier-d": "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600&q=80", // Courtier / Agent général d'assurance
  "f4-metier-e": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80", // Cadre technique d'assurance (MPA)
};

/** Image de repli si l'identifiant n'est pas répertorié. */
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80";

/**
 * Renvoie l'image associée à un métier à partir de son identifiant global
 * (ex. "f1-metier-a"). Le même id donne la même image dans Formations
 * et Carrières.
 */
export const getMetierImage = (id: string): string =>
  METIER_IMAGES[id] ?? FALLBACK_IMAGE;
