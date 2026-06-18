"use client";

import { useState } from "react";
import { 
  Sparkles,
  Lightbulb,
  Info
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";

const tabsData = [
  {
    id: "Startups",
    label: "Startups",
    description: "Explorez l'écosystème bouillonnant des jeunes pousses qui bousculent les codes établis de la finance traditionnelle avec des solutions agiles et centrées sur l'utilisateur."
  },
  {
    id: "Technologies",
    label: "Technologies",
    description: "Découvrez les socles technologiques (Blockchain, Cloud, API) qui permettent de construire les infrastructures financières sécurisées et scalables de demain."
  },
  {
    id: "Tendances",
    label: "Tendances",
    description: "Restez à la pointe en comprenant les mouvements de fond qui transforment le secteur : finance intégrée, finance décentralisée, et nouvelles attentes des consommateurs."
  },
  {
    id: "IA & Finance",
    label: "IA & Finance",
    description: "L'intelligence artificielle n'est plus une promesse mais une réalité opérationnelle. Découvrez ses applications concrètes en détection de fraude, trading algorithmique et service client."
  }
];

type InnovationArticle = {
  title: string;
  desc: string;
  image: string;
  category: string;
  details: {
    overview: string;
    keyPoints: string[];
    impact: string;
  };
};

const innovationArticles: InnovationArticle[] = [
  {
    title: "Top 5 startups fintech au Cameroun",
    desc: "Découvrez les startups qui innovent dans les services financiers, du paiement mobile au micro-crédit.",
    image: "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?q=80&w=800&auto=format&fit=crop",
    category: "Startups",
    details: {
      overview: "L'écosystème Fintech camerounais est en pleine effervescence. Des startups locales développent des solutions adaptées aux réalités du marché africain, se concentrant sur l'inclusion financière.",
      keyPoints: [
        "Forte croissance des agrégateurs de paiement mobile.",
        "Émergence de plateformes de micro-crédit basées sur l'analyse de données alternatives.",
        "Développement de solutions B2B pour numériser la gestion des PME locales."
      ],
      impact: "Ces startups réduisent drastiquement la friction dans les transactions quotidiennes et facilitent l'accès au crédit pour les populations historiquement non bancarisées."
    }
  },
  {
    title: "L'IA au service de la finance",
    desc: "Comment l'intelligence artificielle transforme le secteur financier, la détection de fraude et l'analyse de risque.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    category: "IA & Finance",
    details: {
      overview: "L'intelligence artificielle (Machine Learning, Deep Learning) permet d'analyser des volumes massifs de données financières en temps réel pour en extraire des modèles prédictifs.",
      keyPoints: [
        "Détection de fraude ultra-rapide par l'analyse comportementale des transactions.",
        "Scoring de crédit plus précis incluant des données non traditionnelles.",
        "Automatisation du service client via des assistants virtuels intelligents (chatbots)."
      ],
      impact: "Elle permet aux institutions financières de réduire considérablement leurs pertes liées à la fraude tout en offrant une expérience utilisateur hyper-personnalisée."
    }
  },
  {
    title: "La blockchain et la finance",
    desc: "Comprendre les usages concrets de la blockchain dans la finance traditionnelle et les transferts transfrontaliers.",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=800&auto=format&fit=crop",
    category: "Technologies",
    details: {
      overview: "La technologie blockchain offre une infrastructure sécurisée, transparente et immuable. Les banques traditionnelles commencent à l'adopter pour optimiser leurs processus internes lourds.",
      keyPoints: [
        "Exécution quasi-instantanée des paiements transfrontaliers (vs plusieurs jours avec SWIFT).",
        "Tokenisation des actifs réels (immobilier, œuvres d'art) pour les rendre liquides.",
        "Smart contracts automatisant le règlement de transactions complexes (Trade Finance)."
      ],
      impact: "La blockchain a le potentiel de désintermédier des fonctions entières de la banque d'investissement et de réduire drastiquement les coûts de back-office."
    }
  },
  {
    title: "La finance intégrée (Embedded Finance)",
    desc: "Comment les entreprises non financières intègrent des services bancaires dans leur parcours client.",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800&auto=format&fit=crop",
    category: "Tendances",
    details: {
      overview: "La finance intégrée permet à n'importe quelle entreprise (e-commerce, mobilité, logiciel SaaS) de proposer des services financiers (paiement, crédit, assurance) directement dans son interface.",
      keyPoints: [
        "Exemple classique : payer son trajet Uber sans sortir sa carte de crédit.",
        "L'essor du 'Buy Now, Pay Later' (BNPL) directement sur les sites e-commerce.",
        "Possible grâce à la technologie 'Banking-as-a-Service' (BaaS) qui expose les fonctions bancaires via API."
      ],
      impact: "Elle transforme chaque entreprise technologique en une entreprise potentiellement financière, créant de nouvelles sources de revenus et améliorant la rétention client."
    }
  },
  {
    title: "RegTech : La conformité réinventée",
    desc: "L'utilisation de la technologie pour répondre aux exigences réglementaires de plus en plus complexes.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
    category: "Technologies",
    details: {
      overview: "La 'Regulatory Technology' aide les institutions financières à gérer l'avalanche de nouvelles réglementations (RGPD, DSP2, lutte anti-blanchiment) de manière agile et économique.",
      keyPoints: [
        "Automatisation des procédures KYC (Know Your Customer) avec la vérification d'identité biométrique.",
        "Surveillance continue et automatisée des transactions suspectes.",
        "Mise à jour en temps réel des règles de conformité en fonction de la législation."
      ],
      impact: "La RegTech transforme un centre de coût majeur (la conformité) en un avantage compétitif grâce à l'automatisation, évitant ainsi de lourdes amendes aux banques."
    }
  }
];

const featuredStartups = [
  { 
    name: "YooMee Mobile Money", 
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop", 
    color: "bg-gray-800 text-yellow-400", 
    desc: "Mobile Money & FAI au Cameroun",
    details: {
      overview: "YooMee Mobile est un opérateur de réseau mobile virtuel (MVNO) au Cameroun. Historiquement fournisseur d'accès internet, l'entreprise s'est associée à UBA pour lancer son service 'All-In-One', intégrant paiements mobiles et services télécoms.",
      keyPoints: ["Application tout-en-un pour télécoms et finance", "Paiements marchands par QR Code", "Forte emphase sur la sécurité biométrique"],
      impact: "Offre une alternative technologique forte aux opérateurs historiques sur le marché camerounais."
    }
  },
  { 
    name: "Kudi (Nomba)", 
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop", 
    color: "bg-blue-100 text-blue-600", 
    desc: "Agency banking au Nigeria",
    details: {
      overview: "Kudi (récemment rebaptisée Nomba) est une fintech nigériane fondée en 2017. Elle s'est spécialisée dans l'agency banking, permettant à des milliers d'agents d'offrir des services bancaires de base aux populations non bancarisées.",
      keyPoints: ["Réseau massif d'agents de proximité", "Terminaux de paiement (TPE) pour les commerçants", "Services de transfert, retrait et paiement de factures"],
      impact: "Un acteur majeur de l'inclusion financière au Nigeria en digitalisant l'économie informelle."
    }
  },
  { 
    name: "BitSika", 
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop", 
    color: "bg-blue-500 text-white", 
    desc: "Transferts d'argent via blockchain",
    details: {
      overview: "Fondée par Atsu Davoh, BitSika est une application ghanéenne qui utilise la blockchain pour faciliter les transferts d'argent instantanés et à très bas coût entre plusieurs pays africains (Ghana, Nigeria, Cameroun, etc.).",
      keyPoints: ["Transferts transfrontaliers sans friction", "Utilise la blockchain de manière invisible pour l'utilisateur", "Création de cartes virtuelles pour les achats en ligne"],
      impact: "Résout le problème coûteux des transferts d'argent intra-africains grâce à la technologie crypto."
    }
  },
  { 
    name: "EasyPay", 
    image: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=800&auto=format&fit=crop", 
    color: "bg-red-500 text-white", 
    desc: "Agrégateur de paiements locaux",
    details: {
      overview: "EasyPay est un portefeuille électronique complet qui agrège de multiples moyens de paiement locaux (Mobile Money, cartes bancaires) pour faciliter les transactions du quotidien.",
      keyPoints: ["Paiement de factures et services publics", "Achat de crédit téléphonique multi-opérateurs", "Transferts d'argent P2P rapides"],
      impact: "Simplifie la vie quotidienne des utilisateurs en centralisant tous leurs besoins de paiement dans une seule interface."
    }
  }
];

export default function InnovationPage() {
  const [activeTab, setActiveTab] = useState<string>("Startups");
  const [selectedItem, setSelectedItem] = useState<InnovationArticle | null>(null);

  const filteredItems = innovationArticles.filter(item => item.category === activeTab);
  const activeTabData = tabsData.find(t => t.id === activeTab);

  return (
    <div className="flex flex-col w-full pb-10">
      <div className="w-full flex flex-col">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-2xl bg-accent-orange-50 text-accent-orange flex items-center justify-center shadow-inner">
              <LightbulbIcon className="h-6 w-6" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-secondary">Innovation</h1>
          </div>
          <p className="text-gray-500 max-w-2xl text-sm lg:text-base">
            Découvrez les startups et innovations technologiques qui façonnent l'avenir des services financiers.
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
        <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 mb-10 transition-all duration-300 animate-fade-in">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-accent-orange flex-shrink-0 mt-0.5" />
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

        {/* Layout 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Articles */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {filteredItems.map((article) => {
              return (
                <Card 
                  key={article.title} 
                  padding="none" 
                  onClick={() => setSelectedItem(article)}
                  className="group border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 cursor-pointer overflow-hidden transition-all rounded-[1.5rem] animate-fade-in"
                >
                  <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="h-24 w-32 relative rounded-2xl overflow-hidden flex-shrink-0 shadow-inner group-hover:scale-105 group-hover:rotate-1 transition-transform duration-500">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">{article.category}</span>
                      <h3 className="font-display font-bold text-secondary text-xl mb-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {article.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
            
            {filteredItems.length === 0 && (
              <div className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-gray-500">Aucun article trouvé pour cette catégorie.</p>
              </div>
            )}
          </div>

          {/* Right Column - Featured Startups */}
          <div className="lg:col-span-1">
            <Card padding="lg" className="border-gray-200 shadow-sm sticky top-6 bg-white/80 backdrop-blur-md rounded-[1.5rem]">
              <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
                <Sparkles className="h-6 w-6 text-accent-orange" />
                <h3 className="font-display font-bold text-secondary text-xl">Startups en vedette</h3>
              </div>

              <div className="flex flex-col gap-6">
                {featuredStartups.map((startup) => (
                  <div 
                    key={startup.name} 
                    className="flex items-start gap-4 cursor-pointer group"
                    onClick={() => {
                      setSelectedItem({
                        title: startup.name,
                        desc: startup.desc,
                        image: startup.image,
                        category: "Startups en vedette",
                        details: startup.details
                      });
                    }}
                  >
                    <div className={`h-12 w-12 rounded-xl flex-shrink-0 relative overflow-hidden shadow-sm group-hover:scale-110 transition-transform`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={startup.image} alt={startup.name} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary text-base group-hover:text-primary transition-colors">
                        {startup.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{startup.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="#" className="inline-flex items-center justify-center w-full py-3 mt-8 bg-gray-50 hover:bg-gray-100 text-primary text-sm font-semibold rounded-xl border border-gray-200 transition-colors">
                Voir toutes les startups
              </Link>
            </Card>
          </div>

        </div>
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
            <div className="w-full h-48 rounded-2xl relative overflow-hidden mb-4 shadow-sm">
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
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-orange mt-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
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

function LightbulbIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Lightbulb {...props} />;
}
