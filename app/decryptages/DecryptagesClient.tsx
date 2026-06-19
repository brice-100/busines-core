"use client";

import React from "react";
import { FileText, Clock, ChevronRight, ArrowRight, Sparkles, Plus } from "lucide-react";
import { useArticles } from "@/lib/article-context";
import { useAuth } from "@/lib/auth-context";
import { formatDate } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Tous", href: "/decryptages" },
  { label: "Monnaie digitale", href: "/decryptages/monnaie-digitale" },
  { label: "Néobanques", href: "/decryptages/neobanques" },
  { label: "Crypto", href: "/decryptages/crypto" },
  { label: "Finance Durable", href: "/decryptages/finance-durable" },
  { label: "Marchés", href: "/decryptages/marches" },
];

export default function DecryptagesClient() {
  const { articles } = useArticles();
  const { currentUser } = useAuth();
  const pathname = usePathname();

  const featuredArticle = articles.find((a) => a.featured) || articles[0];
  const regularArticles = articles.filter((a) => a.id !== featuredArticle?.id);

  const canPublish = currentUser?.role === "blogueur" || currentUser?.role === "administrateur";

  return (
    <div className="flex flex-col gap-12 pb-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-14 w-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shadow-inner">
              <FileText className="h-7 w-7" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-secondary tracking-tight">Décryptages</h1>
          </div>
          <p className="text-gray-500 text-lg leading-relaxed">
            Analyses pointues et veille stratégique sur l’actualité de la fintech. Comprenez les enjeux qui transforment l’économie mondiale.
          </p>
        </div>
        {canPublish && (
          <Button href="/dashboard/blogueur/publier?univers=Décryptages" variant="primary" className="bg-orange-500 hover:bg-orange-600 gap-2 shadow-orange-600/30">
            <Plus className="h-4 w-4" /> Publier un article ici
          </Button>
        )}
      </div>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl transform -rotate-1 scale-[1.01] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <Link href={`/decryptages/${featuredArticle.id}`}>
            <Card padding="none" className="relative flex flex-col lg:flex-row overflow-hidden border-transparent shadow-md hover:shadow-xl transition-all duration-500 rounded-3xl bg-white z-10">
              <div className="lg:w-2/5 p-8 lg:p-12 relative flex flex-col justify-between text-white min-h-[300px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={featuredArticle.image || "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=800&auto=format&fit=crop"} 
                  alt={featuredArticle.titre} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                
                <div className="relative z-10">
                  <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border-none self-start font-bold shadow-sm">
                    À la une
                  </Badge>
                </div>
                <div className="relative z-10 mt-10">
                  <Sparkles className="h-8 w-8 text-white/80 mb-4" />
                  <p className="text-white/90 font-medium text-sm tracking-wider uppercase mb-1 drop-shadow-sm">Dossier Spécial</p>
                  <p className="text-3xl font-display font-bold leading-tight drop-shadow-md">{featuredArticle.categorie}</p>
                </div>
              </div>
              
              <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-4">
                  <Clock className="h-4 w-4" />
                  <span>{featuredArticle.readTime} min de lecture</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span>{featuredArticle.publishedAt ? formatDate(featuredArticle.publishedAt) : "Récemment"}</span>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-secondary mb-4 leading-tight group-hover:text-orange-500 transition-colors duration-300">
                  {featuredArticle.titre}
                </h2>
                
                <p className="text-gray-500 text-lg mb-8 line-clamp-3 leading-relaxed">
                  {featuredArticle.resume}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {(featuredArticle.auteur || "B").charAt(0)}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-secondary">{featuredArticle.auteur || "BusinessCore"}</p>
                      <p className="text-sm text-gray-400">Auteur</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-orange-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
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
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const className = `px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? "bg-secondary text-white shadow-md shadow-secondary/20" : "bg-gray-50 text-gray-600 hover:text-secondary hover:bg-gray-100 hover:shadow-sm"}`;
          return (
            <Link key={tab.href} href={tab.href} className={className} aria-current={isActive ? "page" : undefined}>
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularArticles.map((a) => (
          <Link key={a.id} href={`/decryptages/${a.id}`}>
            <Card padding="none" className="h-full flex flex-col group border-gray-100 hover:border-accent-violet-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 rounded-2xl bg-white overflow-hidden">
              {a.image && (
                <div className="w-full h-48 relative overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.image} alt={a.titre} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-5">
                  <Badge variant="violet" className="font-bold shadow-sm">{a.categorie}</Badge>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                    <Clock className="h-3.5 w-3.5" />
                    {a.readTime} min
                  </div>
                </div>
              
              <h3 className="font-display font-bold text-secondary text-xl mb-3 leading-snug group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
                {a.titre}
              </h3>
              
              <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-1 line-clamp-3">
                {a.resume}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    {(a.auteur || "B").charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-secondary">{a.auteur || "BusinessCore"}</p>
                    <p className="text-xs text-gray-400">{a.publishedAt ? formatDate(a.publishedAt) : "Récemment"}</p>
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white text-gray-400 transition-colors duration-300">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

    </div>
  );
}
