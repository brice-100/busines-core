"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useArticles } from "@/lib/article-context";
import { Card } from "@/components/ui/Card";
import { RoleBadge } from "@/components/ui/RoleBadge";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getInitials, formatDate } from "@/lib/mock-data";
import { LogEvent } from "@/types";
import {
  BookOpen, FileText, TrendingUp, User,
  Activity, History, Compass, Briefcase,
  Sparkles, Users, ArrowRight,
  ShieldCheck, Bell, Trash2, Edit, CheckCircle, XCircle,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import Link from "next/link";

// Données illustratives de l'activité de lecture (7 derniers jours)
const activityData = [
  { name: "Lun", articles: 2 },
  { name: "Mar", articles: 4 },
  { name: "Mer", articles: 1 },
  { name: "Jeu", articles: 3 },
  { name: "Ven", articles: 5 },
  { name: "Sam", articles: 2 },
  { name: "Dim", articles: 3 },
];

// Accès rapide aux modules
const quickAccess = [
  { label: "Explorer", subtitle: "Fintech & Monnaie", href: "/explorer", icon: Compass, color: "bg-blue-50 text-blue-600" },
  { label: "Formations", subtitle: "Cours & Établissements", href: "/formations", icon: BookOpen, color: "bg-violet-50 text-violet-600" },
  { label: "Décryptages", subtitle: "Analyser & Comprendre", href: "/decryptages", icon: TrendingUp, color: "bg-green-50 text-green-600" },
  { label: "Carrières", subtitle: "Métiers & Débouchés", href: "/carrieres", icon: Briefcase, color: "bg-orange-50 text-orange-600" },
  { label: "Innovation", subtitle: "Startups & Tendances", href: "/innovation", icon: Sparkles, color: "bg-rose-50 text-rose-600" },
  { label: "Juniors", subtitle: "Par niveau scolaire", href: "/juniors", icon: Users, color: "bg-cyan-50 text-cyan-600" },
];

export default function DashboardPage() {
  const { currentUser, getAllUsers, toggleBanStatus } = useAuth();
  const { articles, deleteArticle, notifications, markNotificationRead } = useArticles();

  const [recentLogs, setRecentLogs] = useState<LogEvent[]>([]);
  const [activeTab, setActiveTab] = useState<"articles" | "users" | "notifications">("articles");
  const [users, setUsers] = useState(() => getAllUsers());

  const isAdmin = currentUser?.role === "administrateur";
  const isBlogueur = currentUser?.role === "blogueur";
  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!currentUser) return;
    const fetchLogs = async () => {
      try {
        const res = await fetch(`/api/logs?userId=${currentUser.id}`);
        if (res.ok) {
          const data = await res.json();
          setRecentLogs(data.slice(0, 5));
        }
      } catch (error) {
        console.error("Erreur log", error);
      }
    };
    fetchLogs();
  }, [currentUser]);

  const handleToggleBan = (userId: string) => {
    toggleBanStatus(userId);
    setUsers(getAllUsers());
  };

  if (!currentUser) return null;

  return (
    <div className="px-4 py-8 lg:px-10 max-w-6xl mx-auto space-y-8">

      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden">
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white font-display font-bold text-xl">
                {getInitials(currentUser.nom, currentUser.prenom)}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-secondary">
              Bonjour, {currentUser.prenom} 👋
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Bienvenue sur <span className="font-semibold text-primary">BusinessCore</span> — votre espace personnel.
            </p>
          </div>
        </div>
        <RoleBadge role={currentUser.role} isBanned={currentUser.isBanned} />
      </div>

      {/* ── STATS RAPIDES ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Articles lus", value: "12", icon: FileText, color: "text-violet-500", bg: "bg-violet-50" },
          { label: "Formations", value: "3", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Connexions", value: recentLogs.filter((l) => l.eventType === "connexion").length.toString() || "0", icon: Activity, color: "text-green-500", bg: "bg-green-50" },
          { label: "Profil", value: currentUser.avatar ? "100%" : "75%", icon: User, color: "text-orange-500", bg: "bg-orange-50" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} padding="md" className="flex flex-col items-center text-center gap-2">
              <div className={`${s.bg} p-3 rounded-xl`}>
                <Icon className={`h-6 w-6 ${s.color}`} />
              </div>
              <p className="text-2xl font-display font-bold text-secondary">{s.value}</p>
              <p className="text-xs text-gray-400 leading-tight">{s.label}</p>
            </Card>
          );
        })}
      </div>

      {/* ── GRAPHIQUE + ACTIVITÉ RÉCENTE ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-secondary flex items-center gap-2">
              <Activity className="h-5 w-5 text-violet-500" />
              Activité de lecture (7 jours)
            </h3>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} allowDecimals={false} width={30} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  formatter={(value) => [value, "Articles lus"]}
                />
                <Bar dataKey="articles" fill="#7C3AED" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Fil d'activité récente */}
        <Card padding="lg" className="flex flex-col">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-lg text-secondary flex items-center gap-2">
              <History className="h-5 w-5 text-gray-400" />
              Activité récente
            </h3>
            <Link href="/dashboard/history" className="text-primary text-xs font-medium hover:underline flex items-center gap-1">
              Tout voir <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="flex-1 space-y-3">
            {recentLogs.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-6">Aucune activité récente enregistrée.</p>
            ) : (
              recentLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 text-sm pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-primary/30 flex-shrink-0"></span>
                  <div className="flex-1 min-w-0">
                    <p className="text-secondary font-medium leading-tight truncate">{log.description}</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {new Date(log.timestamp).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <Link href="/dashboard/history" className="mt-4 w-full text-center text-xs text-gray-400 hover:text-primary transition-colors">
            Voir l'historique complet →
          </Link>
        </Card>
      </div>

      {/* ── ACCÈS RAPIDE AUX MODULES ── */}
      <div>
        <h2 className="font-bold text-xl text-secondary mb-4 flex items-center gap-2">
          <Compass className="h-5 w-5 text-primary" />
          Accès rapide aux modules
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickAccess.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="group flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-300 text-center"
              >
                <div className={`${item.color} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-secondary text-sm leading-tight">{item.label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-tight hidden md:block">{item.subtitle}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── LIEN VERS PROFIL ── */}
      <Card padding="md" className="flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-primary-50 to-violet-50 border-primary/10">
        <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
          <User className="h-6 w-6 text-white" />
        </div>
        <div className="text-center sm:text-left flex-1">
          <p className="font-semibold text-secondary">Complétez votre profil</p>
          <p className="text-sm text-gray-500">Ajoutez votre photo et mettez à jour vos informations.</p>
        </div>
        <Link href="/dashboard/profile" className="flex-shrink-0 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors">
          Mon profil →
        </Link>
      </Card>

      {/* ══════════════════════════════════════════════
          ── SECTION ADMINISTRATION (Admins seulement) ──
          ══════════════════════════════════════════════ */}
      {isAdmin && (
        <div className="pt-4 border-t-2 border-dashed border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-secondary">Administration</h2>
                <p className="text-gray-500 text-sm">Vue d'ensemble de la plateforme</p>
              </div>
            </div>
            <Button href="/dashboard/blogueur/publier" variant="primary" className="bg-violet-600 hover:bg-violet-700 shadow-violet-600/30">
              Publier un article
            </Button>
          </div>

          {/* Onglets Admin */}
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

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[300px]">
            {/* Articles */}
            {activeTab === "articles" && (
              <div className="divide-y divide-gray-100">
                {articles.map((article) => (
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { if (confirm("Supprimer cet article ?")) deleteArticle(article.id); }}
                        className="text-red-500 border-red-100 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {articles.length === 0 && <div className="p-8 text-center text-gray-500">Aucun article publié.</div>}
              </div>
            )}

            {/* Utilisateurs */}
            {activeTab === "users" && (
              <div className="divide-y divide-gray-100">
                {users.map((u) => (
                  <div key={u.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm text-white ${u.isBanned ? "bg-red-400" : "bg-gray-400"}`}>
                        {u.prenom[0]}{u.nom[0]}
                      </div>
                      <div>
                        <p className="font-bold text-secondary">{u.prenom} {u.nom}</p>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <RoleBadge role={u.role} isBanned={u.isBanned} />
                      {u.id !== currentUser.id && u.role !== "administrateur" && (
                        <button
                          onClick={() => handleToggleBan(u.id)}
                          className={`text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${u.isBanned ? "bg-green-50 text-green-600 hover:bg-green-100" : "bg-red-50 text-red-600 hover:bg-red-100"}`}
                        >
                          {u.isBanned ? <><CheckCircle className="h-4 w-4" /> Débannir</> : <><XCircle className="h-4 w-4" /> Bannir</>}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <div className="divide-y divide-gray-100">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-4 sm:p-6 flex flex-col sm:flex-row items-start justify-between gap-4 transition-colors ${!n.read ? "bg-violet-50/50" : ""}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {!n.read && <span className="h-2 w-2 rounded-full bg-violet-600"></span>}
                        <p className="font-bold text-secondary">{n.title}</p>
                        <span className="text-xs text-gray-400">{formatDate(n.date)}</span>
                      </div>
                      <p className="text-sm text-gray-600">{n.message}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {n.link && <Link href={n.link} className="text-sm font-semibold text-violet-600 hover:text-violet-700">Voir</Link>}
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
      )}

      {/* ── SECTION BLOGUEUR (Blogueurs seulement) ── */}
      {isBlogueur && (
        <div className="pt-4 border-t-2 border-dashed border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-secondary">Mes Publications</h2>
                <p className="text-gray-500 text-sm">Gérez vos articles publiés</p>
              </div>
            </div>
            <Button href="/dashboard/blogueur/publier" variant="primary" className="bg-blue-600 hover:bg-blue-700">
              Publier un article
            </Button>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {articles.filter((a) => a.auteurId === currentUser.id).map((article) => (
                <div key={article.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="violet" className="text-xs">{article.categorie}</Badge>
                      <span className="text-xs text-gray-400">{formatDate(article.publishedAt)}</span>
                    </div>
                    <Link href={`/decryptages/${article.id}`} className="text-lg font-bold text-secondary hover:text-primary transition-colors block">
                      {article.titre}
                    </Link>
                  </div>
                  <Button variant="outline" size="sm" href={`/dashboard/blogueur/publier?edit=${article.id}`} className="gap-2 text-gray-600 hover:text-primary">
                    <Edit className="h-4 w-4" /> Modifier
                  </Button>
                </div>
              ))}
              {articles.filter((a) => a.auteurId === currentUser.id).length === 0 && (
                <div className="p-8 text-center text-gray-500">Vous n'avez pas encore publié d'articles.</div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
