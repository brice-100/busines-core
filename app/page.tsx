import type { Metadata } from "next";
import {
  BookOpen,
  FileText,
  Dumbbell,
  Users,
  Briefcase,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Clock,
  TrendingUp,
  Compass,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getFeaturedArticles, formatDate } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "BusinessCore — Votre plateforme fintech & finance",
  description:
    "Formations, décryptages, exercices pratiques et opportunités de carrière dans la fintech et la finance. Rejoignez la communauté BusinessCore.",
};

// Accès rapide — 6 modules.
// Chaque module porte la couleur définie dans globals.css (palette BusinessCore) :
// l'icône, la bordure au survol et le titre au survol partagent la même teinte.
const quickAccess = [
  {
    href: "/explorer",
    label: "Explorer",
    description: "Découvrez la fintech, la monnaie et bien plus.",
    icon: Compass,
    accent: "bg-blue-50 text-blue-600 border border-blue-100/60 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300",
    hoverBorder: "hover:border-blue-300",
    hoverTitle: "group-hover:text-blue-600",
    badge: "primary" as const,
  },
  {
    href: "/formations",
    label: "Formations",
    description: "Trouvez votre cursus, les établissements et diplômes.",
    icon: BookOpen,
    accent: "bg-indigo-50 text-indigo-600 border border-indigo-100/40 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300",
    badge: "violet" as const,
  },
  {
    href: "/decryptages",
    label: "Décryptages",
    description: "Analysez l'actualité financière et les tendances.",
    icon: TrendingUp,
    accent: "bg-orange-50 text-orange-500 border border-orange-100/40 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300",
    badge: "orange" as const,
  },
  {
    href: "/juniors",
    label: "Juniors",
    description: "Parcours adaptés aux niveaux scolaires.",
    icon: Users,
    accent: "bg-pink-50 text-pink-500 border border-pink-100/40 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300",
    badge: "rose" as const,
  },
  {
    href: "/carrieres",
    label: "Carrières",
    description: "Découvrez les métiers et opportunités.",
    icon: Briefcase,
    accent: "bg-blue-50 text-blue-600 border border-blue-100/40 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300",
    badge: "primary" as const,
  },
];

export default function HomePage() {
  const featuredArticles = getFeaturedArticles();

  return (
    <div className="flex flex-col w-full bg-white px-6 md:px-12 lg:px-20">
      {/* =============================================
          SECTION HERO
          ============================================= */}
      <section className="relative flex flex-col md:flex-row items-center justify-between pt-8 pb-12 md:pb-20">
        
        <div className="relative z-10 w-full md:w-[45%] pr-4 md:pr-8 animate-fade-in mb-12 md:mb-0">
          <h1 className="text-[2.5rem] md:text-5xl lg:text-[3.5rem] font-bold text-[#1e293b] leading-[1.1] mb-6 tracking-tight">
            Comprendre, Apprendre,<br/>
            Décrypter <span className="text-[#2563eb]">la Finance.</span>
          </h1>

          <p className="text-slate-500 text-[15px] md:text-base mb-8 leading-relaxed max-w-md font-medium">
            Business Core vous accompagne dans la découverte de la fintech,
            des formations et des opportunités.
          </p>

          <div className="flex flex-wrap gap-10 items-center">
            <Button
              href="/explorer"
              variant="primary"
              className="bg-[#2563eb] hover:bg-blue-700 text-white rounded-full px-7 py-6 shadow-sm font-semibold text-sm h-12"
            >
              Explorer la plateforme <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              href="/decryptages"
              variant="outline"
              className="rounded-full px-7 py-6 border-[#e2e8f0] text-[#2563eb] bg-white hover:bg-slate-50 font-semibold text-sm h-12"
            >
              Découvrir la Fintech
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full md:w-[55%] flex justify-end animate-slide-in-right">
          <div className="relative w-full max-w-[650px] aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-3xl">
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
          ACCÈS RAPIDE — 6 cartes
          ============================================= */}
      <section className="pb-16 pt-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-[#1e293b]">Accès rapide</h2>
          <Button variant="ghost" size="sm" className="rounded-full border border-slate-200 h-9 w-9 p-0 flex items-center justify-center bg-white hover:bg-slate-50">
            <ArrowRight className="h-4 w-4 text-[#2563eb]" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {quickAccess.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Card
                  padding="sm"
                  className="h-full group transition-all duration-300 border border-slate-100 shadow-sm hover:border-[#2563eb]/30 hover:shadow-md rounded-2xl bg-white flex flex-row lg:flex-col items-center lg:items-start p-4 lg:p-5"
                >
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center mb-0 lg:mb-4 mr-4 lg:mr-0 flex-shrink-0 ${item.accent}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <h3 className="font-bold text-[#1e293b] text-sm mb-1 group-hover:text-[#2563eb] transition-colors">{item.label}</h3>
                    <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">{item.description}</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =============================================
          À LA UNE & NOS UNIVERS & ADJA
          ============================================= */}
      <section className="pb-20 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* À la une */}
        <div className="lg:col-span-4 flex flex-col">
          <h2 className="text-lg font-bold text-[#1e293b] mb-4">À la une</h2>
          {featuredArticles.slice(0, 1).map((article) => (
            <Link key={article.id} href={`/decryptages`} className="flex-1 flex">
              <Card padding="none" className="overflow-hidden shadow-sm border border-slate-100 group rounded-2xl bg-white flex flex-row lg:flex-row w-full h-full">
                <div className="relative w-2/5 md:w-1/3 lg:w-2/5 overflow-hidden flex items-center justify-center flex-shrink-0 p-3">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image 
                      src="/images/hero.png" 
                      alt="Article Image" 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="p-4 pl-1 flex flex-col flex-1 justify-center space-y-2">
                  <span className="text-[10px] text-[#2563eb] font-semibold tracking-wide uppercase">Tendance</span>
                  <h3 className="font-bold text-[#1e293b] text-sm leading-snug group-hover:text-[#2563eb] transition-colors line-clamp-2">
                    La Fintech transforme l'Afrique
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                    De la monnaie mobile aux paiements numériques, découvrez les innovations qui changent notre quotidien.
                  </p>
                  <span className="text-[#2563eb] text-[11px] font-semibold flex items-center gap-1 group-hover:gap-1.5 transition-all mt-1">
                    Lire l'article <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Nos univers */}
        <div className="lg:col-span-4 flex flex-col">
          <h2 className="text-lg font-bold text-[#1e293b] mb-4">Nos univers</h2>
          <div className="grid grid-cols-2 gap-3 flex-1">
            {[
              { value: "+120", label: "Formations" },
              { value: "35", label: "Établissements" },
              { value: "60+", label: "Métiers" },
              { value: "200+", label: "Articles & Ressources" },
            ].map((stat, i) => (
              <Card key={i} padding="sm" className="border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center bg-white rounded-2xl p-4 hover:shadow-md transition-shadow">
                <p className="text-2xl font-bold text-[#2563eb] mb-1">{stat.value}</p>
                <p className="text-[10px] text-slate-500 font-medium">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Adja Assistant */}
        <div className="lg:col-span-4 flex flex-col">
          <Card padding="none" className="overflow-hidden bg-gradient-to-br from-[#E6F0FE] to-[#F1F5FF] border-none shadow-sm relative w-full rounded-2xl flex items-center h-full min-h-[180px]">
            <div className="p-6 relative z-10 w-2/3 flex flex-col justify-center min-w-0">
              <h3 className="font-bold text-[#1e293b] text-[15px] mb-2">Adja, votre assistant</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3 mb-4">
                Posez vos questions sur la finance et obtenez des réponses claires et simples.
              </p>
              <Link href="/adja" className="inline-flex items-center justify-center bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg font-semibold px-4 py-2 text-[11px] transition-colors self-start shadow-sm">
                Discuter avec Adja
              </Link>
            </div>
            
            {/* Adja Image */}
            <div className="absolute right-0 bottom-0 top-0 w-[45%] overflow-hidden rounded-r-2xl">
              {/* Cercle décoratif */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-[1.5px] border-blue-200/50 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-[1.5px] border-blue-200/50 rounded-full" />
              
              <Image
                src="/images/adja.png"
                alt="Adja Assistant"
                fill
                className="object-cover object-top relative z-10"
              />
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
