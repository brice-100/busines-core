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
import { FiliereIcon } from "@/components/modules/formations/FiliereIcon";
import { SemestreAccordion } from "@/components/modules/formations/SemestreAccordion";
import { SideNav, type SideNavItem } from "@/components/modules/formations/SideNav";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllMetiers().map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const metier = getMetierById(id);
  if (!metier) return { title: "Métier introuvable" };
  return {
    title: metier.nom,
    description: metier.description || `Formations pour devenir ${metier.nom} au Cameroun.`,
  };
}

export default async function MetierPage({ params }: PageProps) {
  const { id } = await params;
  const metier = getMetierById(id);
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
        className={cn(
          "relative mb-12 overflow-hidden rounded-3xl border bg-white p-8 shadow-card lg:p-10",
          theme.border
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl opacity-40",
            theme.bgSoft
          )}
        />
        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-3">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl",
                theme.bgSoft,
                theme.text
              )}
            >
              <FiliereIcon numero={metier.filiereNum} className="h-6 w-6" />
            </div>
            <span className={cn("text-xs font-bold uppercase tracking-wider", theme.text)}>
              {metier.filiereTitre}
            </span>
          </div>

          <h1 className="font-display text-3xl font-extrabold leading-tight text-secondary lg:text-4xl">
            {metier.nom}
          </h1>

          {metier.description && (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-500 lg:text-base">
              {metier.description}
            </p>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            <Pill icon={<Building2 className="h-4 w-4" />} theme={theme}>
              {metier.formations.length} établissement
              {metier.formations.length > 1 ? "s" : ""}
            </Pill>
            <Pill icon={<BookMarked className="h-4 w-4" />} theme={theme}>
              {countMatieresMetier(metier)} matières au total
            </Pill>
          </div>
        </div>
      </header>

      {/* Menu latéral + formations */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[250px_1fr]">
        <aside className="hidden lg:block">
          <SideNav title="Établissements" items={navItems} />
        </aside>

        <div className="flex flex-col gap-12">
          {metier.formations.map((formation, idx) => (
            <section
              key={formation.id}
              id={`etab-${formation.id}`}
              className="scroll-mt-6"
            >
              {/* En-tête établissement */}
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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
              <div className="space-y-3">
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
  theme,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  theme: ReturnType<typeof getFiliereTheme>;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
        theme.bgSoft,
        theme.text
      )}
    >
      {icon}
      {children}
    </span>
  );
}
