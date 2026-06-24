import { useCallback } from "react";
import { useAuth } from "@/lib/auth-context";

export function useLogger() {
  const { currentUser } = useAuth();

  const logEvent = useCallback(
    async (
      eventType: "connexion" | "deconnexion" | "mise_a_jour_profil" | "commentaire" | "consultation" | "autre",
      description: string,
      metadata?: Record<string, unknown>
    ) => {
      if (!currentUser) return;

      try {
        await fetch("/api/logs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser.id,
            eventType,
            description,
            metadata,
          }),
        });
      } catch (error) {
        console.error("Erreur lors de l'enregistrement du log :", error);
      }
    },
    [currentUser]
  );

  return { logEvent };
}
