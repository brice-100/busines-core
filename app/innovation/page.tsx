import type { Metadata } from "next";
import { Lightbulb } from "lucide-react";
import { getAllStartups } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Innovation",
  description: "Startups fintech et tendances de l'innovation financière.",
};

export default function InnovationPage() {
  const startups = getAllStartups();

  return (
    <div className="px-6 py-10 lg:px-12">
      <div className="max-w-5xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-accent-indigo-50 text-accent-indigo flex items-center justify-center">
            <Lightbulb className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-display font-bold text-secondary">Innovation</h1>
        </div>
        <p className="text-gray-500 mb-8">Les startups fintech qui transforment l&apos;industrie financière</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {startups.map((s) => (
            <Card key={s.id} hover accent="indigo" padding="md" className="flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="indigo" size="sm">{s.secteur}</Badge>
                <span className="text-xs text-gray-400">{s.annee}</span>
              </div>
              <h2 className="font-semibold text-secondary mb-1">{s.nom}</h2>
              <p className="text-xs text-gray-400 mb-2">🌍 {s.pays}</p>
              <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4">{s.description}</p>
              {s.levee && (
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    💰 Levée : <span className="font-semibold text-accent-green">{s.levee}</span>
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center">
          <p className="text-gray-400 text-sm">
            Module complet en développement — branche{" "}
            <code className="bg-gray-100 px-2 py-0.5 rounded text-accent-indigo text-xs">feature/innovation</code>
          </p>
        </div>
      </div>
    </div>
  );
}
