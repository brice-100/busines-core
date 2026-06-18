import Link from "next/link";
import { ArrowRight, Building2, BookMarked } from "lucide-react";
import {
  type Metier,
  getFiliereTheme,
  countMatieresMetier,
} from "@/lib/formations-data";
import { getMetierImage } from "@/lib/metier-images";
import { cn } from "@/lib/utils";

interface MetierCardProps {
  metier: Metier;
}

export function MetierCard({ metier }: MetierCardProps) {
  const theme = getFiliereTheme(metier.filiereNum);
  const nbFormations = metier.formations.length;
  const nbMatieres = countMatieresMetier(metier);


  return (
    <Link
      href={`/formations/metier/${metier.id}`}
      className={cn(
        "group relative flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-card",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover hover:border-transparent"
      )}
    >
      {/* Image Cover */}
      <div className="relative w-full sm:w-2/5 md:w-1/3 h-48 sm:h-auto flex-shrink-0 p-3">
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <img
            src={getMetierImage(metier.slug)}
            alt={metier.nom}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className={cn("absolute inset-0 opacity-10 mix-blend-multiply", theme.bgSoft)} />
        </div>
      </div>

      {/* halo doux au survol */}
      <div
        className={cn(
          "pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl opacity-0",
          "group-hover:opacity-60 transition-opacity duration-500",
          theme.bgSoft
        )}
      />

      <div className="relative z-10 flex flex-col h-full p-6 sm:p-8 flex-1">
        <h3 className="font-display text-lg font-bold leading-snug text-secondary group-hover:text-primary transition-colors">
          {metier.nom}
        </h3>

        {metier.description && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-500">
            {metier.description}
          </p>
        )}

        <div className="mt-6 flex items-center gap-4 border-t border-gray-100 pt-4 text-xs font-medium text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <Building2 className="h-4 w-4" />
            {nbFormations} établissement{nbFormations > 1 ? "s" : ""}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookMarked className="h-4 w-4" />
            {nbMatieres} matières
          </span>
        </div>

        <div
          className={cn(
            "mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold",
            theme.text
          )}
        >
          Voir les formations
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
