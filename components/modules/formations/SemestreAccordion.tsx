"use client";

import { useState } from "react";
import { ChevronDown, Clock } from "lucide-react";
import { type Semestre, type FiliereTheme } from "@/lib/formations-data";
import { cn } from "@/lib/utils";

interface SemestreAccordionProps {
  semestre: Semestre;
  theme: FiliereTheme;
  /** ouvert par défaut (typiquement le premier) */
  defaultOpen?: boolean;
}

export function SemestreAccordion({
  semestre,
  theme,
  defaultOpen = false,
}: SemestreAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50"
      >
        <span
          className={cn(
            "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold",
            theme.bgSoft,
            theme.text
          )}
        >
          {semestre.matieres.length}
        </span>
        <span className="flex-1">
          <span className="block font-display text-sm font-bold text-secondary">
            {semestre.label || "Programme"}
          </span>
          {semestre.description && (
            <span className="mt-0.5 block text-xs leading-relaxed text-gray-400">
              {semestre.description}
            </span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="border-t border-gray-100 px-2 pb-2 pt-1 sm:px-3 animate-fade-in">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="w-10 px-3 py-2 font-semibold">N°</th>
                <th className="px-3 py-2 font-semibold">Matière</th>
                <th className="w-24 px-3 py-2 text-right font-semibold">Volume</th>
              </tr>
            </thead>
            <tbody>
              {semestre.matieres.map((m, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-50 align-top transition-colors hover:bg-gray-50/70"
                >
                  <td className="px-3 py-2.5 text-gray-400">{m.num || "–"}</td>
                  <td className="px-3 py-2.5 font-medium text-secondary">
                    {m.intitule}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-right">
                    {m.volume && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold",
                          theme.bgSoft,
                          theme.text
                        )}
                      >
                        <Clock className="h-3 w-3" />
                        {m.volume}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
