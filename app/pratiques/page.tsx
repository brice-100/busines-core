import type { Metadata } from "next";
import { 
  PiggyBank, 
  Calculator, 
  Wallet, 
  ShieldAlert 
} from "lucide-react";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Pratiques",
  description: "Apprenez en pratiquant avec nos outils interactifs.",
};

const pills = ["Tous", "Simulations", "Exercices", "Cas pratiques", "Outils"];

const pratiqueItems = [
  {
    title: "Simulateur d'épargne",
    desc: "Calculez vos intérêts en fonction de vos objectifs.",
    icon: PiggyBank,
  },
  {
    title: "Simulateur de prêt",
    desc: "Estimez vos mensualités et le coût total.",
    icon: Calculator,
  },
  {
    title: "Gérer son budget",
    desc: "Apprenez à mieux gérer vos revenus.",
    icon: Wallet,
  },
  {
    title: "Détecter une arnaque",
    desc: "Testez vos réflexes face aux fraudes.",
    icon: ShieldAlert,
  }
];

export default function PratiquesPage() {
  return (
    <div className="flex flex-col">
      <div className="w-full">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-secondary mb-3">Pratiques</h1>
          <p className="text-gray-500 max-w-2xl text-sm lg:text-base">
            Apprenez en pratiquant avec nos outils interactifs.
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pratiqueItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} padding="lg" className="group border-gray-200 shadow-sm hover:shadow-md hover:border-primary-200 cursor-pointer flex items-center justify-between gap-6 transition-all rounded-[2rem]">
                <div>
                  <h3 className="font-display font-bold text-secondary text-lg mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[280px]">
                    {item.desc}
                  </p>
                </div>
                <div className="h-16 w-16 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </div>
  );
}
