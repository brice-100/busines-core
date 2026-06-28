"use client";

import React from 'react';
import Link from 'next/link';
import { Menu, X, Bell, LogOut, Bookmark } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '@/lib/auth-context';
import { useArticles } from '@/lib/article-context';
import { usePinnedArticles } from '@/lib/hooks/usePinnedArticles';
import { GlobalSearch } from '@/components/ui/GlobalSearch';

interface NavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function Navbar({ isSidebarOpen, onToggleSidebar }: NavbarProps) {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const { notifications } = useArticles();

  const unreadCount = currentUser?.role === "administrateur"
    ? notifications.filter(n => !n.read).length
    : 0;

  const { pinnedCount } = usePinnedArticles();

  const dashboardHref = currentUser?.role === "administrateur"
    ? "/dashboard/admin"
    : currentUser?.role === "blogueur"
    ? "/dashboard/blogueur"
    : "/dashboard";

  const initials = currentUser
    ? `${currentUser.prenom[0] ?? ""}${currentUser.nom[0] ?? ""}`.toUpperCase()
    : "?";

  return (
    <header className=" sticky top-0 z-20 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
      <div className="flex items-center justify-between h-20 px-6 md:px-12 lg:px-20">

        {/* Menu Hamburger pour mobile */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 -ml-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Menu"
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Barre de Recherche Globale */}
        <GlobalSearch />

        <div className="flex-1 md:hidden"></div>

        {/* Section Droite */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          {isAuthenticated && currentUser ? (
            <>
              {/* Cloche de notifications (admin uniquement) */}
              {currentUser.role === "administrateur" && (
                <Link
                  href="/dashboard/admin"
                  className="relative p-2.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                  title="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-4 w-4 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-white">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Bouton épingles pour tous les utilisateurs connectés */}
              <Link
                href="/dashboard/epingles"
                className="relative p-2.5 rounded-full text-gray-500 hover:bg-amber-50 hover:text-amber-500 transition-colors"
                title="Mes articles épinglés"
              >
                <Bookmark className={`h-5 w-5 ${pinnedCount > 0 ? 'fill-amber-400 text-amber-500' : ''}`} />
                {pinnedCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-4 w-4 flex items-center justify-center text-[10px] font-bold text-white bg-amber-500 rounded-full border-2 border-white">
                    {pinnedCount > 9 ? "9+" : pinnedCount}
                  </span>
                )}
              </Link>

              <div className="h-8 w-px bg-gray-200 hidden sm:block mx-1"></div>

              {/* Avatar + nom + rôle */}
              <Link href={dashboardHref} className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all group">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center shadow-sm font-bold text-sm text-white ${
                  currentUser.role === "administrateur"
                    ? "bg-linear-to-tr from-violet-600 to-purple-400"
                    : currentUser.role === "blogueur"
                    ? "bg-linear-to-tr from-blue-500 to-blue-400"
                    : "bg-linear-to-tr from-gray-500 to-gray-400"
                }`}>
                  {initials}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-bold text-secondary leading-tight">{currentUser.prenom}</p>
                  <p className="text-xs text-gray-500 capitalize leading-tight">{currentUser.role}</p>
                </div>
              </Link>

              {/* Bouton Déconnexion */}
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="Se déconnecter"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                href="/login"
                className="hidden sm:flex font-bold text-[#1e293b] hover:bg-slate-50 px-5 py-3 rounded-full"
              >
                Se connecter
              </Button>
              <Button
                variant="primary"
                href="/register"
                className="rounded-full bg-[#2563eb] hover:bg-blue-700 text-white shadow-none px-8 py-3.5 font-bold"
              >
                S'inscrire
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}