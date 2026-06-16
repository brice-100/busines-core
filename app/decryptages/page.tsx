import type { Metadata } from "next";
import { FileText, Clock, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { getAllArticles, formatDate } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Décryptages",
  description: "Articles d’analyse et veille marché sur la fintech et la finance.",
};

const pills = ["Tous", "Monnaie digitale", "Néobanques", "Crypto", "Finance Durable", "Marchés"];

export default function DecryptagesPage() {
  const articles = getAllArticles();
  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const regularArticles = articles.filter(a => a.id !== featuredArticle?.id);

  return (
    <div className="flex flex-col gap-12 pb-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-14 w-14 rounded-2xl bg-accent-violet-50 text-accent-violet flex items-center justify-center shadow-inner">
              <FileText className="h-7 w-7" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-secondary tracking-tight">Décryptages</h1>
          </div>
          <p className="text-gray-500 text-lg leading-relaxed">
            Analyses pointues et veille stratégique sur l’actualité de la fintech. Comprenez les enjeux qui transforment l’économie mondiale.
          </p>
        </div>
      </div>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-violet-50 to-orange-50 rounded-3xl transform -rotate-1 scale-[1.01] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <Link href={`/decryptages/${featuredArticle.id}`}>
            <Card padding="none" className="relative flex flex-col lg:flex-row overflow-hidden border-transparent shadow-md hover:shadow-xl transition-all duration-500 rounded-3xl bg-white z-10">
              {/* Image / Gradient Placeholder */}
              <div className="lg:w-2/5 p-8 lg:p-12 bg-linear-to-br from-accent-violet to-purple-600 flex flex-col justify-between text-white min-h-[300px]">
                <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border-none self-start font-bold">
                  À la une
                </Badge>
                <div>
                  <Sparkles className="h-8 w-8 text-white/50 mb-4" />
                  <p className="text-white/80 font-medium text-sm tracking-wider uppercase mb-1">Dossier Spécial</p>
                  <p className="text-2xl font-display font-bold leading-tight">{featuredArticle.categorie}</p>
                </div>
              </div>
              
              {/* Content */}
              <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-4">
                  <Clock className="h-4 w-4" />
                  <span>{featuredArticle.readTime} min de lecture</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span>{formatDate(featuredArticle.publishedAt)}</span>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-secondary mb-4 leading-tight group-hover:text-accent-violet transition-colors duration-300">
                  {featuredArticle.titre}
                </h2>
                
                <p className="text-gray-500 text-lg mb-8 line-clamp-3 leading-relaxed">
                  {featuredArticle.resume}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-accent-violet to-purple-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {featuredArticle.auteur.charAt(0)}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-secondary">{featuredArticle.auteur}</p>
                      <p className="text-sm text-gray-400">Auteur</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-accent-violet font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Lire l’article <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </section>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2 pt-4">
        {pills.map((pill, i) => {
          const isMonnaieDigitale = pill === "Monnaie digitale";
          const isNeobanques = pill === "Néobanques";
          const isCrypto = pill === "Crypto";
          const isFinanceDurable = pill === "Finance Durable";
          const isMarches = pill === "Marchés";
          const Component = (isMonnaieDigitale || isNeobanques || isCrypto || isFinanceDurable || isMarches) ? Link : "button";
          const props = isMonnaieDigitale 
            ? { href: "/decryptages/monnaie-digitale" } 
            : isNeobanques
            ? { href: "/decryptages/neobanques" }
            : isCrypto
            ? { href: "/decryptages/crypto" }
            : isFinanceDurable
            ? { href: "/decryptages/finance-durable" }
            : isMarches
            ? { href: "/decryptages/marches" }
            : {};
          
          return (
            <Component 
              key={pill}
              {...props}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                i === 0 
                  ? "bg-secondary text-white shadow-md shadow-secondary/20" 
                  : "bg-gray-50 text-gray-600 hover:text-secondary hover:bg-gray-100 hover:shadow-sm"
              }`}
            >
              {pill}
            </Component>
          );
        })}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularArticles.map((a) => (
          <Link key={a.id} href={`/decryptages/${a.id}`}>
            <Card padding="lg" className="h-full flex flex-col group border-gray-100 hover:border-accent-violet-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 rounded-2xl bg-white">
              <div className="flex items-start justify-between mb-5">
                <Badge variant="violet" className="font-bold shadow-sm">{a.categorie}</Badge>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                  <Clock className="h-3.5 w-3.5" />
                  {a.readTime} min
                </div>
              </div>
              
              <h3 className="font-display font-bold text-secondary text-xl mb-3 leading-snug group-hover:text-accent-violet transition-colors duration-300 line-clamp-2">
                {a.titre}
              </h3>
              
              <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-1 line-clamp-3">
                {a.resume}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-accent-violet to-purple-400 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    {a.auteur.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-secondary">{a.auteur}</p>
                    <p className="text-xs text-gray-400">{formatDate(a.publishedAt)}</p>
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-accent-violet group-hover:text-white text-gray-400 transition-colors duration-300">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

    </div>
  );
}
