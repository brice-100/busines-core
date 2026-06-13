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
    <div className="flex min-h-screen bg-white">
      {/* Sidebar avec gestion d'état mobile */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      {/* Spacer DOM invisible pour pousser le contenu sur desktop (infaillible, insensible au cache) */}
      <div className="hidden lg:block w-72 flex-shrink-0 transition-all duration-300"></div>

      {/* Conteneur principal */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Navbar onMenuClick={toggleMobileMenu} isMenuOpen={isMobileMenuOpen} />
        
        {/* Contenu de la page avec padding global premium */}
        <main className="flex-1 overflow-x-hidden p-8 lg:p-16">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
