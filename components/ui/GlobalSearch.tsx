"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, TrendingUp, Briefcase, Compass, Sparkles, ArrowRight } from "lucide-react";
import { getAllArticles, getAllFormations, getAllMetiers, getAllStartups } from "@/lib/mock-data";

// ===================================================
// Types
// ===================================================
interface SearchResult {
  id: string;
  titre: string;
  description: string;
  href: string;
  universe: string;
  icon: React.ElementType;
  color: string;
}

// ===================================================
// Fonction de recherche globale
// ===================================================
function globalSearch(query: string): SearchResult[] {
  if (query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  // Articles / Décryptages
  getAllArticles()
    .filter((a) => a.titre.toLowerCase().includes(q) || a.resume?.toLowerCase().includes(q) || a.categorie?.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((a) =>
      results.push({
        id: a.id,
        titre: a.titre,
        description: a.resume ?? a.categorie ?? "",
        href: `/decryptages/${a.id}`,
        universe: "Décryptages",
        icon: TrendingUp,
        color: "text-green-600 bg-green-50",
      })
    );

  // Formations
  getAllFormations()
    .filter((f) => f.titre?.toLowerCase().includes(q) || f.categorie?.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((f) =>
      results.push({
        id: f.id,
        titre: f.titre ?? "Formation",
        description: f.categorie ?? "",
        href: `/formations/${f.id}`,
        universe: "Formations",
        icon: BookOpen,
        color: "text-violet-600 bg-violet-50",
      })
    );

  // Métiers / Carrières
  getAllMetiers()
    .filter((m) => m.intitule?.toLowerCase().includes(q) || m.secteur?.toLowerCase().includes(q) || m.description?.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((m) =>
      results.push({
        id: m.id,
        titre: m.intitule ?? "Métier",
        description: m.secteur ?? "",
        href: `/carrieres/metier/${m.id}`,
        universe: "Carrières",
        icon: Briefcase,
        color: "text-orange-600 bg-orange-50",
      })
    );

  // Startups / Explorer
  getAllStartups()
    .filter((s) => s.nom?.toLowerCase().includes(q) || s.secteur?.toLowerCase().includes(q) || s.pays?.toLowerCase().includes(q))
    .slice(0, 2)
    .forEach((s) =>
      results.push({
        id: s.id,
        titre: s.nom ?? "Startup",
        description: `${s.secteur ?? ""} • ${s.pays ?? ""}`,
        href: `/explorer/${s.id}`,
        universe: "Explorer",
        icon: Compass,
        color: "text-blue-600 bg-blue-50",
      })
    );

  return results.slice(0, 8);
}

// ===================================================
// Composant principal
// ===================================================
export function GlobalSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Recherche déclenchée au changement de query
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length >= 2) {
      const res = globalSearch(trimmed);
      setResults(res);
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Fermer si clic en dehors
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      setQuery("");
      setIsOpen(false);
      router.push(href);
    },
    [router]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        navigate(results[selectedIndex].href);
      } else if (query.trim().length >= 2) {
        navigate(`/decryptages?q=${encodeURIComponent(query.trim())}`);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      navigate(`/decryptages?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clear = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Grouper les résultats par univers
  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    if (!acc[r.universe]) acc[r.universe] = [];
    acc[r.universe].push(r);
    return acc;
  }, {});

  let globalIdx = -1;

  return (
    <div ref={containerRef} className="relative hidden md:flex flex-1 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="relative w-full group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          placeholder="Rechercher un sujet, une formation, un métier..."
          className="w-full pl-11 pr-10 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all shadow-sm"
          aria-label="Recherche globale"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={clear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Effacer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </form>

      {/* Dropdown des résultats */}
      {isOpen && (
        <div className="absolute top-full mt-3 left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/60 z-50 overflow-hidden max-h-[480px] overflow-y-auto">
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
              <Sparkles className="h-8 w-8 text-gray-200 mb-3" />
              <p className="text-sm font-medium text-gray-500">Aucun résultat pour &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-gray-400 mt-1">Essayez un autre terme.</p>
            </div>
          ) : (
            <div className="py-2">
              {Object.entries(grouped).map(([universe, items]) => (
                <div key={universe}>
                  <div className="px-4 pt-3 pb-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{universe}</p>
                  </div>
                  {items.map((result) => {
                    globalIdx += 1;
                    const idx = globalIdx;
                    const Icon = result.icon;
                    const isSelected = selectedIndex === idx;
                    return (
                      <button
                        key={result.id}
                        onClick={() => navigate(result.href)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          isSelected ? "bg-primary/5" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className={`flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center ${result.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold truncate ${isSelected ? "text-primary" : "text-secondary"}`}>
                            {result.titre}
                          </p>
                          {result.description && (
                            <p className="text-xs text-gray-400 truncate">{result.description}</p>
                          )}
                        </div>
                        <ArrowRight className={`h-3.5 w-3.5 flex-shrink-0 transition-opacity ${isSelected ? "opacity-100 text-primary" : "opacity-0"}`} />
                      </button>
                    );
                  })}
                </div>
              ))}
              <div className="border-t border-gray-50 mx-4 mt-2 pt-2 pb-2">
                <button
                  onClick={() => navigate(`/decryptages?q=${encodeURIComponent(query.trim())}`)}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded-xl text-xs font-semibold text-primary hover:bg-primary/5 transition-colors"
                >
                  <Search className="h-3.5 w-3.5" />
                  Voir tous les résultats pour &ldquo;{query}&rdquo;
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
