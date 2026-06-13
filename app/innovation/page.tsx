import type { Metadata } from "next";
import { 
  Building2, 
  Cpu, 
  Network, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  LineChart,
  ShieldCheck,
  Lightbulb
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Innovation",
  description: "Découvrez les startups et innovations qui façonnent l'avenir.",
};

const pills = ["Startups", "Technologies", "Tendances", "IA & Finance"];

const innovationArticles = [
  {
    title: "Top 5 startups fintech au Cameroun",
    desc: "Découvrez les startups qui innovent dans les services financiers, du paiement mobile au micro-crédit.",
    icon: Building2,
    gradient: "from-green-500 to-green-400",
    category: "Startups"
  },
  {
    title: "L'IA au service de la finance",
    desc: "Comment l'intelligence artificielle transforme le secteur financier, la détection de fraude et l'analyse de risque.",
    icon: Cpu,
    gradient: "from-blue-600 to-blue-500",
    category: "IA & Finance"
  },
  {
    title: "La blockchain et la finance",
    desc: "Comprendre les usages concrets de la blockchain dans la finance traditionnelle et les transferts transfrontaliers.",
    icon: Network,
    gradient: "from-purple-600 to-purple-500",
    category: "Technologies"
  },
  {
    title: "La finance intégrée (Embedded Finance)",
    desc: "Comment les entreprises non financières intègrent des services bancaires dans leur parcours client.",
    icon: LineChart,
    gradient: "from-orange-500 to-orange-400",
    category: "Tendances"
  },
  {
    title: "RegTech : La conformité réinventée",
    desc: "L'utilisation de la technologie pour répondre aux exigences réglementaires de plus en plus complexes.",
    icon: ShieldCheck,
    gradient: "from-teal-500 to-teal-400",
    category: "Technologies"
  }
];

const featuredStartups = [
  { name: "YooMee", icon: "Y", color: "bg-gray-800 text-yellow-400", desc: "Fournisseur d'accès et services financiers" },
  { name: "Kudi", icon: "K", color: "bg-blue-100 text-blue-600", desc: "Paiements digitaux pour l'Afrique" },
  { name: "BitSika", icon: "B", color: "bg-blue-500 text-white", desc: "Transferts d'argent via blockchain" },
  { name: "EasyPay", icon: "E", color: "bg-red-500 text-white", desc: "Agrégateur de paiements locaux" }
];

export default function InnovationPage() {
  return (
    <div className="flex flex-col w-full">
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

        {/* Layout 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Articles */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {innovationArticles.map((article) => {
              const Icon = article.icon;
              return (
                <Card key={article.title} padding="none" className="group border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 cursor-pointer overflow-hidden transition-all rounded-[1.5rem]">
                  <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className={`h-24 w-24 rounded-2xl bg-gradient-to-br ${article.gradient} flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-105 group-hover:rotate-3 transition-transform duration-500`}>
                      <Icon className="h-10 w-10 text-white drop-shadow-md" />
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
                  <div key={startup.name} className="flex items-start gap-4 cursor-pointer group">
                    <div className={`h-12 w-12 rounded-xl ${startup.color} flex items-center justify-center font-display font-bold text-lg shadow-sm group-hover:scale-110 transition-transform`}>
                      {startup.icon}
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
    </div>
  );
}

function LightbulbIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Lightbulb {...props} />;
}
