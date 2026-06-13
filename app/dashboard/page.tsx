"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, BookOpen, FileText, User, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getInitials } from "@/lib/mock-data";

export default function DashboardPage() {
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

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
            <Badge
              variant={currentUser.role === "administrateur" ? "violet" : currentUser.role === "utilisateur" ? "primary" : "gray"}
              className="mt-1"
            >
              {currentUser.role}
            </Badge>
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

        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center">
          <p className="text-gray-400 text-sm">
            Dashboard complet en développement — branche{" "}
            <code className="bg-gray-100 px-2 py-0.5 rounded text-primary text-xs">feature/dashboard</code>
          </p>
        </div>
      </div>
    </div>
  );
}
