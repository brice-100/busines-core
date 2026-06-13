import type { Metadata } from "next";
import { Briefcase, Building, MapPin, ChevronRight } from "lucide-react";
import { getAllMetiers } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Carrières",
  description: "Découvrez les métiers de la finance et de la fintech sur BusinessCore.",
};

const pills = ["Tous les métiers", "Finance", "Technologie", "Data & IA", "Réglementation", "Banque"];

export default function CarrieresPage() {
  const metiers = getAllMetiers();

  return (
    <div className="flex flex-col">
      <div className="w-full">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-2xl bg-accent-cyan-50 text-accent-cyan flex items-center justify-center shadow-inner">
              <Briefcase className="h-6 w-6" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-secondary">Carrières</h1>
          </div>
          <p className="text-gray-500 max-w-2xl text-sm lg:text-base">
            Explorez les métiers d'avenir dans l'écosystème financier. De l'analyse de données à la conformité réglementaire, trouvez votre voie.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {pills.map((pill, i) => (
            <button 
              key={pill}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                i === 0 
                  ? "bg-secondary text-white shadow-md shadow-secondary/20" 
                  : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-secondary hover:shadow-sm"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex flex-col gap-4">
          {metiers.map((m) => (
            <Link key={m.id} href="#">
              <Card padding="lg" className="group border-transparent hover:border-accent-cyan-300 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-6">
                
                {/* Info block */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="cyan" className="font-bold">{m.secteur}</Badge>
                    <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> Hybride / Télétravail
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-secondary text-xl mb-2 group-hover:text-accent-cyan transition-colors">
                    {m.intitule}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-3xl">
                    {m.description}
                  </p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {m.competences.map((c) => (
                      <span key={c} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium border border-gray-100">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Salary & Action block */}
                <div className="md:w-64 flex flex-col justify-center items-start md:items-end md:border-l border-gray-100 md:pl-6 mt-4 md:mt-0">
                  <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">Salaire moyen</p>
                  <p className="text-lg font-bold text-secondary mb-4">{m.salaireMoyen}</p>
                  <div className="flex items-center text-sm font-semibold text-accent-cyan group-hover:gap-2 transition-all">
                    Découvrir ce métier <ChevronRight className="h-4 w-4" />
                  </div>
                </div>

              </Card>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
