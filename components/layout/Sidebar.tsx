"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Compass,
  BookOpen,
  Clock,
  PhoneCall,
  User,
  Briefcase,
  LineChart,
  Info,
  LayoutDashboard,
  LogOut,
  X
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: "/", label: "Accueil", desc: "", icon: Home },
  { href: "/explorer", label: "Explorer", desc: "Fintech & Monnaie", icon: Compass },
  { href: "/formations", label: "Formations", desc: "Cours & Établissements", icon: BookOpen },
  { href: "/decryptages", label: "Décryptages", desc: "Comprendre & Analyser", icon: Clock },
  { href: "/pratiques", label: "Pratiques", desc: "Simuler & Apprendre", icon: PhoneCall },
  { href: "/juniors", label: "Juniors", desc: "Par niveau scolaire", icon: User },
  { href: "/carrieres", label: "Carrières", desc: "Métiers & Débouchés", icon: Briefcase },
  { href: "/innovation", label: "Innovation", desc: "Startups & Tendances", icon: LineChart },
  { href: "/a-propos", label: "À propos", desc: "Notre mission", icon: Info },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {/* Overlay sur mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar (Drawer sur mobile, Fixe sur desktop) */}
      <aside 
        className={cn(
          "fixed left-0 top-0 h-screen w-72 bg-[#f8fafc] flex flex-col z-50 border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        
        {/* En-tête avec Logo et Bouton Fermer (Mobile) */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100 lg:border-none lg:pb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-primary flex-shrink-0">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-primary text-primary">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <circle cx="12" cy="12" r="3" fill="white"></circle>
              </svg>
            </div>
            <div>
              <span className="font-display font-bold text-secondary text-xl leading-tight block">
                BusinessCore
              </span>
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider block mt-0.5">
                Fintech | Finance | Innovation
              </span>
            </div>
          </Link>
          
          {/* Bouton de fermeture sur mobile uniquement */}
          <button onClick={onClose} className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-2 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            if (isActive) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl bg-blue-100 text-primary transition-all duration-300"
                >
                  <Icon className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="font-bold text-sm">{item.label}</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-start gap-4 px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
              >
                <Icon className="h-5 w-5 flex-shrink-0 text-gray-500 group-hover:text-primary mt-0.5 transition-colors" />
                <div>
                  <span className="font-bold text-sm text-secondary block group-hover:text-primary transition-colors">{item.label}</span>
                  {item.desc && (
                    <span className="text-xs text-gray-500 block mt-0.5">{item.desc}</span>
                  )}
                </div>
              </Link>
            );
          })}

          {/* Lien Dashboard sécurisé */}
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className={cn(
                "flex items-start gap-4 px-4 py-2.5 rounded-xl transition-all duration-300 group mt-4",
                pathname === "/dashboard"
                  ? "bg-blue-100 text-primary font-bold"
                  : "hover:bg-gray-100"
              )}
            >
              <LayoutDashboard className={cn("h-5 w-5 flex-shrink-0 mt-0.5", pathname === "/dashboard" ? "text-primary" : "text-gray-500 group-hover:text-primary")} />
              <div>
                <span className={cn("text-sm block transition-colors", pathname === "/dashboard" ? "text-primary font-bold" : "font-bold text-secondary group-hover:text-primary")}>Dashboard</span>
                <span className="text-xs text-gray-500 block mt-0.5">Votre espace personnel</span>
              </div>
            </Link>
          )}
        </nav>

        {/* Boutons d'Action Inférieurs */}
        <div className="p-6 mt-auto space-y-3 bg-[#f8fafc]">
          {isAuthenticated && currentUser ? (
            <>
              <div className="flex items-center gap-3 px-2 py-2 mb-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-secondary text-sm font-bold truncate">
                    {currentUser.prenom} {currentUser.nom}
                  </p>
                  <p className="text-gray-500 text-xs truncate capitalize mt-0.5">
                    {currentUser.role}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                fullWidth
                className="rounded-full font-bold text-gray-600 border-gray-300"
                leftIcon={<LogOut className="h-4 w-4" />}
              >
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Button href="/login" variant="primary" fullWidth className="rounded-full shadow-md shadow-primary/20 font-bold py-2.5">
                Connexion
              </Button>
              <Button href="/" variant="outline" fullWidth className="rounded-full font-bold text-gray-600 border-gray-300 py-2.5">
                Mode visiteur
              </Button>
            </>
          )}
        </div>

      </aside>
    </>
  );
}
