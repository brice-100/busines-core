"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useArticles } from "@/lib/article-context";
import { useAuth } from "@/lib/auth-context";
import { formatDate } from "@/lib/mock-data";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  MessageCircle,
  Send,
  Edit,
  Trash2,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RoleBadge } from "@/components/ui/RoleBadge";

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { getArticleById, deleteArticle, getCommentsByArticleId, addComment } = useArticles();
  const { currentUser } = useAuth();

  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const article = getArticleById(id);
  const comments = getCommentsByArticleId(id);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="h-10 w-10 text-gray-300" />
        </div>
        <h1 className="text-2xl font-display font-bold text-secondary mb-3">Article introuvable</h1>
        <p className="text-gray-500 mb-6">Cet article n&apos;existe pas ou a été supprimé.</p>
        <Button href="/decryptages" variant="primary">
          Retour aux Décryptages
        </Button>
      </div>
    );
  }

  const isAuthor = currentUser && (currentUser.id === article.auteurId);
  const isAdmin = currentUser?.role === "administrateur";
  const canEdit = isAuthor || isAdmin;

  const handleDelete = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      deleteArticle(article.id);
      router.push("/decryptages");
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setIsSubmitting(true);

    const auteurName = currentUser
      ? `${currentUser.prenom} ${currentUser.nom}`
      : "Visiteur anonyme";

    addComment(article.id, auteurName, commentText.trim(), currentUser?.id);
    setCommentText("");
    setIsSubmitting(false);
  };

  const initiales = article.auteur
    ? article.auteur.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "BC";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-12">

      {/* Bouton Retour */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-primary text-sm font-medium mb-8 transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Retour aux Décryptages
      </button>

      {/* Hero Image */}
      {article.image && (
        <div className="w-full h-[250px] md:h-[400px] rounded-[2rem] overflow-hidden mb-8 relative shadow-lg shadow-gray-200/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={article.image} 
            alt={article.titre} 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </div>
      )}

      {/* En-tête article */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="violet" className="font-bold">{article.categorie}</Badge>
          {article.featured && (
            <Badge className="bg-amber-50 text-amber-600 border-amber-100 font-bold">À la une</Badge>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-secondary leading-tight mb-6">
          {article.titre}
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed mb-6 border-l-4 border-accent-violet pl-4 italic">
          {article.resume}
        </p>

        {/* Métadonnées + actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-y border-gray-100">
          <div className="flex items-center gap-4">
            {/* Avatar auteur */}
            <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-accent-violet to-purple-400 flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
              {initiales}
            </div>
            <div>
              <p className="font-bold text-secondary">{article.auteur || "BusinessCore"}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {article.publishedAt ? formatDate(article.publishedAt) : "Récemment"}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime || 5} min de lecture
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {comments.length} commentaire{comments.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Boutons auteur/admin */}
          {canEdit && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                href={`/dashboard/blogueur/publier?edit=${article.id}`}
                className="gap-2 text-gray-600 hover:text-primary"
              >
                <Edit className="h-4 w-4" /> Modifier
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="text-red-500 border-red-100 hover:bg-red-50 gap-2"
              >
                <Trash2 className="h-4 w-4" /> Supprimer
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Contenu de l'article */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 mb-10">
        {article.contenu ? (
          <div className="prose prose-slate max-w-none">
            {article.contenu.split("\n").map((paragraph, i) =>
              paragraph.trim() ? (
                <p key={i} className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
                  {paragraph}
                </p>
              ) : (
                <br key={i} />
              )
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 italic">
              Le contenu complet de cet article n&apos;est pas encore disponible.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Résumé : {article.resume}
            </p>
          </div>
        )}
      </div>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {article.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Section Commentaires */}
      <div className="mt-4">
        <h2 className="text-2xl font-display font-bold text-secondary mb-6 flex items-center gap-3">
          <MessageCircle className="h-6 w-6 text-accent-violet" />
          Commentaires
          {comments.length > 0 && (
            <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
              {comments.length}
            </span>
          )}
        </h2>

        {/* Formulaire de commentaire */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          {currentUser ? (
            <form onSubmit={handleComment} className="space-y-4">
              <div className="flex items-start gap-3">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0 ${
                  currentUser.role === "administrateur"
                    ? "bg-gradient-to-tr from-violet-600 to-purple-400"
                    : currentUser.role === "blogueur"
                    ? "bg-gradient-to-tr from-blue-500 to-blue-400"
                    : "bg-gradient-to-tr from-gray-500 to-gray-400"
                }`}>
                  {currentUser.prenom[0]}{currentUser.nom[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-secondary">
                      {currentUser.prenom} {currentUser.nom}
                    </span>
                    <RoleBadge role={currentUser.role} />
                  </div>
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Partagez votre avis sur cet article..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-secondary text-sm font-medium outline-none focus:border-accent-violet focus:ring-2 focus:ring-accent-violet/20 focus:bg-white transition-all resize-none min-h-[100px]"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                  className="gap-2 bg-accent-violet hover:bg-violet-700 shadow-violet-600/20"
                >
                  <Send className="h-4 w-4" /> Publier le commentaire
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4">
              <User className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm mb-3">
                Connectez-vous pour laisser un commentaire.
              </p>
              <div className="flex items-center justify-center gap-3">
                <Button href="/login" variant="outline" size="sm">Se connecter</Button>
                <Button href="/register" variant="primary" size="sm">S&apos;inscrire</Button>
              </div>
            </div>
          )}
        </div>

        {/* Liste des commentaires */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <MessageCircle className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Aucun commentaire pour le moment. Soyez le premier !</p>
            </div>
          ) : (
            comments.slice().reverse().map(comment => {
              const commentInitials = comment.auteur
                .split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
              return (
                <div key={comment.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-gray-400 to-gray-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {commentInitials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-secondary text-sm">{comment.auteur}</p>
                        <p className="text-xs text-gray-400">{formatDate(comment.date)}</p>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{comment.contenu}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Navigation vers d'autres articles */}
      <div className="mt-12 pt-8 border-t border-gray-100 text-center">
        <Link
          href="/decryptages"
          className="inline-flex items-center gap-2 text-accent-violet font-semibold hover:gap-4 transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4" /> Voir tous les articles
        </Link>
      </div>

    </div>
  );
}
