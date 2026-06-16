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
    icon: Compass,
    accent: "bg-blue-50 text-blue-600 border border-blue-100/40 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300",
    badge: "primary" as const,
  },
  {
    href: "/formations",
    label: "Formations",
    description: "Trouvez votre cursus, les établissements et diplômes.",
    icon: BookOpen,
    accent: "bg-violet-50 text-violet-600 border border-violet-100/40 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300",
    badge: "violet" as const,
  },
  {
    href: "/decryptages",
    label: "Décryptages",
    description: "Analysez l'actualité financière et les tendances.",
    icon: TrendingUp,
    accent: "bg-amber-50 text-amber-600 border border-amber-100/40 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300",
    badge: "orange" as const,
  },
  {
    href: "/pratiques",
    label: "Pratiques",
    description: "Simulez, exercez-vous et développez vos compétences.",
    icon: Dumbbell,
    accent: "bg-emerald-50 text-emerald-600 border border-emerald-100/40 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300",
    badge: "green" as const,
  },
  {
    href: "/juniors",
    label: "Juniors",
    description: "Parcours adaptés aux niveaux scolaires.",
    icon: Users,
    accent: "bg-rose-50 text-rose-600 border border-rose-100/40 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300",
    badge: "rose" as const,
  },
  {
    href: "/carrieres",
    label: "Carrières",
    description: "Découvrez les métiers et opportunités.",
    icon: Briefcase,
    accent: "bg-indigo-50 text-indigo-600 border border-indigo-100/40 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300",
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
      <section className="relative overflow-hidden bg-gradient-to-tr from-blue-50/20 via-white to-violet-50/10 flex flex-col md:flex-row items-center justify-between p-15 md:p-15 lg:p-16 mb-24 shadow-premium">
        
        <div className="relative z-10 w-full md:w-1/2 md:pr-10 animate-fade-in mb-12 md:mb-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-semibold mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>La finance claire et accessible à tous</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-secondary leading-tight mb-6">
            Comprendre, Apprendre, Décrypter{" "}
            <span className="gradient-text">la Finance.</span>
          </h1>

          <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-lg">
            Business Core vous accompagne dans la découverte de la fintech,
            des formations et des opportunités de carrière.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              href="/explorer"
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="rounded-full px-8 shadow-sm hover:shadow-glow"
            >
              Explorer la plateforme
            </Button>
            <Button
              href="/decryptages"
              variant="outline"
              size="lg"
              className="rounded px-8 border-slate-200 text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 hover:border-slate-300"
            >
              Découvrir la Fintech
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full md:w-1/2 flex justify-center animate-slide-in-left">
          <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-card-hover border-4 border-white animate-float">
            <Image
              src="/images/hero.png"
              alt="Femme utilisant une tablette"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 h-28 w-28 bg-blue-400/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-36 w-36 bg-violet-400/20 rounded-full blur-3xl" />
        </div>
      </section>

      {/* =============================================
          ACCÈS RAPIDE — 6 cartes
          ============================================= */}
      <section className="pb-24 pt-4">
        <div className="flex items-center justify-between mb-15">
          <div>
            <h2 className="text-2xl font-display font-bold text-secondary">Accès rapide</h2>
            <p className="text-xs text-slate-500 mt-1">Accédez directement à nos services et ressources pédagogiques</p>
          </div>
          <Button variant="ghost" size="sm" className="rounded-full border border-slate-200 h-10 w-10 p-0 flex items-center justify-center bg-white hover:bg-slate-50">
            <ArrowRight className="h-4 w-4 text-slate-600" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {quickAccess.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Card
                  hover
                  padding="md"
                  className="h-full group transition-all duration-300 border border-slate-100/80 flex items-center shadow-premium hover:border-primary/20 hover:shadow-md rounded-2xl bg-white"
                >
                  <div
                    className={`h-12 w-12 min-w-[3rem] rounded-xl flex items-center justify-center mr-4 ${item.accent}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-bold text-secondary text-[15px] mb-0.5 break-words line-clamp-2 group-hover:text-primary transition-colors">{item.label}</h3>
                    <p className="text-[11px] text-slate-500 leading-snug break-words line-clamp-2">{item.description}</p>
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
      <section className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch border-t border-slate-100/60">
        
        {/* À la une */}
        <div className="lg:col-span-4 flex flex-col">
          <h2 className="text-xl font-display font-bold text-secondary mb-6">À la une</h2>
          {featuredArticles.slice(0, 1).map((article) => (
            <Link key={article.id} href={`/decryptages`} className="flex-1 flex">
              <Card hover padding="none" className="overflow-hidden shadow-premium border-slate-100/80 group rounded-2xl bg-white flex flex-col w-full h-full">
                <div className="relative h-48 w-full overflow-hidden bg-slate-900 flex items-center justify-center flex-shrink-0">
                  <Image 
                    src="/images/hero.png" 
                    alt="Article Image" 
                    fill 
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Soft elegant gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between space-y-3">
                  <div className="space-y-2">
                    <Badge variant="primary" size="sm" className="bg-primary/5 text-primary self-start border-none">Tendance</Badge>
                    <h3 className="font-bold text-secondary text-base break-words line-clamp-2 group-hover:text-primary transition-colors">
                      La Fintech transforme l'Afrique
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed break-words line-clamp-2">
                      De la monnaie mobile aux paiements numériques, découvrez les innovations qui changent notre quotidien.
                    </p>
                  </div>
                  <span className="text-primary text-xs font-semibold flex items-end gap-1 group-hover:gap-2 transition-all mt-2 pt-2">
                    Lire l'article <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Nos univers */}
        <div className="lg:col-span-4 flex flex-col">
          <h2 className="text-xl font-display font-bold text-secondary mb-6">Nos univers</h2>
          <div className="grid grid-cols-2 gap-4 flex-1">
            {[
              { value: "+120", label: "Formations" },
              { value: "35", label: "Établissements" },
              { value: "60+", label: "Métiers" },
              { value: "200+", label: "Articles & Ressources" },
            ].map((stat, i) => (
              <Card key={i} padding="md" className="border-slate-100/80 shadow-premium flex flex-col justify-center text-center min-w-0 space-y-1.5 hover:border-primary/10 transition-all duration-300 bg-white rounded-2xl">
                <p className="text-3xl font-extrabold text-primary tracking-tight break-words">{stat.value}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider break-words line-clamp-2">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Adja Assistant */}
        <div className="lg:col-span-4 flex flex-col">
          <h2 className="text-xl font-display font-bold text-secondary mb-6">Assistant IA</h2>
          <div className="flex-1 flex">
            <Link href="/adja" className="group w-full">
              <Card padding="none" className="overflow-hidden bg-gradient-to-br from-slate-900 via-secondary to-slate-950 border border-slate-800 shadow-premium relative w-full rounded-2xl flex items-center h-full min-h-[300px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
               <div className="p-8 relative z-10 w-2/3 flex flex-col justify-center min-w-0 space-y-4">
  <h3 className="font-bold text-white text-lg leading-snug break-words">Adja, votre assistant</h3>
  <p className="text-xs text-slate-300 leading-relaxed break-words line-clamp-3">
    Posez vos questions sur la finance et obtenez des réponses claires et simples.
  </p>
  <div className="rounded-full self-start bg-white text-slate-900 border-none hover:bg-slate-100 shadow-sm transition-all font-bold px-5 py-2.5 text-sm mt-2">
    Discuter avec Adja
  </div>
</div>
                
                {/* Adja Image */}
                <div className="absolute right-0 bottom-0 top-0 w-1/2">
                  <div className="relative w-full h-full">
                    {/* Decorative background circles */}
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 h-40 w-40 rounded-full border border-white/5" />
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 h-28 w-28 rounded-full border border-white/10" />
                    
                    <Image
                      src="/images/adja.png"
                      alt="Adja Assistant"
                      fill
                      className="object-cover object-top"
                    />
                    
                    {/* Gradient fade on left side of image (dark theme compatible) */}
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-secondary to-transparent" />
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
