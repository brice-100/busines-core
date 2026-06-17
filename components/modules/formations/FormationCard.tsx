import Link from "next/link";
import { ArrowUpRight, GraduationCap, Layers, BookOpen } from "lucide-react";
import {
  type Metier,
  type Formation,
  getFiliereTheme,
  countMatieres,
} from "@/lib/formations-data";
import { cn } from "@/lib/utils";

interface FormationCardProps {
  metier: Metier;
  formation: Formation;
}

export function FormationCard({ metier, formation }: FormationCardProps) {
  const theme = getFiliereTheme(metier.filiereNum);
  const nbSemestres = formation.semestres.length;
  const nbMatieres = countMatieres(formation);

  return (
    <Link
      href={`/formations/metier/${metier.id}/formation/${formation.id}`}
      className={cn(
        "group flex flex-col rounded-2xl border border-gray-100 bg-white shadow-card overflow-hidden",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
      )}
    >
      {/* bandeau visuel doux */}
      <div className={cn("h-1.5 w-full bg-gradient-to-r", theme.gradient)} />

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start gap-3">
          <div
            className={cn(
              "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl",
              theme.bgSoft,
              theme.text
            )}
          >
            <GraduationCap className="h-6 w-6" />
          </div>
          <h3 className="font-display text-base font-bold leading-snug text-secondary group-hover:text-primary transition-colors">
            {formation.etablissement}
          </h3>
        </div>

        {formation.parcours && (
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-500">
            {formation.parcours}
          </p>
        )}

        <div className="mt-auto flex items-center gap-4 pt-6 text-xs font-medium text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <Layers className="h-4 w-4" />
            {nbSemestres} bloc{nbSemestres > 1 ? "s" : ""}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            {nbMatieres} matières
          </span>
          <ArrowUpRight
            className={cn(
              "ml-auto h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
              theme.text
            )}
          />
        </div>
      </div>
    </Link>
  );
}
