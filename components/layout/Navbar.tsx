"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Bell, User, Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";

interface NavbarProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

export function Navbar({ onMenuClick, isMenuOpen }: NavbarProps) {
  const { currentUser, isAuthenticated } = useAuth();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/explorer?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
      <div className="flex items-center justify-between h-20 px-6 lg:px-10">
        
        {/* Menu Hamburger pour mobile */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Barre de Recherche (centrée sur desktop, cachée sur petit mobile) */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-auto relative group ml-4 lg:ml-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un sujet, une formation, un métier..."
            className="w-full pl-11 pr-4 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-secondary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all shadow-sm"
            aria-label="Recherche"
          />
        </form>

        {/* Espace vide pour garder l'alignement flex si pas de recherche */}
        <div className="flex-1 md:hidden"></div>

        {/* Section Droite : Notifications / Profil ou Authentification */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          {isAuthenticated && currentUser ? (
            <>
              <button className="relative p-2.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
              </button>
              
              <div className="h-8 w-[1px] bg-gray-200 hidden sm:block mx-1"></div>

              <Link href="/dashboard" className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all group">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-primary-400 flex items-center justify-center shadow-sm">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-bold text-secondary leading-tight">{currentUser.prenom}</p>
                  <p className="text-xs text-gray-500 capitalize leading-tight">{currentUser.role}</p>
                </div>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                href="/login" 
                className="hidden sm:flex font-bold text-secondary hover:bg-gray-50 px-5"
              >
                Se connecter
              </Button>
              <Button 
                variant="primary" 
                href="/register" 
                className="rounded-full shadow-md shadow-primary/20 px-6 font-bold"
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
