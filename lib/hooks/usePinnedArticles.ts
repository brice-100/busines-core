import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import type { PinnedArticle } from "@/types";

const getPinnedKey = (userId: string) => `bc_pinned_${userId}`;

interface PinTarget {
  articleId: string;
  articleTitre: string;
  universe: string;
  articleImage?: string;
}

export function usePinnedArticles() {
  const { currentUser, updateCurrentUser } = useAuth();
  const [pinnedArticles, setPinnedArticles] = useState<PinnedArticle[]>([]);

  // Charger les épingles au montage ou quand l'utilisateur change
  useEffect(() => {
    if (!currentUser) {
      setPinnedArticles([]);
      return;
    }
    if (currentUser.pinnedArticles) {
      setPinnedArticles(currentUser.pinnedArticles);
    } else {
      try {
        const raw = localStorage.getItem(getPinnedKey(currentUser.id));
        setPinnedArticles(raw ? JSON.parse(raw) : []);
      } catch {
        setPinnedArticles([]);
      }
    }
  }, [currentUser]);

  const savePins = useCallback(
    (pins: PinnedArticle[]) => {
      if (!currentUser) return;
      localStorage.setItem(getPinnedKey(currentUser.id), JSON.stringify(pins));
      setPinnedArticles(pins);
      updateCurrentUser({ pinnedArticles: pins });
    },
    [currentUser, updateCurrentUser]
  );

  const isPinned = useCallback(
    (articleId: string) => pinnedArticles.some((p) => p.articleId === articleId),
    [pinnedArticles]
  );

  const togglePin = useCallback(
    (target: PinTarget) => {
      if (!currentUser) return;

      const alreadyPinned = pinnedArticles.some((p) => p.articleId === target.articleId);

      if (alreadyPinned) {
        savePins(pinnedArticles.filter((p) => p.articleId !== target.articleId));
      } else {
        const newPin: PinnedArticle = {
          id: `pin_${Date.now()}`,
          articleId: target.articleId,
          articleTitre: target.articleTitre,
          universe: target.universe,
          articleImage: target.articleImage,
          pinnedAt: new Date().toISOString(),
        };
        savePins([newPin, ...pinnedArticles]);
      }
    },
    [currentUser, pinnedArticles, savePins]
  );

  const removePin = useCallback(
    (articleId: string) => {
      savePins(pinnedArticles.filter((p) => p.articleId !== articleId));
    },
    [pinnedArticles, savePins]
  );

  return {
    pinnedArticles,
    isPinned,
    togglePin,
    removePin,
    pinnedCount: pinnedArticles.length,
  };
}
