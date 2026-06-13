"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Compass,
  BookOpen,
  FileText,
  Dumbbell,
  Users,
  Briefcase,
  Lightbulb,
  Info,
  LayoutDashboard,
  Bot,
  LogIn,
  Eye,
  LogOut,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  User,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/explorer", label: "Explorer", icon: Compass },
  { href: "/formations", label: "Formations", icon: BookOpen },
  { href: "/decryptages", label: "Décryptages", icon: FileText },
  { href: "/pratiques", label: "Pratiques", icon: Dumbbell },
  { href: "/juniors", label: "Juniors", icon: Users },
  { href: "/carrieres", label: "Carrières", icon: Briefcase },
  { href: "/innovation", label: "Innovation", icon: Lightbulb },
  { href: "/adja", label: "Adja IA", icon: Bot },
  { href: "/a-propos", label: "À propos", icon: Info },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-secondary flex flex-col z-40",
        "transition-all duration-300 ease-in-out shadow-sidebar",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-glow flex-shrink-0">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div className="overflow-hidden">
              <span className="font-display font-bold text-white text-sm leading-tight block">
                Business
              </span>
              <span className="font-display font-bold text-primary-300 text-sm leading-tight block">
                Core
              </span>
            </div>
          </Link>
        )}
        {collapsed && (
          <Link
            href="/"
            className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center mx-auto"
          >
            <TrendingUp className="h-4 w-4 text-white" />
          </Link>
        )}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Réduire la sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="absolute -right-3 top-6 h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-md hover:bg-primary-700 transition-colors"
          aria-label="Étendre la sidebar"
        >
          <ChevronRight className="h-3 w-3 text-white" />
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {!collapsed && (
          <p className="px-3 pb-2 text-xs font-semibold text-white/30 uppercase tracking-wider">
            Navigation
          </p>
        )}
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  "h-4.5 w-4.5 flex-shrink-0",
                  isActive ? "text-white" : "text-white/60 group-hover:text-white"
                )}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {isActive && !collapsed && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/70" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Dashboard link for authenticated users */}
      {isAuthenticated && !collapsed && (
        <div className="px-2 pb-2">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
              pathname === "/dashboard"
                ? "bg-primary text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            )}
          >
            <LayoutDashboard className="h-4.5 w-4.5" />
            <span>Dashboard</span>
          </Link>
        </div>
      )}

      {/* User profile + auth buttons */}
      <div className="border-t border-white/10 p-3 space-y-2">
        {isAuthenticated && currentUser ? (
          <>
            {!collapsed && (
              <div className="flex items-center gap-3 px-2 py-2">
                <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-white text-xs font-medium truncate">
                    {currentUser.prenom} {currentUser.nom}
                  </p>
                  <p className="text-white/50 text-xs truncate capitalize">
                    {currentUser.role}
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium",
                "text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-colors"
              )}
            >
              <LogOut className="h-4 w-4 flex-shrink-0" />
              {!collapsed && "Déconnexion"}
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium",
                "bg-primary text-white hover:bg-primary-700 transition-colors"
              )}
            >
              <LogIn className="h-4 w-4 flex-shrink-0" />
              {!collapsed && "Connexion"}
            </Link>
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium",
                "text-white/60 hover:bg-white/10 hover:text-white transition-colors"
              )}
            >
              <Eye className="h-4 w-4 flex-shrink-0" />
              {!collapsed && "Mode visiteur"}
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}
