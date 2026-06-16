import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, Layers } from "lucide-react";
import { getAllFormations } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Formations",
  description: "Découvrez toutes les formations fintech et finance sur BusinessCore.",
};

const pills = ["Toutes", "Débutant", "Intermédiaire", "Avancé", "Certifiantes"];

export default function FormationsPage() {
  const formations = getAllFormations();

  return (
    <div className="flex flex-col">
      <div className="w-full">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-2xl bg-accent-green-50 text-accent-green flex items-center justify-center shadow-inner">
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-secondary">Formations</h1>
          </div>
          <p className="text-gray-500 max-w-2xl text-sm lg:text-base">
            Trouvez le cursus idéal pour propulser votre carrière. Des bases de la finance aux technologies blockchain avancées, apprenez à votre rythme.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {pills.map((pill, i) => (
            <button 
              key={pill}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                i === 0 
                  ? "bg-secondary text-white shadow-lg shadow-secondary/20" 
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formations.map((f) => (
            <Link key={f.id} href={`/formations/${f.id}`} className="group">
              <Card padding="none" className="flex flex-col overflow-hidden hover:border-accent-green-200 transition-colors">
                <div className="p-6 flex-1 flex flex-col relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-green-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <Badge variant="green" className="font-bold tracking-wide">{f.categorie}</Badge>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                    f.niveau === "Débutant" ? "bg-blue-50 text-blue-600" :
                    f.niveau === "Intermédiaire" ? "bg-orange-50 text-orange-600" :
                    "bg-purple-50 text-purple-600"
                  }`}>
                    {f.niveau}
                  </span>
                </div>

                <h2 className="font-display font-bold text-secondary text-lg mb-3 leading-snug group-hover:text-accent-green transition-colors relative z-10">
                  {f.titre}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1 relative z-10">
                  {f.description}
                </p>

                <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mt-auto pt-4 border-t border-gray-100 relative z-10">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {f.duree}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers className="h-4 w-4" />
                    {f.modules} modules
                  </div>
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
