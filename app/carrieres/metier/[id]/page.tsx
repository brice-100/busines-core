import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  GraduationCap,
  TrendingUp,
  ArrowUpRight,
  Target,
} from "lucide-react";
import {
  getCarrieres,
  getCarriereById,
  getFiliereTheme,
} from "@/lib/carrieres-data";
import { getMetierImage } from "@/lib/metier-images";
import { FiliereIcon } from "@/components/modules/formations/FiliereIcon";
import { CarriereTimeline } from "@/components/modules/carrieres/CarriereTimeline";
import { SideNav, type SideNavItem } from "@/components/modules/formations/SideNav";
import { getMetierImage } from "@/lib/metier-images";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getCarrieres().map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const metier = getCarriereById(id);
  if (!metier) return { title: "Métier introuvable" };
  return {
    title: `Carrière — ${metier.nom}`,
    description: metier.mission,
  };
}

export default async function CarriereMetierPage({ params }: PageProps) {
  const { id } = await params;
  const metier = getCarriereById(id);
  if (!metier) notFound();

  const theme = getFiliereTheme(metier.filiereNum);
  const navItems: SideNavItem[] = [
    { id: "ou-se-former", label: "Où se former" },
    { id: "evolution", label: "Évolution de carrière" },
  ];

  return (
    <div className="flex flex-col">
      {/* Fil d'Ariane */}
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-gray-400">
        <Link href="/carrieres" className="hover:text-primary">
          Carrières
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className={theme.text}>Filière {metier.filiereNum}</span>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-secondary">{metier.nom}</span>
      </nav>

      {/* En-tête */}
      <header
        className="relative mb-12 overflow-hidden rounded-3xl shadow-lg flex flex-col lg:flex-row items-stretch bg-gradient-to-br from-blue-700 to-blue-500 text-white"
      >
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex-1 p-8 lg:p-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              <FiliereIcon numero={metier.filiereNum} className="h-4 w-4" />
              {metier.filiereTitre}
            </span>
          </div>

          <h1 className="font-display text-3xl font-extrabold leading-tight lg:text-4xl">
            {metier.nom}
          </h1>
          <p className="mt-3 text-base font-semibold text-white/90">{metier.accroche}</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/80 lg:text-base">
            {metier.mission}
          </p>
        </div>

        {/* Photo du métier */}
        <div className="relative w-full lg:w-2/5 min-h-[250px] lg:min-h-auto flex-shrink-0 p-3">
          <div className="relative h-full w-full overflow-hidden rounded-2xl">
            <img
              src={getMetierImage(metier.id)}
              alt={metier.nom}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className={cn("absolute inset-0 opacity-20 mix-blend-multiply", theme.bgSoft)} />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 lg:from-black/10 to-transparent" />
          </div>
        </div>
      </header>

      {/* Menu latéral + contenu */}
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[230px_1fr]">
        <aside className="hidden lg:block">
          <SideNav title="Sur cette page" items={navItems} />
          <Link
            href="/carrieres"
            className="mt-6 inline-flex items-center gap-1.5 px-3 text-sm font-semibold text-gray-500 hover:text-primary"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Tous les métiers
          </Link>
        </aside>

        <div className="flex flex-col gap-16">
          {/* Où se former */}
          <section id="ou-se-former" className="scroll-mt-6">
            <SectionTitle
              icon={<GraduationCap className="h-5 w-5" />}
              theme={theme}
              title="Où se former"
              subtitle="Établissements de référence et cursus menant à ce métier."
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {metier.ouSeFormer.map((lieu, i) => {
                const lien =
                  lieu.metierId && lieu.formationId
                    ? `/formations/metier/${lieu.metierId}/formation/${lieu.formationId}`
                    : null;
                return (
                  <div
                    key={i}
                    className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-card"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <span
                        className={cn(
                          "rounded-md px-2 py-0.5 text-xs font-bold",
                          theme.bgSoft,
                          theme.text
                        )}
                      >
                        {lieu.niveau}
                      </span>
                    </div>
                    <h3 className="font-display text-base font-bold leading-snug text-secondary">
                      {lieu.etablissement}
                    </h3>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-gray-500">
                      {lieu.diplome}
                    </p>
                    {lien && (
                      <Link
                        href={lien}
                        className={cn(
                          "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold",
                          theme.text
                        )}
                      >
                        Voir le cursus détaillé
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Évolution de carrière */}
          <section id="evolution" className="scroll-mt-6">
            <SectionTitle
              icon={<TrendingUp className="h-5 w-5" />}
              theme={theme}
              title="Évolution de carrière"
              subtitle="Les grades que l'on peut atteindre, du premier poste à la direction."
            />
            <CarriereTimeline etapes={metier.evolution} theme={theme} />

            <p className="mt-8 flex items-start gap-3 rounded-2xl bg-gray-50 p-6 text-xs leading-relaxed text-gray-500">
              <Target className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
              Les intitulés de postes et les durées d&apos;expérience sont
              indicatifs : ils varient selon les entreprises, les secteurs et les
              profils.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
  subtitle,
  theme,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  theme: ReturnType<typeof getFiliereTheme>;
}) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div
        className={cn(
          "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl",
          theme.bgSoft,
          theme.text
        )}
      >
        {icon}
      </div>
      <div>
        <h2 className="font-display text-xl font-bold text-secondary">{title}</h2>
        <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
