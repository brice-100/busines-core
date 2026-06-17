"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";

const tabsData = [
  {
    id: "Tous",
    label: "Tous",
    description: "Explorez notre base de connaissances globale sur les fondements de la finance moderne, des principes de base aux innovations technologiques qui redéfinissent les échanges économiques."
  },
  {
    id: "Fintech",
    label: "Fintech",
    description: "La technologie financière (Fintech) révolutionne les services bancaires et financiers. Découvrez comment l'IA, le Big Data et le cloud rendent la finance plus accessible et efficiente."
  },
  {
    id: "Monnaie",
    label: "Monnaie",
    description: "Instrument d'échange, unité de compte et réserve de valeur : plongez dans l'évolution de la monnaie, de l'or physique aux monnaies virtuelles d'aujourd'hui."
  },
  {
    id: "Paiements",
    label: "Paiements",
    description: "Le secteur des paiements est en pleine mutation. Découvrez les infrastructures qui permettent des transactions instantanées, sécurisées et sans frontières."
  },
  {
    id: "Banque",
    label: "Banque",
    description: "Les institutions bancaires se transforment. Comprenez leur rôle économique crucial et comment elles s'adaptent face à l'essor du tout-numérique."
  },
  {
    id: "Économie",
    label: "Économie",
    description: "Les grands principes macroéconomiques qui régissent la production, la distribution et la consommation des richesses à l'échelle mondiale."
  }
];

type ExplorerItem = {
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

const explorerItems: ExplorerItem[] = [
  {
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

export default function ExplorerPage() {
  const [activeTab, setActiveTab] = useState<string>("Tous");
  const [selectedItem, setSelectedItem] = useState<ExplorerItem | null>(null);

  const filteredItems = activeTab === "Tous" 
    ? explorerItems 
    : explorerItems.filter(item => item.categories.includes(activeTab));

  const activeTabData = tabsData.find(t => t.id === activeTab);

  return (
    <div className="flex flex-col w-full pb-10">
      <div className="w-full">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-secondary mb-3">Explorer</h1>
          <p className="text-gray-500 max-w-2xl text-sm lg:text-base">
            Découvrez les concepts clés de la finance et de la fintech.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {tabsData.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-secondary text-white shadow-lg shadow-secondary/20" 
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Description Context Box */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 mb-10 transition-all duration-300 animate-fade-in">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-secondary mb-1">
                Catégorie : {activeTabData?.label}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {activeTabData?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            return (
              <Card 
                key={item.title} 
                padding="none" 
                onClick={() => setSelectedItem(item)}
                className="overflow-hidden group border border-gray-200 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 rounded-[2rem] flex flex-col animate-fade-in"
              >
                <div className="h-48 w-full relative overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay subtile pour s'assurer que l'image s'intègre bien et n'est pas trop éblouissante */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                </div>
                <div className="p-6 bg-white flex-grow relative z-10">
                  <h3 className="font-display font-bold text-secondary text-lg mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {item.categories.map(cat => (
                      <span key={cat} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-gray-100 text-gray-500 rounded-md">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-gray-500">Aucun concept trouvé pour cette catégorie.</p>
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title}
        size="lg"
      >
        {selectedItem && (
          <div className="space-y-6">
            <div className="w-full h-48 rounded-2xl relative overflow-hidden mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-secondary mb-2">Aperçu</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {selectedItem.details.overview}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-secondary mb-2">Points clés</h3>
              <ul className="space-y-2">
                {selectedItem.details.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <h3 className="text-sm font-semibold text-secondary mb-1">L'impact</h3>
              <p className="text-gray-600 text-sm italic">
                "{selectedItem.details.impact}"
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
