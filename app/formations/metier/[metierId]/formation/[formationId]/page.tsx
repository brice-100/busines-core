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

  // Images representant les etablissements
  const getEtablissementImage = (name: string) => {
    // We use different high-quality Unsplash university/campus photos to simulate the different schools.
    const images: Record<string, string> = {
      "UCAC (Université Catholique d'Afrique Centrale)": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
      "UCAC (Université Catholique d'Afrique Centrale) — Yaoundé": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
      "ESSEC de Douala (Université de Douala)": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
      "ESSEC de Douala": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
      "FSEG de l'Université de Yaoundé II (Soa)": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
      "ISSEA (Institut Sous-régional de Statistique et d'Économie Appliquée) — Yaoundé": "https://images.unsplash.com/photo-1519452285022-eb18b8b0e774?w=800&q=80",
      "IUT de Douala (Université de Douala)": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
      "ISMA (Institut Supérieur du Management des Affaires) — Douala": "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80",
      "Cursus unique du BTS CGE (valable pour TOUS les IPES)": "https://images.unsplash.com/photo-1555626906-fcf10d6851b4?w=800&q=80"
    };
    return images[name] || "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&q=80"; // Default campus image
  };

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
        className="relative mb-20 overflow-hidden rounded-3xl shadow-lg flex flex-col lg:flex-row items-stretch bg-gradient-to-br from-blue-700 to-blue-500"
      >
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex-1 p-8 lg:p-10 text-white">
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

        {/* Photo de l'établissement */}
        <div className="relative w-full lg:w-2/5 min-h-[250px] lg:min-h-auto flex-shrink-0 p-3">
          <div className="relative h-full w-full overflow-hidden rounded-2xl">
            <img
              src={getEtablissementImage(formation.etablissement)}
              alt={formation.etablissement}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className={cn("absolute inset-0 opacity-20 mix-blend-multiply", theme.bgSoft)} />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 lg:from-black/10 to-transparent" />
          </div>
        </div>
      </header>

      {/* Menu latéral + programme */}
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[250px_1fr]">
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

        <div className="flex flex-col gap-5">
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
