import type { Metadata } from "next";
import { 
  CreditCard, 
  Coins, 
  SmartphoneNfc, 
  Building2, 
  Network, 
  TrendingUp 
} from "lucide-react";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Explorer",
  description: "Découvrez les concepts clés de la finance et de la fintech.",
};

const pills = ["Tous", "Fintech", "Monnaie", "Paiements", "Banque", "Économie"];

const explorerItems = [
  {
    title: "Qu'est-ce que la Fintech ?",
    desc: "Bases et fondamentaux",
    icon: TrendingUp,
    gradient: "from-blue-500 to-blue-400"
  },
  {
    title: "Les différents types de monnaie",
    desc: "De l'or aux cryptomonnaies",
    icon: Coins,
    gradient: "from-indigo-400 to-indigo-300"
  },
  {
    title: "La monnaie électronique",
    desc: "L'évolution des paiements",
    icon: CreditCard,
    gradient: "from-cyan-400 to-cyan-300"
  },
  {
    title: "Le Mobile Money",
    desc: "L'innovation africaine",
    icon: SmartphoneNfc,
    gradient: "from-orange-400 to-orange-300"
  },
  {
    title: "La Blockchain expliquée",
    desc: "Transparence et sécurité",
    icon: Network,
    gradient: "from-purple-500 to-purple-400"
  },
  {
    title: "La banque digitale",
    desc: "Les néobanques de demain",
    icon: Building2,
    gradient: "from-blue-600 to-blue-500"
  }
];

export default function ExplorerPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-secondary mb-3">Explorer</h1>
          <p className="text-gray-500 max-w-2xl text-sm lg:text-base">
            Découvrez les concepts clés de la finance et de la fintech.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {pills.map((pill, i) => (
            <button 
              key={pill}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                i === 0 
                  ? "bg-secondary text-white shadow-lg shadow-secondary/20" 
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {explorerItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} padding="none" className="overflow-hidden group border border-gray-200 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 rounded-[2rem]">
                <div className={`h-48 w-full bg-gradient-to-br ${item.gradient} flex items-center justify-center relative overflow-hidden`}>
                  {/* Glass effect overlays to match the 3D look in mockup */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 w-20 h-20 bg-black/5 rounded-full blur-2xl" />
                  
                  {/* Icon */}
                  <div className="relative z-10 p-5 bg-white/20 rounded-[2rem] backdrop-blur-md shadow-2xl border border-white/40 transform group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-500">
                    <Icon className="h-10 w-10 text-white drop-shadow-md" />
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-display font-bold text-secondary text-lg mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </div>
  );
}
