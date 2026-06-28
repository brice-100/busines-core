"use client";

import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { usePinnedArticles } from "@/lib/hooks/usePinnedArticles";
import { useAuth } from "@/lib/auth-context";

interface PinButtonProps {
  articleId: string;
  articleTitre: string;
  universe: string;
  articleImage?: string;
  className?: string;
  /** Affichage compact (icône seule) ou avec label */
  compact?: boolean;
}

export function PinButton({
  articleId,
  articleTitre,
  universe,
  articleImage,
  className = "",
  compact = false,
}: PinButtonProps) {
  const { currentUser } = useAuth();
  const { isPinned, togglePin } = usePinnedArticles();
  const [isAnimating, setIsAnimating] = useState(false);

  const pinned = isPinned(articleId);

  if (!currentUser) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    togglePin({ articleId, articleTitre, universe, articleImage });
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <button
      onClick={handleClick}
      title={pinned ? "Désépingler cet article" : "Épingler pour plus tard"}
      aria-label={pinned ? "Désépingler" : "Épingler"}
      className={`
        group inline-flex items-center gap-1.5 rounded-xl font-medium text-sm
        transition-all duration-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
        ${pinned
          ? "bg-primary/10 text-primary hover:bg-red-50 hover:text-red-500"
          : "bg-gray-100 text-gray-500 hover:bg-primary/10 hover:text-primary"
        }
        ${compact ? "p-2" : "px-3 py-2"}
        ${isAnimating ? "scale-90" : "scale-100"}
        ${className}
      `}
    >
      <Bookmark
        className={`
          h-4 w-4 transition-all duration-200
          ${isAnimating ? "scale-125" : "scale-100"}
          ${pinned ? "fill-current" : ""}
        `}
      />
      {!compact && (
        <span className="leading-none">
          {pinned ? "Épinglé" : "Épingler"}
        </span>
      )}
    </button>
  );
}
