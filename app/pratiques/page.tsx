import type { Metadata } from "next";
import { Dumbbell } from "lucide-react";
import { getAllExercices } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pratiques",
  description: "Exercices interactifs pour pratiquer la finance et la fintech.",
};

export default function PratiquesPage() {
  const exercices = getAllExercices();

  return (
    <div className="px-6 py-10 lg:px-12">
      <div className="max-w-5xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-accent-orange-50 text-accent-orange flex items-center justify-center">
            <Dumbbell className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-display font-bold text-secondary">Pratiques</h1>
        </div>
        <p className="text-gray-500 mb-8">Exercices et cas concrets pour renforcer vos compétences</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {exercices.map((e) => (
            <Card key={e.id} hover accent="orange" padding="md" className="flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="orange" size="sm">{e.categorie}</Badge>
                <Badge
                  variant={e.difficulte === "Facile" ? "green" : e.difficulte === "Moyen" ? "orange" : "rose"}
                  size="sm"
                >
                  {e.difficulte}
                </Badge>
              </div>
              <h2 className="font-semibold text-secondary text-sm mb-2">{e.titre}</h2>
              <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4">{e.description}</p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400">⏱ {e.duree}</span>
                <Button variant="outline" size="sm" href="/pratiques">Commencer</Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center">
          <p className="text-gray-400 text-sm">
            Module interactif en développement — branche{" "}
            <code className="bg-gray-100 px-2 py-0.5 rounded text-accent-orange text-xs">feature/pratiques</code>
          </p>
        </div>
      </div>
    </div>
  );
}
