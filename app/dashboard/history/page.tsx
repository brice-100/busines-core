"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { Card } from "@/components/ui/Card";
import { LogEvent } from "@/types";
import { Clock, Filter, User, Settings, CreditCard, Eye, LayoutDashboard } from "lucide-react";
import Image from "next/image";

export default function HistoryPage() {
  const { currentUser } = useAuth();
  const [logs, setLogs] = useState<LogEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("tous");

  useEffect(() => {
    if (!currentUser) return;
    const fetchLogs = async () => {
      try {
        const res = await fetch(`/api/logs?userId=${currentUser.id}`);
        if (res.ok) {
          const data = await res.json();
          setLogs(data);
        }
      } catch (error) {
        console.error("Erreur de chargement de l'historique:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, [currentUser]);

  const filteredLogs = logs.filter(
    (log) => filterType === "tous" || log.eventType === filterType
  );

  const getEventIcon = (type: string) => {
    switch (type) {
      case "connexion":
      case "deconnexion":
        return <User className="h-5 w-5 text-blue-500" />;
      case "mise_a_jour_profil":
        return <Settings className="h-5 w-5 text-orange-500" />;
      case "commentaire":
        return <CreditCard className="h-5 w-5 text-green-500" />;
      case "consultation":
        return <Eye className="h-5 w-5 text-purple-500" />;
      default:
        return <LayoutDashboard className="h-5 w-5 text-gray-500" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "connexion":
      case "deconnexion":
        return "bg-blue-50 border-blue-100";
      case "mise_a_jour_profil":
        return "bg-orange-50 border-orange-100";
      case "commentaire":
        return "bg-green-50 border-green-100";
      case "consultation":
        return "bg-purple-50 border-purple-100";
      default:
        return "bg-gray-50 border-gray-100";
    }
  };

  if (!currentUser) return null;

  return (
    <div className="px-4 py-8 lg:px-12 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-secondary flex items-center gap-3">
            <Clock className="h-8 w-8 text-primary" />
            Historique des Activités
          </h1>
          <p className="text-gray-500 mt-1">Retrouvez toutes vos actions récentes sur la plateforme.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-transparent text-sm font-medium text-secondary focus:outline-none"
          >
            <option value="tous">Tous les événements</option>
            <option value="connexion">Connexions</option>
            <option value="commentaire">Commentaires</option>
            <option value="mise_a_jour_profil">Profil</option>
            <option value="consultation">Consultations</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredLogs.length === 0 ? (
        <Card padding="lg" className="text-center flex flex-col items-center justify-center">
          <div className="h-32 w-32 relative mb-6 opacity-80">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              alt="Empty states illustration"
              fill
              className="object-cover rounded-full grayscale"
            />
          </div>
          <h3 className="text-xl font-bold text-secondary mb-2">Aucune activité trouvée</h3>
          <p className="text-gray-500 max-w-md">
            {filterType === "tous" 
              ? "Vous n'avez pas encore d'activité enregistrée sur la plateforme."
              : "Aucune activité ne correspond à ce filtre."}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className={`flex flex-col sm:flex-row gap-4 sm:items-center justify-between p-5 rounded-2xl border ${getEventColor(log.eventType)} transition-transform hover:-translate-y-1 hover:shadow-md duration-300`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white p-2 rounded-full shadow-sm">
                  {getEventIcon(log.eventType)}
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">{log.description}</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <span>{new Date(log.timestamp).toLocaleDateString("fr-FR", {
                      day: "numeric", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit"
                    })}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="uppercase font-medium">{log.eventType.replace(/_/g, " ")}</span>
                  </div>
                </div>
              </div>
              {log.metadata && (
                <div className="text-xs bg-white/60 px-3 py-1.5 rounded-lg border border-white/80 self-start sm:self-center">
                  Détails disponibles
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
