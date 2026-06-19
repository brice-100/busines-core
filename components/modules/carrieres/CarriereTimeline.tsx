import { Clock } from "lucide-react";
import { type EtapeCarriere, type FiliereTheme } from "@/lib/carrieres-data";
import { cn } from "@/lib/utils";

interface CarriereTimelineProps {
  etapes: EtapeCarriere[];
  theme: FiliereTheme;
}

/**
 * Timeline verticale de l'évolution de carrière.
 * Présentation pure (composant serveur).
 */
export function CarriereTimeline({ etapes, theme: _theme }: CarriereTimelineProps) {
  return (
    <ol className="relative space-y-6 pl-2">
      {etapes.map((etape, i) => {
        const last = i === etapes.length - 1;
        return (
          <li key={i} className="relative flex gap-5">
            {/* Colonne repère + ligne */}
            <div className="relative flex flex-col items-center">
              <span
                className="z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ring-4 ring-white bg-violet-700 text-white"
              >
                {i + 1}
              </span>
              {!last && (
                <span className="absolute top-9 h-[calc(100%+0.5rem)] w-px bg-violet-200" />
              )}
            </div>

            {/* Contenu */}
            <div
              className={cn(
                "flex-1 rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover",
                last && "border-violet-100 bg-violet-50"
              )}
            >
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <span
                  className="rounded-md px-2 py-0.5 text-xs font-bold bg-violet-100 text-violet-700"
                >
                  {etape.niveau}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400">
                  <Clock className="h-3.5 w-3.5" />
                  {etape.experience}
                </span>
              </div>
              <h3 className="font-display text-base font-bold text-secondary">
                {etape.poste}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                {etape.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
