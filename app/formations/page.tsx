import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { getAllFormations } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Formations",
  description: "Découvrez toutes les formations fintech et finance sur BusinessCore.",
};

export default function FormationsPage() {
  const formations = getAllFormations();

  return (
    <div className="px-6 py-10 lg:px-12">
      <div className="max-w-5xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-accent-green-50 text-accent-green flex items-center justify-center">
            <BookOpen className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-display font-bold text-secondary">Formations</h1>
        </div>
        <p className="text-gray-500 mb-8">Apprenez la finance et la fintech à votre rythme</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {formations.map((f) => (
            <Card key={f.id} hover accent="green" padding="md" className="flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="green" size="sm">{f.categorie}</Badge>
                <Badge variant="gray" size="sm">{f.niveau}</Badge>
              </div>
              <h2 className="font-semibold text-secondary text-sm mb-2 leading-snug">{f.titre}</h2>
              <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4">{f.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                <span>⏱ {f.duree}</span>
                <span>{f.modules} modules</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center">
          <p className="text-gray-400 text-sm">
            Module complet en cours de développement — branche{" "}
            <code className="bg-gray-100 px-2 py-0.5 rounded text-primary text-xs">feature/formations</code>
          </p>
        </div>
      </div>
    </div>
  );
}
