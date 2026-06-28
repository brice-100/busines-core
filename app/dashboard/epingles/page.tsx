"use client";

import React, { useMemo } from "react";
import { usePinnedArticles } from "@/lib/hooks/usePinnedArticles";
import { useAuth } from "@/lib/auth-context";
import { Bookmark, ExternalLink, X, Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const UNIVERSE_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  decryptages:  { label: "Décryptages",  color: "text-violet-600", bg: "bg-violet-50" },
  explorer:     { label: "Explorer",     color: "text-blue-600",   bg: "bg-blue-50"   },
  formations:   { label: "Formations",   color: "text-indigo-600", bg: "bg-indigo-50" },
  carrieres:    { label: "Carrières",    color: "text-orange-600", bg: "bg-orange-50" },
  innovation:   { label: "Innovation",   color: "text-rose-600",   bg: "bg-rose-50"   },
  juniors:      { label: "Juniors",      color: "text-cyan-600",   bg: "bg-cyan-50"   },
};

export default function EpinglesPage() {
  const { currentUser } = useAuth();
  const { pinnedArticles, removePin, pinnedCount } = usePinnedArticles();

  // Grouper les épingles par univers
  const grouped = useMemo(() => {
    const map: Record<string, typeof pinnedArticles> = {};
    for (const pin of pinnedArticles) {
      if (!map[pin.universe]) map[pin.universe] = [];
      map[pin.universe].push(pin);
    }
    return Object.entries(map);
  }, [pinnedArticles]);

  if (!currentUser) return null;

  return (
    <div className="px-4 py-8 lg:px-12 max-w-5xl mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center shadow-sm">
            <Bookmark className="h-6 w-6 text-amber-500 fill-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-secondary">
              Mes articles épinglés
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {pinnedCount > 0
                ? `${pinnedCount} article${pinnedCount > 1 ? "s" : ""} sauvegardé${pinnedCount > 1 ? "s" : ""} pour plus tard`
                : "Aucun article épinglé pour le moment"}
            </p>
          </div>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-gray-500 hover:text-secondary transition-colors"
        >
          ← Retour au tableau de bord
        </Link>
      </div>

      {/* ── État vide ── */}
      {pinnedArticles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-20 w-20 rounded-3xl bg-amber-50 flex items-center justify-center mb-6">
            <Bookmark className="h-10 w-10 text-amber-300" />
          </div>
          <h2 className="text-xl font-display font-bold text-secondary mb-2">
            Aucun article épinglé
          </h2>
          <p className="text-gray-400 text-sm max-w-sm mb-8">
            Épinglez des articles depuis n&apos;importe quel univers (Décryptages, Explorer,
            Formations…) pour les retrouver ici.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(UNIVERSE_LABELS).map(([key, val]) => (
              <Link
                key={key}
                href={`/${key}`}
                className={`text-sm font-semibold px-4 py-2 rounded-xl ${val.bg} ${val.color} hover:opacity-80 transition-opacity`}
              >
                {val.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Groupes par univers ── */}
      {grouped.length > 0 && (
        <div className="space-y-10">
          {grouped.map(([universe, pins]) => {
            const meta = UNIVERSE_LABELS[universe] ?? {
              label: universe.charAt(0).toUpperCase() + universe.slice(1),
              color: "text-gray-600",
              bg: "bg-gray-50",
            };
            return (
              <section key={universe}>
                {/* Titre du groupe */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-8 w-8 rounded-xl ${meta.bg} flex items-center justify-center`}>
                    <Layers className={`h-4 w-4 ${meta.color}`} />
                  </div>
                  <h2 className={`font-bold text-lg ${meta.color}`}>{meta.label}</h2>
                  <span className="text-xs text-gray-400">({pins.length})</span>
                </div>

                {/* Grille d'articles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pins.map((pin) => (
                    <article
                      key={pin.id}
                      className="group relative bg-white rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Image */}
                      {pin.articleImage ? (
                        <div className="h-36 overflow-hidden relative flex-shrink-0">
                          <Image
                            src={pin.articleImage}
                            alt={pin.articleTitre}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Bouton désépingler sur l'image */}
                          <button
                            onClick={() => removePin(pin.articleId)}
                            title="Désépingler"
                            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-white transition-all"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        /* Placeholder coloré si pas d'image */
                        <div className={`h-24 ${meta.bg} flex items-center justify-center relative flex-shrink-0`}>
                          <Bookmark className={`h-8 w-8 ${meta.color} opacity-30`} />
                          <button
                            onClick={() => removePin(pin.articleId)}
                            title="Désépingler"
                            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-white transition-all"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}

                      {/* Contenu */}
                      <div className="p-4 flex flex-col flex-1">
                        <span className={`inline-block text-[10px] font-semibold uppercase tracking-wide ${meta.color} ${meta.bg} px-2 py-0.5 rounded-full w-fit mb-2`}>
                          {meta.label}
                        </span>
                        <p className="font-semibold text-secondary text-sm leading-snug line-clamp-3 flex-1 mb-3">
                          {pin.articleTitre}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                          <span className="text-[11px] text-gray-400">
                            Épinglé le{" "}
                            {new Date(pin.pinnedAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                          <Link
                            href={`/${pin.universe}/${pin.articleId}`}
                            className={`flex items-center gap-1 text-xs font-semibold ${meta.color} hover:opacity-75 transition-opacity`}
                          >
                            Lire <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
