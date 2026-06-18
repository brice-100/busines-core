// ===================================================
// Images des métiers — source unique de vérité
// Utilisé par MetierCard, CarriereCard et les pages
// de détail des deux modules.
// ===================================================

const METIER_IMAGES: Record<string, string> = {
  "controleur-de-gestion-tresorier-d-entreprise":
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  "auditeur-financier":
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80",
  "directeur-administratif-et-financier-daf":
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
  "expert-comptable":
    "https://images.unsplash.com/photo-1450101499163-c8848c66cb85?w=600&q=80",
  "bts-cge-vers-master-cca":
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
  "comptable-bts-cge-vers-master-cca":
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
  "analyste-financier":
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
  "charge-de-clientele-banque":
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  "gestionnaire-de-patrimoine":
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  "actuaire":
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80",
  "statisticien-economiste":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80";

/**
 * Retourne l'URL d'image associée au slug d'un métier.
 * Utilisée dans MetierCard, CarriereCard et les pages de détail.
 */
export function getMetierImage(slug: string): string {
  return METIER_IMAGES[slug] ?? FALLBACK_IMAGE;
}
