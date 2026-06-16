"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { LayoutDashboard, BookOpen, FileText, User, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { RoleBadge } from "@/components/ui/RoleBadge";
import { getInitials } from "@/lib/mock-data";

export default function DashboardPage() {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="px-6 py-10 lg:px-12">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-secondary">Dashboard</h1>
            <p className="text-gray-500 text-sm">Bienvenue, {currentUser.prenom} !</p>
          </div>
        </div>

        {/* Profil card */}
        <Card padding="md" className="mb-6 flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white font-display font-bold text-lg">
              {getInitials(currentUser.nom, currentUser.prenom)}
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-secondary">{currentUser.prenom} {currentUser.nom}</h2>
            <p className="text-sm text-gray-500">{currentUser.email}</p>
            <RoleBadge role={currentUser.role} isBanned={currentUser.isBanned} />
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Formations", value: "0", icon: BookOpen, color: "text-accent-green" },
            { label: "Articles lus", value: "0", icon: FileText, color: "text-accent-violet" },
            { label: "Exercices", value: "0", icon: TrendingUp, color: "text-accent-orange" },
            { label: "Profil", value: "100%", icon: User, color: "text-primary" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} padding="md" className="text-center">
                <Icon className={`h-6 w-6 mx-auto mb-2 ${s.color}`} />
                <p className="text-2xl font-display font-bold text-secondary">{s.value}</p>
                <p className="text-xs text-gray-400">{s.label}</p>
              </Card>
            );
          })}
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
          <p className="text-blue-600 text-sm font-medium">
            Bienvenue sur BusinessCore ! Explorez les univers depuis la barre latérale.
          </p>
        </div>
      </div>
    </div>
  );
}
