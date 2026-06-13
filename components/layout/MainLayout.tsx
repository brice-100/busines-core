"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Fermer le menu mobile lors d'un changement de route
  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="bg-white min-h-screen">
      {/* Sidebar avec gestion d'état mobile */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      {/* Conteneur principal avec padding gauche robuste sur desktop */}
      <div className="transition-all duration-300 desktop-sidebar-pad flex flex-col min-h-screen">
        <Navbar onMenuClick={toggleMobileMenu} isMenuOpen={isMobileMenuOpen} />
        
        {/* Contenu de la page avec padding global standardisé */}
        <main className="flex-1 overflow-x-hidden p-6 lg:p-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
