import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import { getAllMetiers } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Carrières",
  description: "Découvrez les métiers de la finance et de la fintech sur BusinessCore.",
};

export default function CarrieresPage() {
  const metiers = getAllMetiers();

  return (
    <div className="px-6 py-10 lg:px-12">
      <div className="max-w-5xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-accent-cyan-50 text-accent-cyan flex items-center justify-center">
            <Briefcase className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-display font-bold text-secondary">Carrières</h1>
        </div>
        <p className="text-gray-500 mb-8">Explorez les métiers de la finance et trouvez votre voie</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {metiers.map((m) => (
            <Card key={m.id} hover accent="cyan" padding="md">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="font-semibold text-secondary mb-1">{m.intitule}</h2>
                  <Badge variant="cyan" size="sm">{m.secteur}</Badge>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{m.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {m.competences.slice(0, 3).map((c) => (
                  <Badge key={c} variant="gray" size="sm">{c}</Badge>
                ))}
              </div>
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  💰 <span className="font-medium text-secondary">{m.salaireMoyen}</span>
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center">
          <p className="text-gray-400 text-sm">
            Module complet en développement — branche{" "}
            <code className="bg-gray-100 px-2 py-0.5 rounded text-accent-cyan text-xs">feature/carrieres</code>
          </p>
        </div>
      </div>
    </div>
  );
}
