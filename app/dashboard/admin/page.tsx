"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useArticles } from "@/lib/article-context";
import { ShieldCheck, Users, FileText, Bell, Trash2, Edit, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { formatDate } from "@/lib/mock-data";
import { RoleBadge } from "@/components/ui/RoleBadge";

export default function AdminDashboard() {
  const { currentUser, getAllUsers, toggleBanStatus } = useAuth();
  const { articles, deleteArticle, notifications, markNotificationRead } = useArticles();
  
  const [activeTab, setActiveTab] = useState<"articles" | "users" | "notifications">("articles");
  const [users, setUsers] = useState(getAllUsers());

  if (!currentUser || currentUser.role !== "administrateur") return null;

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const handleToggleBan = (userId: string) => {
    toggleBanStatus(userId);
    setUsers(getAllUsers()); // Rafraîchir la liste après modification
  };

  return (
    <div className="px-6 py-10 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-secondary">Administration</h1>
              <p className="text-gray-500">Vue d'ensemble de la plateforme</p>
            </div>
          </div>
          <Button href="/dashboard/blogueur/publier" variant="primary" className="bg-violet-600 hover:bg-violet-700 shadow-violet-600/30">
            Publier un article
          </Button>
        </div>

        {/* Onglets */}
        <div className="flex space-x-2 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("articles")}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${activeTab === "articles" ? "border-violet-600 text-violet-600" : "border-transparent text-gray-500 hover:text-secondary hover:border-gray-300"}`}
          >
            <FileText className="h-4 w-4" /> Articles ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${activeTab === "users" ? "border-violet-600 text-violet-600" : "border-transparent text-gray-500 hover:text-secondary hover:border-gray-300"}`}
          >
            <Users className="h-4 w-4" /> Utilisateurs ({users.length})
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${activeTab === "notifications" ? "border-violet-600 text-violet-600" : "border-transparent text-gray-500 hover:text-secondary hover:border-gray-300"}`}
          >
            <Bell className="h-4 w-4" /> Notifications
            {unreadNotifsCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-1">{unreadNotifsCount}</span>
            )}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
          
          {/* TAB: ARTICLES */}
          {activeTab === "articles" && (
            <div className="divide-y divide-gray-100">
              {articles.map(article => (
                <div key={article.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="violet" className="text-xs">{article.categorie}</Badge>
                      <span className="text-xs text-gray-400">Par {article.auteur} • {formatDate(article.publishedAt)}</span>
                    </div>
                    <Link href={`/decryptages/${article.id}`} className="text-lg font-bold text-secondary hover:text-primary transition-colors block mb-1">
                      {article.titre}
                    </Link>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" href={`/dashboard/blogueur/publier?edit=${article.id}`} className="gap-2 text-gray-600 hover:text-primary">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      if (confirm("Supprimer cet article ?")) {
                        deleteArticle(article.id);
                      }
                    }} className="text-red-500 border-red-100 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {articles.length === 0 && <div className="p-8 text-center text-gray-500">Aucun article publié.</div>}
            </div>
          )}

          {/* TAB: USERS */}
          {activeTab === "users" && (
            <div className="divide-y divide-gray-100">
              {users.map(u => (
                <div key={u.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm text-white ${u.isBanned ? 'bg-red-400' : 'bg-gray-400'}`}>
                      {u.prenom[0]}{u.nom[0]}
                    </div>
                    <div>
                      <p className="font-bold text-secondary">{u.prenom} {u.nom}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <RoleBadge role={u.role} isBanned={u.isBanned} />
                    
                    {u.id !== currentUser.id && (
                      <button 
                        onClick={() => handleToggleBan(u.id)}
                        className={`text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                          u.isBanned 
                            ? "bg-green-50 text-green-600 hover:bg-green-100" 
                            : "bg-red-50 text-red-600 hover:bg-red-100"
                        }`}
                      >
                        {u.isBanned ? <><CheckCircle className="h-4 w-4" /> Débannir</> : <><XCircle className="h-4 w-4" /> Bannir</>}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="divide-y divide-gray-100">
              {notifications.map(n => (
                <div key={n.id} className={`p-4 sm:p-6 flex flex-col sm:flex-row items-start justify-between gap-4 transition-colors ${!n.read ? 'bg-violet-50/50' : ''}`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {!n.read && <span className="h-2 w-2 rounded-full bg-violet-600"></span>}
                      <p className="font-bold text-secondary">{n.title}</p>
                      <span className="text-xs text-gray-400">{formatDate(n.date)}</span>
                    </div>
                    <p className="text-sm text-gray-600">{n.message}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {n.link && (
                      <Link href={n.link} className="text-sm font-semibold text-violet-600 hover:text-violet-700">
                        Voir
                      </Link>
                    )}
                    {!n.read && (
                      <button onClick={() => markNotificationRead(n.id)} className="text-sm text-gray-500 hover:text-gray-700">
                        Marquer lu
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {notifications.length === 0 && <div className="p-8 text-center text-gray-500">Aucune notification.</div>}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
