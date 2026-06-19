import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Building2,
  BookMarked,
  GraduationCap,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import {
  getAllMetiers,
  getMetierById,
  getFiliereTheme,
  countMatieres,
  countMatieresMetier,
} from "@/lib/formations-data";
import { getMetierImage } from "@/lib/metier-images";
import { FiliereIcon } from "@/components/modules/formations/FiliereIcon";
import { SemestreAccordion } from "@/components/modules/formations/SemestreAccordion";
import { SideNav, type SideNavItem } from "@/components/modules/formations/SideNav";
import { getMetierImage } from "@/lib/metier-images";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ metierId: string }>;
}

export function generateStaticParams() {
  return getAllMetiers().map((m) => ({ metierId: m.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { metierId } = await params;
  const metier = getMetierById(metierId);
  if (!metier) return { title: "Métier introuvable" };
  return {
    title: metier.nom,
    description: metier.description || `Formations pour devenir ${metier.nom} au Cameroun.`,
  };
}

export default async function MetierPage({ params }: PageProps) {
  const { metierId } = await params;
  const metier = getMetierById(metierId);
  if (!metier) notFound();

  const theme = getFiliereTheme(metier.filiereNum);
  const navItems: SideNavItem[] = metier.formations.map((f) => ({
    id: `etab-${f.id}`,
    label: f.etablissement,
  }));

  return (
    <div className="flex flex-col">
      {/* Fil d'Ariane */}
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-gray-400">
        <Link href="/formations" className="hover:text-primary">
          Formations
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className={theme.text}>Filière {metier.filiereNum}</span>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-secondary">{metier.nom}</span>
      </nav>

      {/* En-tête métier */}
      <header
        className="relative mb-12 overflow-hidden rounded-3xl shadow-lg flex flex-col lg:flex-row items-stretch bg-gradient-to-br from-indigo-700 to-indigo-500 text-white"
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

          {metier.description && (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/80 lg:text-base">
              {metier.description}
            </p>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            <Pill icon={<Building2 className="h-4 w-4" />}>
              {metier.formations.length} établissement
              {metier.formations.length > 1 ? "s" : ""}
            </Pill>
            <Pill icon={<BookMarked className="h-4 w-4" />}>
              {countMatieresMetier(metier)} matières au total
            </Pill>
          </div>
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

      {/* Menu latéral + formations */}
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[250px_1fr]">
        <aside className="hidden lg:block">
          <SideNav title="Établissements" items={navItems} />
        </aside>

        <div className="flex flex-col gap-16">
          {metier.formations.map((formation, idx) => (
            <section
              key={formation.id}
              id={`etab-${formation.id}`}
              className="scroll-mt-6"
            >
              {/* En-tête établissement */}
              <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold",
                      theme.bg,
                      "text-white"
                    )}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold leading-snug text-secondary lg:text-xl">
                      {formation.etablissement}
                    </h2>
                    {formation.parcours && (
                      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-gray-500">
                        {formation.parcours}
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-4 text-xs font-medium text-gray-400">
                      <span className="inline-flex items-center gap-1.5">
                        <Layers className="h-4 w-4" />
                        {formation.semestres.length} bloc
                        {formation.semestres.length > 1 ? "s" : ""}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <GraduationCap className="h-4 w-4" />
                        {countMatieres(formation)} matières
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/formations/metier/${metier.id}/formation/${formation.id}`}
                  className={cn(
                    "inline-flex flex-shrink-0 items-center gap-1.5 self-start rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                    theme.border,
                    theme.text,
                    "hover:bg-gray-50"
                  )}
                >
                  Vue détaillée
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Semestres déroulants */}
              <div className="space-y-4">
                {formation.semestres.map((sem, i) => (
                  <SemestreAccordion
                    key={i}
                    semestre={sem}
                    theme={theme}
                    defaultOpen={i === 0}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pill({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
      {icon}
      {children}
    </span>
  );
}
