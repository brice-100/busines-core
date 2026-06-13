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

// Accès rapide — 6 modules
const quickAccess = [
  {
    href: "/explorer",
    label: "Explorer",
    description: "Découvrir la fintech, la monnaie et bien plus.",
    icon: BookOpen,
    accent: "bg-primary text-white border-primary",
    badge: "primary" as const,
  },
  {
    href: "/formations",
    label: "Formations",
    description: "Trouvez votre cursus, les établissements et diplômes.",
    icon: BookOpen,
    accent: "bg-accent-violet-50 text-accent-violet border-accent-violet-100",
    badge: "violet" as const,
  },
  {
    href: "/decryptages",
    label: "Décryptages",
    description: "Analysez l'actualité financière et les tendances.",
    icon: TrendingUp,
    accent: "bg-accent-orange-50 text-accent-orange border-accent-orange-100",
    badge: "orange" as const,
  },
  {
    href: "/pratiques",
    label: "Pratiques",
    description: "Simulez, exercez-vous et développez vos compétences.",
    icon: Dumbbell,
    accent: "bg-accent-green-50 text-accent-green-500 border-accent-green-100",
    badge: "green" as const,
  },
  {
    href: "/juniors",
    label: "Juniors",
    description: "Parcours adaptés aux niveaux scolaires.",
    icon: Users,
    accent: "bg-accent-rose-50 text-accent-rose border-accent-rose-100",
    badge: "rose" as const,
  },
  {
    href: "/carrieres",
    label: "Carrières",
    description: "Découvrez les métiers et opportunités.",
    icon: Briefcase,
    accent: "bg-primary text-white border-primary",
    badge: "primary" as const,
  },
];

export default function HomePage() {
  const featuredArticles = getFeaturedArticles();

  return (
    <div className="flex flex-col">
      {/* =============================================
          SECTION HERO
          ============================================= */}
      <section className="relative overflow-hidden bg-white flex flex-col md:flex-row items-center justify-between pb-12 mb-12 border-b border-gray-100">
        
        <div className="relative z-10 w-full md:w-1/2 md:pr-10 animate-fade-in mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary leading-tight mb-6">
            Comprendre, Apprendre, Décrypter{" "}
            <span className="text-primary">la Finance.</span>
          </h1>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-lg">
            Business Core vous accompagne dans la découverte de la fintech,
            des formations et des opportunités.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              href="/explorer"
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="rounded-full px-8 shadow-lg shadow-primary/30"
            >
              Explorer la plateforme
            </Button>
            <Button
              href="/decryptages"
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-gray-200 text-secondary hover:border-gray-300"
            >
              Découvrir la Fintech
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full md:w-1/2 flex justify-center animate-slide-in-left">
          <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/hero.png"
              alt="Femme utilisant une tablette"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 h-24 w-24 bg-accent-cyan/10 rounded-full blur-xl" />
          <div className="absolute -bottom-6 -left-6 h-32 w-32 bg-primary/10 rounded-full blur-xl" />
        </div>
      </section>

      {/* =============================================
          ACCÈS RAPIDE — 6 cartes
          ============================================= */}
      <section className="pb-12 bg-white">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-bold text-secondary">Accès rapide</h2>
          <Button variant="ghost" size="sm" className="rounded-full border border-gray-200 h-10 w-10 p-0 flex items-center justify-center">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {quickAccess.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Card
                  hover
                  padding="md"
                  className="h-full group transition-all duration-300 border border-gray-100 flex items-center shadow-sm hover:border-gray-300 hover:shadow-md rounded-2xl"
                >
                  <div
                    className={`h-12 w-12 min-w-[3rem] rounded-xl flex items-center justify-center mr-4 ${item.accent}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-secondary text-[15px] mb-0.5">{item.label}</h3>
                    <p className="text-[11px] text-gray-500 leading-snug line-clamp-2">{item.description}</p>
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
      <section className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-gray-100">
        
        {/* À la une */}
        <div className="lg:col-span-4">
          <h2 className="text-xl font-display font-bold text-secondary mb-6">À la une</h2>
          {featuredArticles.slice(0, 1).map((article) => (
            <Link key={article.id} href={`/decryptages`}>
              <Card hover padding="none" className="overflow-hidden shadow-sm border-gray-100 group">
                <div className="relative h-48 w-full bg-secondary flex items-center justify-center overflow-hidden">
                  <Image 
                    src="/images/hero.png" 
                    alt="Article Image" 
                    fill 
                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Mock credit card illustration over image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-20 rounded-xl bg-blue-600/80 backdrop-blur-md shadow-2xl border border-white/20 transform -rotate-12 translate-y-4"></div>
                    <div className="w-32 h-20 rounded-xl bg-primary/90 backdrop-blur-md shadow-2xl border border-white/20 transform rotate-6 -translate-x-4 absolute"></div>
                  </div>
                </div>
                <div className="p-5">
                  <Badge variant="primary" size="sm" className="bg-primary/5 text-primary mb-3">Tendance</Badge>
                  <h3 className="font-bold text-secondary text-base mb-2 group-hover:text-primary transition-colors">
                    La Fintech transforme l'Afrique
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    De la monnaie mobile aux paiements numériques, découvrez les innovations qui changent notre quotidien.
                  </p>
                  <span className="text-primary text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Lire l'article <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Nos univers */}
        <div className="lg:col-span-4">
          <h2 className="text-xl font-display font-bold text-secondary mb-6">Nos univers</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "+120", label: "Formations" },
              { value: "35", label: "Établissements" },
              { value: "60+", label: "Métiers" },
              { value: "200+", label: "Articles & Ressources" },
            ].map((stat, i) => (
              <Card key={i} padding="md" className="border-gray-100 shadow-sm flex flex-col justify-center text-center">
                <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Adja Assistant */}
        <div className="lg:col-span-4">
          <Card padding="none" className="overflow-hidden bg-primary/5 border-primary/10 shadow-sm relative h-full min-h-[300px]">
            <div className="p-6 relative z-10 w-2/3 h-full flex flex-col justify-center">
              <h3 className="font-bold text-secondary text-lg mb-2 leading-snug">Adja, votre assistant</h3>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                Posez vos questions sur la finance et obtenez des réponses claires et simples.
              </p>
              <Button href="/adja" variant="primary" size="sm" className="rounded-full self-start shadow-md shadow-primary/20">
                Discuter avec Adja
              </Button>
            </div>
            
            {/* Adja Image */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2">
              <div className="relative w-full h-full">
                {/* Decorative background circles */}
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 h-40 w-40 rounded-full border border-primary/20" />
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 h-28 w-28 rounded-full border border-primary/30" />
                
                <Image
                  src="/images/adja.png"
                  alt="Adja Assistant"
                  fill
                  className="object-cover object-top"
                />
                
                {/* Gradient fade on left side of image */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f4f7fc] to-transparent" />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
