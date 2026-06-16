"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { title: "Accueil", subtitle: "Tableau de bord",  href: "/" },
    { title: "Explorer", subtitle: "Fintech & Monnaie", href: "/explorer" },
    { title: "Formations", subtitle: "Cours & Établissements", href: "/formations" },
    { title: "Décryptages", subtitle: "Comprendre & Analyser", href: "/decryptages" },
    { title: "Pratiques", subtitle: "Simuler & Apprendre", href: "/pratiques" },
    { title: "Juniors", subtitle: "Par niveau scolaire", href: "/juniors" },
    { title: "Carrières", subtitle: "Métiers & Débouchés",  href: "/carrieres" },
    { title: "Innovation", subtitle: "Startups & Tendances",  href: "/innovation" },
    { title: "À propos", subtitle: "Notre mission", href: "/a-propos" },
  ];

  return (
    <aside className={`fixed top-0 left-0 z-30 h-screen w-50 transform bg-[#ffffff] text-slate-400 p-4 flex flex-col select-none border-r border-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block`}>
      
      <div className="flex items-center justify-between px-3 py-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-linear-to-tr from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11V9a3 3 0 00-6 0v6a3 3 0 003 3h10a3 3 0 003-3v-1a3 3 0 00-3-3H7" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-blue-800 font-extrabold text-base  tracking-wide leading-none">BusinessCore</span>
            <span className="text-[9px] text-blue-900 font-bold tracking-widest uppercase mt-1">Fintech & Innovation</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-2 rounded-full text-slate-300 hover:bg-slate-800/60 hover:text-white transition-colors"
          aria-label="Fermer le menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto pr-1  scrollbar-thin">
        {menuItems.map((item, idx) => {
          const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/');
          
          return (
            <Link
              key={idx}
              href={item.href}
              onClick={onClose}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                isActive
                  ? 'bg-[#2563EB] text-white font-medium shadow-md shadow-blue-600/20'
                  : 'hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              <span className={`text-lg transition-transform duration-200 ${!isActive && 'group-hover:scale-110'}`}>
              
              </span>
              <div className="flex flex-col min-w-0">
                <span className={`text-xs md:text-sm truncate ${isActive ? 'font-bold text-white' : 'text-slate-800 font-medium'}`}>
                  {item.title}
                </span>
                <span className={`text-[10px] truncate mt-0.5 ${isActive ? 'text-blue-100/80' : 'text-slate-700'}`}>
                  {item.subtitle}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}