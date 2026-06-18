"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Bell, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '@/lib/auth-context';
import { useArticles } from '@/lib/article-context';

interface NavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function Navbar({ isSidebarOpen, onToggleSidebar }: NavbarProps) {
  const [query, setQuery] = useState("");

  const { isAuthenticated, currentUser, logout } = useAuth();
  const { notifications } = useArticles();

  const unreadCount = currentUser?.role === "administrateur"
    ? notifications.filter(n => !n.read).length
    : 0;

  const dashboardHref = currentUser?.role === "administrateur"
    ? "/dashboard/admin"
    : currentUser?.role === "blogueur"
    ? "/dashboard/blogueur"
    : "/dashboard";

  const initials = currentUser
    ? `${currentUser.prenom[0] ?? ""}${currentUser.nom[0] ?? ""}`.toUpperCase()
    : "?";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

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

        {/* Barre de Recherche */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-auto relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un sujet, une formation, un métier..."
            className="w-full pl-11 pr-4 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all shadow-sm"
            aria-label="Recherche"
          />
        </form>

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