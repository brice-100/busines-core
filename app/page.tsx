import type { Metadata } from "next";
import {
  Compass,
  BookOpen,
  TrendingUp,
  Users,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getFeaturedArticles } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "BusinessCore — Votre plateforme fintech & finance",
  description:
    "Formations, décryptages, exercices pratiques et opportunités de carrière dans la fintech et la finance. Rejoignez la communauté BusinessCore.",
};

const quickAccess = [
  {
    href: "/explorer",
    label: "Explorer",
    description: "Découvrez la fintech, la monnaie et bien plus.",
    icon: Compass,
    accent: "bg-blue-50 text-blue-600 border border-blue-100/60 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300",
  },
  {
    href: "/formations",
    label: "Formations",
    description: "Trouvez votre cursus, les établissements et diplômes.",
    icon: BookOpen,
    accent: "bg-indigo-50 text-indigo-600 border border-indigo-100/40 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300",
  },
  {
    href: "/decryptages",
    label: "Décryptages",
    description: "Analysez l'actualité financière et les tendances.",
    icon: TrendingUp,
    accent: "bg-orange-50 text-orange-500 border border-orange-100/40 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300",
  },
  {
    href: "/juniors",
    label: "Juniors",
    description: "Parcours adaptés aux niveaux scolaires.",
    icon: Users,
    accent: "bg-pink-50 text-pink-500 border border-pink-100/40 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300",
  },
  {
    href: "/carrieres",
    label: "Carrières",
    description: "Découvrez les métiers et opportunités.",
    icon: Briefcase,
    accent: "bg-blue-50 text-blue-600 border border-blue-100/40 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300",
  },
];

export default function HomePage() {
  const featuredArticles = getFeaturedArticles();

  return (
    <div className="flex flex-col w-full bg-white px-6 md:px-12 lg:px-20 py-10 space-y-20">
      {/* =============================================
          SECTION HERO
          ============================================= */}
      <section className="relative flex flex-col md:flex-row items-center justify-between pt-6 pb-6">
        <div className="relative z-10 w-full md:w-[48%] pr-2 md:pr-6 animate-fade-in mb-12 md:mb-0">
          <h1 className="text-[2.5rem] md:text-5xl lg:text-[3.5rem] font-bold text-[#1e293b] leading-tight mb-8 tracking-tight">
            Comprendre, Apprendre,<br />
            Décrypter <span className="text-[#2563eb]">la Finance.</span>
          </h1>

          <p className="text-slate-600 text-[15px] md:text-base mb-10 leading-relaxed max-w-md font-medium">
            Business Core vous accompagne dans la découverte de la fintech,
            des formations et des opportunités de carrière.
          </p>

          <div className="flex flex-wrap gap-6 items-center">
            {/* BOUTON BLEU : Grâce à tailwind-merge, text-white force le texte et l'icône en blanc pur */}
            <Button
              href="/explorer"
              variant="primary"
              size="lg"
              className="bg-[#2563eb] text-white hover:bg-blue-700 font-semibold shadow-md"
            >
              Explorer la plateforme <ArrowRight className="ml-2 h-4 w-4 text-white" />
            </Button>
            
            <Button
              href="/decryptages"
              variant="outline"
              size="lg"
              className="border border-slate-200 text-[#2563eb] bg-white hover:bg-slate-50 font-semibold shadow-sm"
            >
              Découvrir la Fintech
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full md:w-[50%] flex justify-end animate-slide-in-right">
          <div className="relative w-full max-w-[600px] aspect-[4/3] md:aspect-[16/11] overflow-hidden rounded-3xl shadow-xl shadow-slate-100">
            <Image
              src="/images/hero.png"
              alt="Femme utilisant une tablette"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </section>

      {/* =============================================
          SECTION ACCÈS RAPIDE
          ============================================= */}
      <section className="py-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-[#1e293b]">Accès rapide</h2>
          <Button 
            href="/explorer" 
            variant="ghost" 
            className="rounded-full border border-slate-200 h-9 w-9 p-0 flex items-center justify-center bg-white hover:bg-slate-50"
          >
            <ArrowRight className="h-4 w-4 text-[#2563eb]" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {quickAccess.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex h-full group">
                {/* LA CARTE RESPIRA : p-7 et pb-10 écrasent le padding par défaut sans toucher au reste */}
                <Card
                  padding="none"
                  hover
                  className="flex-1 border border-slate-100 shadow-sm hover:border-[#2563eb]/40 hover:shadow-lg p-7 pb-10 flex flex-col items-start h-full"
                >
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-6 flex-shrink-0 ${item.accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex flex-col min-w-0 w-full flex-1">
                    <h3 className="font-bold text-[#1e293b] text-base mb-2.5 group-hover:text-[#2563eb] transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-4">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =============================================
          À LA UNE & NOS UNIVERS
          ============================================= */}
      <section className="pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* À la une */}
        <div className="lg:col-span-5 flex flex-col">
          <h2 className="text-2xl font-bold text-[#1e293b] mb-6 tracking-tight">À la une</h2>
          {featuredArticles.slice(0, 1).map((article) => (
            <Link key={article.id} href={`/decryptages`} className="flex-1 flex group">
              <Card 
                padding="none" 
                hover 
                className="overflow-hidden shadow-sm border border-slate-100 bg-white flex flex-col w-full h-full hover:border-slate-200"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden flex-shrink-0">
                  <Image
                    src="/images/hero.png"
                    alt="Article Image"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-7 pb-9 flex flex-col flex-1 justify-between space-y-5">
                  <div className="space-y-2.5">
                    <span className="text-[11px] text-[#2563eb] font-bold tracking-wider uppercase">Tendance</span>
                    <h3 className="font-bold text-[#1e293b] text-base leading-snug group-hover:text-[#2563eb] transition-colors line-clamp-2">
                      La Fintech transforme l'Afrique
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      De la monnaie mobile aux paiements numériques, découvrez les innovations qui changent notre quotidien en profondeur.
                    </p>
                  </div>
                  <span className="text-[#2563eb] text-xs font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all pt-3 border-t border-slate-100">
                    Lire l'article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Nos univers */}
        <div className="lg:col-span-7 flex flex-col">
          <h2 className="text-2xl font-bold text-[#1e293b] mb-6 tracking-tight">Nos univers</h2>
          <div className="grid grid-cols-2 gap-4 flex-1">
            {[
              { value: "+120", label: "Formations" },
              { value: "35", label: "Établissements" },
              { value: "60+", label: "Métiers" },
              { value: "200+", label: "Articles & Ressources" },
            ].map((stat, i) => (
              <Card 
                key={i} 
                padding="none" 
                className="border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center bg-white p-8 hover:border-blue-100 hover:shadow-lg transition-all duration-300 w-full h-full"
              >
                <p className="text-3xl font-extrabold text-[#2563eb] mb-2.5">{stat.value}</p>
                <p className="text-xs text-slate-500 font-semibold tracking-wide">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}