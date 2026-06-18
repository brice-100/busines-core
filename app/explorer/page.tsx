"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { explorerItems } from "@/lib/explorer-data";

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

export default function ExplorerPage() {
  const [activeTab, setActiveTab] = useState<string>("Tous");

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
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === tab.id
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
              <Link href={`/explorer/${item.id}`} key={item.id} className="block group">
                <Card
                  padding="none"
                  className="overflow-hidden border border-gray-200 shadow-sm group-hover:shadow-xl transition-all duration-300 rounded-[2rem] flex flex-col h-full animate-fade-in"
                >
                  <div className="h-48 w-full relative overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                  </div>
                  <div className="p-6 bg-white flex-grow flex flex-col relative z-10">
                    <h3 className="font-display font-bold text-secondary text-lg mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 flex-grow">
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
              </Link>
            );
          })}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-gray-500">Aucun concept trouvé pour cette catégorie.</p>
          </div>
        )}

      </div>
    </div>
  );
}
