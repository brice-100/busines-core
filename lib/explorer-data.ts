export type ExplorerItem = {
  id: string;
  title: string;
  desc: string;
  image: string;
  categories: string[];
  details: {
    overview: string;
    keyPoints: string[];
    impact: string;
  };
};

export const explorerItems: ExplorerItem[] = [
  {
    id: "quest-ce-que-la-fintech",
    title: "Qu'est-ce que la Fintech ?",
    desc: "Bases et fondamentaux",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    categories: ["Fintech", "Économie"],
    details: {
      overview: "La Fintech (technologie financière) désigne les entreprises qui utilisent des technologies innovantes pour repenser, améliorer ou automatiser les services financiers traditionnels.",
      keyPoints: [
        "Démocratisation de l'accès aux services financiers.",
        "Utilisation massive de l'Intelligence Artificielle et du Big Data.",
        "Réduction des coûts de transaction et suppression des intermédiaires."
      ],
      impact: "Elle oblige les banques traditionnelles à innover et offre aux consommateurs des solutions plus rapides, moins chères et 100% digitales."
    }
  },
  {
    id: "les-differents-types-de-monnaie",
    title: "Les différents types de monnaie",
    desc: "De l'or aux cryptomonnaies",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop",
    categories: ["Monnaie", "Économie"],
    details: {
      overview: "La monnaie a pris de nombreuses formes au cours de l'histoire. Aujourd'hui, elle se divise en plusieurs catégories principales qui coexistent dans notre économie.",
      keyPoints: [
        "Monnaie fiduciaire : les pièces et les billets émis par une banque centrale.",
        "Monnaie scripturale : les sommes enregistrées sur les comptes bancaires (représente plus de 90% de la monnaie en circulation).",
        "Cryptomonnaies : actifs numériques décentralisés reposant sur la cryptographie."
      ],
      impact: "La dématérialisation croissante de la monnaie accélère les échanges internationaux tout en posant de nouveaux défis en matière de sécurité et de souveraineté."
    }
  },
  {
    id: "la-monnaie-electronique",
    title: "La monnaie électronique",
    desc: "L'évolution des paiements",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
    categories: ["Monnaie", "Paiements"],
    details: {
      overview: "La monnaie électronique est une valeur monétaire stockée sous forme électronique (serveur, carte prépayée, téléphone) représentant une créance sur l'émetteur.",
      keyPoints: [
        "Ne nécessite pas obligatoirement un compte bancaire classique.",
        "Idéale pour les micro-paiements et les achats en ligne.",
        "Strictement encadrée par la directive sur la monnaie électronique (DME) en Europe."
      ],
      impact: "Elle facilite l'inclusion financière des populations non bancarisées et fluidifie le commerce électronique mondial."
    }
  },
  {
    id: "le-mobile-money",
    title: "Le Mobile Money",
    desc: "L'innovation africaine",
    image: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=800&auto=format&fit=crop",
    categories: ["Paiements", "Fintech", "Banque"],
    details: {
      overview: "Le Mobile Money est un service financier accessible via un simple téléphone mobile (souvent par SMS ou USSD), permettant de déposer, transférer et retirer de l'argent.",
      keyPoints: [
        "Pionnier avec M-Pesa au Kenya dès 2007.",
        "Permet de contourner le manque d'infrastructures bancaires physiques.",
        "S'étend aujourd'hui au crédit, à l'épargne et à l'assurance (micro-finance)."
      ],
      impact: "Il a révolutionné l'inclusion financière dans les pays émergents, permettant à des millions de personnes d'entrer dans l'économie formelle."
    }
  },
  {
    id: "la-blockchain-expliquee",
    title: "La Blockchain expliquée",
    desc: "Transparence et sécurité",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=800&auto=format&fit=crop",
    categories: ["Fintech", "Monnaie"],
    details: {
      overview: "La blockchain est une technologie de stockage et de transmission d'informations, transparente, sécurisée, et fonctionnant sans organe central de contrôle. C'est un grand livre de comptes distribué.",
      keyPoints: [
        "Décentralisation : la validation est faite par un réseau de nœuds.",
        "Immutabilité : une fois enregistrée, une transaction ne peut être modifiée ni effacée.",
        "Contrats intelligents (Smart Contracts) : exécution automatique d'accords préprogrammés."
      ],
      impact: "Au-delà des cryptomonnaies, elle promet de sécuriser les chaînes logistiques, la propriété intellectuelle et l'identité numérique."
    }
  },
  {
    id: "la-banque-digitale",
    title: "La banque digitale",
    desc: "Les néobanques de demain",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop",
    categories: ["Banque", "Fintech"],
    details: {
      overview: "Les banques digitales et néobanques sont des établissements financiers proposant leurs services exclusivement via des applications mobiles et des plateformes web, sans agence physique.",
      keyPoints: [
        "Ouverture de compte en quelques minutes depuis un smartphone.",
        "Frais de gestion souvent nuls ou très inférieurs aux banques traditionnelles.",
        "Fonctionnalités avancées : catégorisation des dépenses, cartes virtuelles, paiements à l'étranger sans frais."
      ],
      impact: "Elles redéfinissent l'expérience client et forcent les acteurs historiques à accélérer leur propre transition numérique."
    }
  }
];

export function getExplorerItemById(id: string): ExplorerItem | undefined {
  return explorerItems.find(item => item.id === id);
}
