import type { Metadata } from "next";
import { 
  GraduationCap, 
  BookOpen, 
  PiggyBank 
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Juniors",
  description: "Des parcours adaptés à chaque niveau scolaire.",
};

const pills = ["Collège", "Lycée", "Université"];

const parcoursItems = [
  {
    title: "Collège",
    desc: "Découvrir les bases de l'argent et de la finance. Revenu...",
    icon: PiggyBank,
    color: "text-blue-500",
    bg: "bg-blue-50 border-blue-100",
    hoverBorder: "hover:border-blue-300",
    iconBg: "bg-white",
    href: "/juniors/college",
  },
  {
    title: "Lycée",
    desc: "Comprendre l'économie et la gestion.",
    icon: BookOpen,
    color: "text-orange-500",
    bg: "bg-orange-50 border-orange-100",
    hoverBorder: "hover:border-orange-300",
    iconBg: "bg-white",
    href: "/juniors/lycee",
  },
  {
    title: "Université",
    desc: "Approfondir ses connaissances en finance.",
    icon: GraduationCap,
    color: "text-green-500",
    bg: "bg-green-50 border-green-100",
    hoverBorder: "hover:border-green-300",
    iconBg: "bg-white",
      href: "/juniors/universite",
  }
];

export default function JuniorsPage() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full flex flex-col items-center">
        
        {/* Header */}
        <div className="mb-8 w-full text-center">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-secondary mb-3">Juniors</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm lg:text-base">
            Des parcours adaptés à chaque niveau scolaire.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 w-full">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
          {parcoursItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.href}>
                <Card padding="lg" className={`group border-2 ${item.bg} ${item.hoverBorder} shadow-sm hover:shadow-xl flex flex-col h-[380px] cursor-pointer rounded-[2rem] transition-all duration-300 relative overflow-hidden`}>
                  <div className="relative z-10">
                    <h3 className="font-display font-bold text-secondary text-2xl mb-4 text-center">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed text-center">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* Illustration Placeholder - matching the 06_Juniors mockup */}
                  <div className="mt-auto flex justify-center pb-4 relative z-10">
                    <div className={`h-32 w-32 rounded-full ${item.iconBg} shadow-sm flex items-center justify-center transform group-hover:-translate-y-3 group-hover:scale-110 transition-all duration-500`}>
                      <Icon className={`h-16 w-16 ${item.color}`} />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        <Button variant="outline" className="rounded-full px-8 py-3 text-secondary border-gray-300 hover:bg-gray-50 font-semibold shadow-sm">
          Voir tous les parcours
        </Button>

      </div>
    </div>
  );
}
