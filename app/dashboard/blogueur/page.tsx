"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { useArticles } from "@/lib/article-context";
import { PenTool, Plus, Edit, Trash2, MessageCircle, Eye } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { formatDate } from "@/lib/mock-data";

export default function BlogueurDashboard() {
  const { currentUser } = useAuth();
  const { getArticlesByAuthorId, deleteArticle, getCommentCountByArticleId } = useArticles();

  if (!currentUser) return null;

  const myArticles = getArticlesByAuthorId(currentUser.id);

  // Total commentaires reçus sur tous les articles du blogueur
  const totalComments = myArticles.reduce(
    (acc, article) => acc + getCommentCountByArticleId(article.id),
    0
  );

  return (
    <div className="px-6 py-10 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <PenTool className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-secondary">Espace Blogueur</h1>
              <p className="text-gray-500">Bonjour, {currentUser.prenom} — gérez vos publications</p>
            </div>
          </div>
          <Button href="/dashboard/blogueur/publier" variant="primary" className="gap-2">
            <Plus className="h-4 w-4" /> Nouvelle Publication
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card padding="md" className="text-center hover:shadow-md transition-shadow">
            <div className="h-10 w-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-2">
              <PenTool className="h-5 w-5" />
            </div>
            <p className="text-3xl font-display font-bold text-secondary">{myArticles.length}</p>
            <p className="text-gray-500 text-sm mt-1">Articles publiés</p>
          </Card>

          <Card padding="md" className="text-center hover:shadow-md transition-shadow">
            <div className="h-10 w-10 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center mx-auto mb-2">
              <MessageCircle className="h-5 w-5" />
            </div>
            <p className="text-3xl font-display font-bold text-secondary">{totalComments}</p>
            <p className="text-gray-500 text-sm mt-1">Commentaires reçus</p>
          </Card>

          <Card padding="md" className="text-center hover:shadow-md transition-shadow">
            <div className="h-10 w-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Eye className="h-5 w-5" />
            </div>
            <p className="text-3xl font-display font-bold text-secondary">—</p>
            <p className="text-gray-500 text-sm mt-1">Vues totales</p>
          </Card>
        </div>

        {/* Liste articles */}
        <h2 className="text-xl font-bold text-secondary mb-4">Mes Articles</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {myArticles.length === 0 ? (
            <div className="p-12 text-center">
              <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <PenTool className="h-8 w-8 text-gray-300" />
              </div>
              <p className="text-gray-500 mb-4">Vous n&apos;avez pas encore publié d&apos;article.</p>
              <Button href="/dashboard/blogueur/publier" variant="outline">
                Publier mon premier article
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {myArticles.map(article => {
                const commentCount = getCommentCountByArticleId(article.id);
                return (
                  <div
                    key={article.id}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="violet" className="text-xs">{article.categorie}</Badge>
                        <span className="text-xs text-gray-400">{article.publishedAt ? formatDate(article.publishedAt) : "Récemment"}</span>
                        {/* Badge commentaires */}
                        <span className="flex items-center gap-1 text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
                          <MessageCircle className="h-3 w-3" />
                          {commentCount} commentaire{commentCount !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <Link
                        href={`/decryptages/${article.id}`}
                        className="text-base sm:text-lg font-bold text-secondary hover:text-primary transition-colors block mb-1 truncate"
                      >
                        {article.titre}
                      </Link>
                      <p className="text-sm text-gray-500 line-clamp-1">{article.resume}</p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        href={`/decryptages/${article.id}`}
                        className="gap-2 text-gray-600 hover:text-primary"
                        title="Voir l'article"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        href={`/dashboard/blogueur/publier?edit=${article.id}`}
                        className="gap-2 text-gray-600 hover:text-primary"
                      >
                        <Edit className="h-4 w-4" /> Éditer
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
                            deleteArticle(article.id);
                          }
                        }}
                        className="text-red-500 border-red-100 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
