import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  GraduationCap,
  Layers,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import {
  getAllMetiers,
  getFormation,
  getFiliereTheme,
  countMatieres,
} from "@/lib/formations-data";
import { SemestreAccordion } from "@/components/modules/formations/SemestreAccordion";
import { SideNav, type SideNavItem } from "@/components/modules/formations/SideNav";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ metierId: string; formationId: string }>;
}

export function generateStaticParams() {
  return getAllMetiers().flatMap((m) =>
    m.formations.map((f) => ({ metierId: m.id, formationId: f.id }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { metierId, formationId } = await params;
  const res = getFormation(metierId, formationId);
  if (!res) return { title: "Formation introuvable" };
  return {
    title: `${res.formation.etablissement} — ${res.metier.nom}`,
    description: res.formation.parcours || res.metier.nom,
  };
}

export default async function FormationPage({ params }: PageProps) {
  const { metierId, formationId } = await params;
  const res = getFormation(metierId, formationId);
  if (!res) notFound();

  const { metier, formation } = res;
  const theme = getFiliereTheme(metier.filiereNum);

  const navItems: SideNavItem[] = formation.semestres.map((s, i) => ({
    id: `sem-${i}`,
    label: s.label || `Bloc ${i + 1}`,
  }));

  return (
    <div className="flex flex-col">
      {/* Fil d'Ariane */}
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-gray-400">
        <Link href="/formations" className="hover:text-primary">
          Formations
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/formations/metier/${metier.id}`} className="hover:text-primary">
          {metier.nom}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-secondary">{formation.etablissement}</span>
      </nav>

      {/* En-tête formation */}
      <header
        className={cn(
          "relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br p-8 text-white shadow-lg lg:p-10",
          theme.gradient
        )}
      >
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
            <GraduationCap className="h-4 w-4" />
            {metier.nom}
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-2xl font-extrabold leading-tight lg:text-4xl">
            {formation.etablissement}
          </h1>
          {formation.parcours && (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/85 lg:text-base">
              {formation.parcours}
            </p>
          )}
          <div className="mt-7 flex flex-wrap gap-8">
            <Stat
              icon={<Layers className="h-4 w-4" />}
              value={formation.semestres.length}
              label="Blocs / semestres"
            />
            <Stat
              icon={<BookOpen className="h-4 w-4" />}
              value={countMatieres(formation)}
              label="Matières"
            />
          </div>
        </div>
      </header>

      {/* Menu latéral + programme */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[250px_1fr]">
        <aside className="hidden lg:block">
          <SideNav title="Programme" items={navItems} />
          <Link
            href={`/formations/metier/${metier.id}`}
            className="mt-6 inline-flex items-center gap-1.5 px-3 text-sm font-semibold text-gray-500 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Tous les établissements
          </Link>
        </aside>

        <div className="flex flex-col gap-3">
          {formation.semestres.map((sem, i) => (
            <div key={i} id={`sem-${i}`} className="scroll-mt-6">
              <SemestreAccordion semestre={sem} theme={theme} defaultOpen />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
        {icon}
      </span>
      <div>
        <div className="font-display text-xl font-bold leading-none">{value}</div>
        <div className="mt-1 text-xs uppercase tracking-wide text-white/70">
          {label}
        </div>
      </div>
    </div>
  );
}
