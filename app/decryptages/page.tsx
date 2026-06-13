import type { Metadata } from "next";
import { FileText, Clock, ChevronRight } from "lucide-react";
import { getAllArticles, formatDate } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Décryptages",
  description: "Articles d'analyse et veille marché sur la fintech et la finance.",
};

const pills = ["Tous", "Mobile Money", "Néobanques", "Crypto", "Finance Durable", "Marchés"];

export default function DecryptagesPage() {
  const articles = getAllArticles();

  return (
    <div className="flex flex-col">
      <div className="w-full">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-2xl bg-accent-violet-50 text-accent-violet flex items-center justify-center shadow-inner">
              <FileText className="h-6 w-6" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-secondary">Décryptages</h1>
          </div>
          <p className="text-gray-500 max-w-2xl text-sm lg:text-base">
            Analyses pointues et veille stratégique sur l'actualité de la fintech. Comprenez les enjeux qui transforment l'économie mondiale.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10 border-b border-gray-200 pb-6">
          {pills.map((pill, i) => (
            <button 
              key={pill}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                i === 0 
                  ? "bg-secondary text-white shadow-md shadow-secondary/20" 
                  : "bg-transparent text-gray-500 hover:text-secondary hover:bg-gray-100"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((a) => (
            <Link key={a.id} href="#">
              <Card padding="lg" className="h-full flex flex-col group border-transparent hover:border-accent-violet-200 shadow-sm hover:shadow-card-hover transition-all">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="violet" className="font-bold">{a.categorie}</Badge>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
                    <Clock className="h-3.5 w-3.5" />
                    {a.readTime} min
                  </div>
                </div>
                
                <h2 className="font-display font-bold text-secondary text-xl mb-3 leading-snug group-hover:text-accent-violet transition-colors">
                  {a.titre}
                </h2>
                
                <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1 line-clamp-3">
                  {a.resume}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-accent-violet to-purple-400 flex items-center justify-center text-white font-bold text-xs">
                      {a.auteur.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-secondary">{a.auteur}</p>
                      <p className="text-xs text-gray-400">{formatDate(a.publishedAt)}</p>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-accent-violet group-hover:text-white text-gray-400 transition-colors">
                    <ChevronRight className="h-4 w-4" />
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
