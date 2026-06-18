"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, GraduationCap, Layers, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Tokens de couleur par filière (alignés sur les thèmes de lib/formations-data).
// Dupliqués localement pour éviter d'embarquer le JSON des formations côté client.
const FILIERE_COLORS: Record<number, { text: string; bg: string; bgSoft: string }> = {
  1: { text: "text-primary-600", bg: "bg-primary-600", bgSoft: "bg-primary-50" },
  2: { text: "text-accent-violet-500", bg: "bg-accent-violet-500", bgSoft: "bg-accent-violet-50" },
  3: { text: "text-accent-cyan-500", bg: "bg-accent-cyan-500", bgSoft: "bg-accent-cyan-50" },
  4: { text: "text-accent-green-600", bg: "bg-accent-green-500", bgSoft: "bg-accent-green-50" },
};

const getColors = (num: number) => FILIERE_COLORS[num] ?? FILIERE_COLORS[1];

export interface CursusMetier {
  id: string;
  nom: string;
}

export interface CursusFiliere {
  num: number;
  titre: string;
  metiers: CursusMetier[];
}

export interface Cursus {
  id: string;
  titre: string;
  sousTitre: string;
  filieres: CursusFiliere[];
}

interface CursusSectionProps {
  cursus: Cursus[];
}

/**
 * Onglet « Cursus » : classement des 20 métiers selon les grands parcours
 * de formation officiels du Cameroun. Chaque cursus est une liste déroulante
 * contenant les filières, elles-mêmes déroulantes, dont les métiers sont des
 * liens vers la page du métier correspondant.
 */
export function CursusSection({ cursus }: CursusSectionProps) {
  return (
    <section id="cursus" className="scroll-mt-6">
      <header className="mb-8 flex items-start gap-5">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Layers className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Parcours officiels
          </p>
          <h2 className="font-display text-xl font-bold text-secondary lg:text-2xl">
            Les Cursus du système camerounais
          </h2>
          <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-gray-500">
            Une seconde lecture des 20 métiers : d&apos;abord par cursus (les grands
            parcours de formation officiels), qui se subdivisent en filières (F1 à F4)
            pour identifier les débouchés professionnels de chaque parcours.
          </p>
        </div>
      </header>

      <div className="space-y-4">
        {cursus.map((c) => (
          <CursusCard key={c.id} cursus={c} />
        ))}
      </div>
    </section>
  );
}

function CursusCard({ cursus }: { cursus: Cursus }) {
  const [open, setOpen] = useState(false);
  const totalMetiers = cursus.filieres.reduce((acc, f) => acc + f.metiers.length, 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50"
      >
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <GraduationCap className="h-5 w-5" />
        </span>
        <span className="flex-1">
          <span className="block font-display text-sm font-bold text-secondary sm:text-base">
            {cursus.titre}
          </span>
          <span className="mt-0.5 block text-xs text-gray-400">
            {cursus.filieres.length} filière{cursus.filieres.length > 1 ? "s" : ""} ·{" "}
            {totalMetiers} métier{totalMetiers > 1 ? "s" : ""}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="animate-fade-in space-y-2 border-t border-gray-100 px-3 py-3 sm:px-4">
          <p className="px-2 pb-1 text-xs leading-relaxed text-gray-400">
            {cursus.sousTitre}
          </p>
          {cursus.filieres.map((f) => (
            <FiliereRow key={`${cursus.id}-f${f.num}`} filiere={f} />
          ))}
        </div>
      )}
    </div>
  );
}

function FiliereRow({ filiere }: { filiere: CursusFiliere }) {
  const [open, setOpen] = useState(false);
  const theme = getColors(filiere.num);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-100/70"
      >
        <span
          className={cn(
            "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold",
            theme.bgSoft,
            theme.text
          )}
        >
          F{filiere.num}
        </span>
        <span className="flex-1 font-display text-sm font-semibold text-secondary">
          {filiere.titre}
        </span>
        <span className="text-xs text-gray-400">
          {filiere.metiers.length} métier{filiere.metiers.length > 1 ? "s" : ""}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <ul className="animate-fade-in space-y-1 border-t border-gray-100 px-2 py-2">
          {filiere.metiers.map((m) => (
            <li key={m.id}>
              <Link
                href={`/formations/metier/${m.id}`}
                className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-white"
              >
                <span className={cn("h-1.5 w-1.5 flex-shrink-0 rounded-full", theme.bg)} />
                <span className="flex-1 transition-colors group-hover:font-medium group-hover:text-secondary">
                  {m.nom}
                </span>
                <ArrowUpRight
                  className={cn(
                    "h-4 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100",
                    theme.text
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
