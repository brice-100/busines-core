"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Home, Compass, BookOpen, TrendingUp, Dumbbell, Users, Briefcase, Sparkles, Info } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { title: "Accueil", subtitle: "Tableau de bord",  href: "/", icon: Home },
    { title: "Explorer", subtitle: "Fintech & Monnaie", href: "/explorer", icon: Compass },
    { title: "Formations", subtitle: "Cours & Établissements", href: "/formations", icon: BookOpen },
    { title: "Décryptages", subtitle: "Comprendre & Analyser", href: "/decryptages", icon: TrendingUp },
    { title: "Pratiques", subtitle: "Simuler & Apprendre", href: "/pratiques", icon: Dumbbell },
    { title: "Juniors", subtitle: "Par niveau scolaire", href: "/juniors", icon: Users },
    { title: "Carrières", subtitle: "Métiers & Débouchés",  href: "/carrieres", icon: Briefcase },
    { title: "Innovation", subtitle: "Startups & Tendances",  href: "/innovation", icon: Sparkles },
    { title: "À propos", subtitle: "Notre mission", href: "/a-propos", icon: Info },
  ];

  return (
    <aside className={`fixed top-0 left-0 z-30 h-screen w-50 transform bg-[#ffffff] text-slate-400 p-4 flex flex-col select-none border-r border-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block`}>
      
      <div className="flex items-center justify-between px-3 py-6 mb-2">
        <div className="flex items-center gap-3 pl-5">
          <div className="w-10 h-10 bg-[#2563eb] rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[#1e293b] font-extrabold text-lg tracking-tight leading-none">BusinessCore</span>
            <span className="text-[10px] text-[#2563eb] font-bold tracking-widest uppercase mt-1">Fintech & Innovation</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-2 rounded-full text-slate-300 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          aria-label="Fermer le menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 min-h-0 flex flex-col gap-1 overflow-y-auto py-2">
        {menuItems.map((item, idx) => {
          const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/');
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              href={item.href}
              onClick={onClose}
              className={`w-full flex items-center gap-4 py-3 pl-8 pr-4 mr-4 rounded-r-2xl transition-all duration-200 text-left ${
                isActive
                  ? 'bg-blue-50/50'
                  : 'hover:bg-slate-50'
              }`}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-[#2563eb]' : 'text-slate-400'}`} />
              <div className="flex flex-col">
                <span className={`text-[14px] leading-tight ${isActive ? 'font-bold text-[#2563eb]' : 'text-[#1e293b] font-semibold'}`}>
                  {item.title}
                </span>
                <span className={`text-[10px] mt-0.5 ${isActive ? 'text-blue-600/70 font-medium' : 'text-slate-500'}`}>
                  {item.subtitle}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100 flex flex-col gap-3">
        <Link 
          href="/login"
          className="w-full py-3.5 bg-[#2563eb] hover:bg-blue-700 text-white rounded-xl text-sm font-bold text-center transition-colors shadow-sm"
        >
          Connexion
        </Link>
        <Link 
          href="/login?mode=visiteur"
          className="w-full py-3.5 bg-white border border-slate-200 text-[#1e293b] hover:bg-slate-50 rounded-xl text-sm font-bold text-center transition-colors"
        >
          Mode visiteur
        </Link>
      </div>
    </aside>
  );
}