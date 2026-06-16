"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useArticles } from "@/lib/article-context";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowLeft, Save } from "lucide-react";

export default function PublierPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const universParam = searchParams.get("univers");
  
  const { currentUser } = useAuth();
  const { articles, publishArticle, updateArticle } = useArticles();

  const [titre, setTitre] = useState("");
  const [resume, setResume] = useState("");
  const [contenu, setContenu] = useState("");
  const [categorie, setCategorie] = useState(universParam || "Décryptages");
  const [readTime, setReadTime] = useState(5);

  useEffect(() => {
    if (editId) {
      const articleToEdit = articles.find(a => a.id === editId);
      if (articleToEdit) {
        if (articleToEdit.auteurId !== currentUser?.id && currentUser?.role !== "administrateur") {
          alert("Vous n'avez pas l'autorisation de modifier cet article.");
          router.push("/dashboard");
          return;
        }
        setTitre(articleToEdit.titre);
        setResume(articleToEdit.resume);
        setContenu(articleToEdit.contenu || "");
        setCategorie(articleToEdit.categorie);
        setReadTime(articleToEdit.readTime || 5);
      }
    }
  }, [editId, articles, currentUser, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const data = {
      titre,
      resume,
      contenu,
      categorie,
      tags: [],
      auteur: `${currentUser.prenom} ${currentUser.nom}`,
      auteurId: currentUser.id,
      readTime
    };

    if (editId) {
      updateArticle(editId, data);
      alert("Article mis à jour avec succès.");
    } else {
      publishArticle(data);
      alert("Article publié avec succès.");
    }

    if (currentUser.role === "administrateur") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/blogueur");
    }
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 lg:px-12">
      <div className="mb-8">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-primary flex items-center gap-2 text-sm font-medium mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Retour
        </button>
        <h1 className="text-3xl font-display font-bold text-secondary">
          {editId ? "Modifier l'article" : "Nouvelle publication"}
        </h1>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Titre de l'article"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Saisissez un titre accrocheur"
            required
            fullWidth
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-secondary">Univers (Catégorie)</label>
              <select
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-secondary font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                required
              >
                <option value="Décryptages">Décryptages</option>
                <option value="Finance africaine">Finance africaine</option>
                <option value="Systèmes monétaires">Systèmes monétaires</option>
                <option value="Tech & Crypto">Tech & Crypto</option>
                <option value="Formations">Formations</option>
              </select>
            </div>
            
            <Input
              label="Temps de lecture estimé (minutes)"
              type="number"
              min={1}
              value={readTime}
              onChange={(e) => setReadTime(parseInt(e.target.value))}
              required
              fullWidth
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-secondary">Résumé (Introduction)</label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Un bref résumé de l'article..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-secondary font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm min-h-[100px] resize-y"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-secondary">Contenu</label>
            <textarea
              value={contenu}
              onChange={(e) => setContenu(e.target.value)}
              placeholder="Écrivez le contenu de votre article ici..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-secondary font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm min-h-[300px] resize-y"
              required
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-4">
            <Button variant="ghost" onClick={() => router.back()} type="button">
              Annuler
            </Button>
            <Button variant="primary" type="submit" className="gap-2">
              <Save className="h-4 w-4" /> {editId ? "Enregistrer les modifications" : "Publier l'article"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
