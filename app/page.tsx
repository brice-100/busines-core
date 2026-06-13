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
  Bot,
  Compass,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getFeaturedArticles, formatDate } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "BusinessCore — Votre plateforme fintech & finance",
  description:
    "Formations, décryptages, exercices pratiques et opportunités de carrière dans la fintech et la finance. Rejoignez la communauté BusinessCore.",
};

// Accès rapide — 6 modules avec couleurs accent
const quickAccess = [
  {
    href: "/formations",
    label: "Formations",
    description: "Cours structurés sur la finance et la fintech",
    icon: BookOpen,
    accent: "bg-accent-green-50 text-accent-green-500 border-accent-green-100",
    badge: "green" as const,
    count: "6 cours",
  },
  {
    href: "/decryptages",
    label: "Décryptages",
    description: "Articles d'analyse et veille marché",
    icon: FileText,
    accent: "bg-accent-violet-50 text-accent-violet border-accent-violet-100",
    badge: "violet" as const,
    count: "12 articles",
  },
  {
    href: "/pratiques",
    label: "Pratiques",
    description: "Exercices et cas concrets interactifs",
    icon: Dumbbell,
    accent: "bg-accent-orange-50 text-accent-orange border-accent-orange-100",
    badge: "orange" as const,
    count: "3 exercices",
  },
  {
    href: "/juniors",
    label: "Juniors",
    description: "Ressources spéciales pour étudiants",
    icon: Users,
    accent: "bg-accent-rose-50 text-accent-rose border-accent-rose-100",
    badge: "rose" as const,
    count: "Nouveau",
  },
  {
    href: "/carrieres",
    label: "Carrières",
    description: "Métiers et opportunités en finance",
    icon: Briefcase,
    accent: "bg-accent-cyan-50 text-accent-cyan border-accent-cyan-100",
    badge: "cyan" as const,
    count: "5 métiers",
  },
  {
    href: "/innovation",
    label: "Innovation",
    description: "Startups fintech et tendances",
    icon: Lightbulb,
    accent: "bg-accent-indigo-50 text-accent-indigo border-accent-indigo-100",
    badge: "indigo" as const,
    count: "5 startups",
  },
];

// "Nos univers" — résumé des modules
const univers = [
  { href: "/explorer", label: "Explorer", icon: Compass, desc: "Naviguer dans l'écosystème fintech" },
  { href: "/formations", label: "Formations", icon: BookOpen, desc: "Apprendre à son rythme" },
  { href: "/innovation", label: "Innovation", icon: Lightbulb, desc: "Suivre les startups fintech" },
  { href: "/carrieres", label: "Carrières", icon: Briefcase, desc: "Trouver sa voie en finance" },
];

export default function HomePage() {
  const featuredArticles = getFeaturedArticles();

  return (
    <div className="flex flex-col">
      {/* =============================================
          SECTION HERO
          ============================================= */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-[520px] flex items-center px-6 py-16 lg:px-12">
        {/* Décoration background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary-500/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-accent-violet/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-accent-orange" />
            La plateforme fintech éducative n°1
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
            Maîtrisez la{" "}
            <span className="relative">
              <span className="text-primary-300">finance</span>
            </span>{" "}
            et la{" "}
            <span className="text-accent-orange-400">fintech</span>
          </h1>

          <p className="text-white/70 text-lg max-w-xl mb-8 leading-relaxed">
            Formations structurées, décryptages d'actualité, exercices pratiques et opportunités
            de carrière — tout ce qu'il vous faut pour exceller dans l'économie numérique.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              href="/formations"
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl"
            >
              Commencer gratuitement
            </Button>
            <Button
              href="/explorer"
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10 hover:border-white/60"
              leftIcon={<Compass className="h-4 w-4" />}
            >
              Explorer
            </Button>
          </div>

          {/* Stats rapides */}
          <div className="flex flex-wrap gap-6 mt-10">
            {[
              { value: "6+", label: "Formations" },
              { value: "12+", label: "Articles" },
              { value: "5+", label: "Métiers" },
              { value: "100%", label: "Gratuit" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
                <p className="text-white/50 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Illustration flottante */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex items-center justify-center">
          <div className="relative animate-float">
            <div className="h-48 w-48 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl">
              <TrendingUp className="h-24 w-24 text-white/30" />
            </div>
            {/* Badges flottants */}
            <div className="absolute -top-4 -right-4 bg-accent-green text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
              +12% ce mois
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-secondary px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
              🎓 6 formations
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          ACCÈS RAPIDE — 6 cartes
          ============================================= */}
      <section className="px-6 py-12 lg:px-12 bg-background">
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-secondary">Accès rapide</h2>
          <p className="text-gray-500 text-sm mt-1">Explorez tous les modules de la plateforme</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickAccess.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Card
                  hover
                  padding="md"
                  className="h-full group transition-all duration-300 hover:border-primary-200"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-11 w-11 rounded-xl border flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${item.accent}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-secondary text-sm">{item.label}</h3>
                        <Badge variant={item.badge} size="sm">{item.count}</Badge>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =============================================
          À LA UNE — 3 articles récents
          ============================================= */}
      <section className="px-6 py-12 lg:px-12 bg-surface">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-display font-bold text-secondary">À la une</h2>
            <p className="text-gray-500 text-sm mt-1">Les derniers décryptages de l&apos;équipe</p>
          </div>
          <Button variant="outline" href="/decryptages" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
            Tout voir
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.slice(0, 3).map((article, i) => (
            <Link key={article.id} href={`/decryptages`}>
              <Card
                hover
                padding="md"
                className={`h-full animate-slide-up`}
                style={{ animationDelay: `${i * 80}ms` } as React.CSSProperties}
              >
                {/* Catégorie */}
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="primary" size="sm">{article.categorie}</Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min
                  </div>
                </div>

                {/* Titre */}
                <h3 className="font-semibold text-secondary text-sm mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {article.titre}
                </h3>

                {/* Résumé */}
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4">
                  {article.resume}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{article.auteur}</span>
                  <span className="text-xs text-gray-400">{formatDate(article.publishedAt)}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* =============================================
          NOS UNIVERS
          ============================================= */}
      <section className="px-6 py-12 lg:px-12 bg-background">
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-secondary">Nos univers</h2>
          <p className="text-gray-500 text-sm mt-1">
            Un écosystème complet pour votre montée en compétences
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {univers.map((u) => {
            const Icon = u.icon;
            return (
              <Link key={u.href} href={u.href}>
                <div className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer">
                  <div className="h-12 w-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-secondary text-sm mb-1">{u.label}</h3>
                  <p className="text-xs text-gray-500">{u.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* =============================================
          ENCART ASSISTANT ADJA
          ============================================= */}
      <section className="px-6 py-12 lg:px-12 bg-surface">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-secondary p-8 md:p-12">
          {/* Décoration */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-primary/10 rounded-r-3xl hidden md:block" />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-primary/20 blur-2xl hidden md:block" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Icône Adja */}
            <div className="h-20 w-20 rounded-3xl bg-primary flex items-center justify-center flex-shrink-0 shadow-glow animate-float">
              <Bot className="h-10 w-10 text-white" />
            </div>

            {/* Texte */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="text-white font-display font-bold text-2xl">
                  Adja, votre assistante IA
                </span>
                <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-lg">
                Posez vos questions sur la fintech, obtenez des explications personnalisées,
                et faites-vous guider dans votre parcours d&apos;apprentissage. Adja est disponible 24h/24.
              </p>
              <div className="flex flex-wrap gap-3 mt-5 justify-center md:justify-start">
                <Button
                  href="/adja"
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="bg-white text-secondary hover:bg-white/90"
                >
                  Parler à Adja
                </Button>
                <Button
                  href="/a-propos"
                  variant="outline"
                  size="md"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  En savoir plus
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
