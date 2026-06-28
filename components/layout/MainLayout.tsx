"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AdjaBubble from '../AdjaBubble';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  // Fond teinté selon l'univers
  const bgClass =
    pathname === "/login" ||
    pathname === "/dashboard" ||
    pathname === "/dashboard/blogueur" ||
    pathname === "/dashboard/blogueur/publier" ||
    pathname === "/dashboard/admin"
      ? 'bg-white'
      : pathname?.startsWith('/formations')
      ? 'bg-violet-50'
      : pathname?.startsWith('/carrieres')
      ? 'bg-blue-50'
      : 'bg-[#F8FAFC]';

  return (
    <div className="w-full h-screen bg-white flex antialiased font-sans overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {isSidebarOpen && (
        <button
          type="button"
          onClick={closeSidebar}
          className="fixed inset-0 z-20 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          aria-label="Fermer le menu"
        />
      )}

      {/* FIX 1 : ml-64 (256px) au lieu de ml-60 (240px) pour coller exactement à w-64 */}
      <div className="flex-1 flex flex-col h-screen lg:ml-64">

        {/* FIX 2 : my-3 mr-3 (12px) au lieu de my-1 mr-1 (4px) — le panneau respire */}
        <div className={`flex-1 ${bgClass} flex flex-col shadow-2xl border-l border-slate-900/10 lg:my-3 lg:mr-3 overflow-hidden`}>
          <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

          {/* FIX 3 : px-14 sur lg, px-20 sur xl, pb-14 pour espace en bas */}
          <main className="flex-1 overflow-y-auto px-6 lg:px-14 xl:px-20 pb-14">

            {/* FIX 4 : max-w réduit à 1200px (moins étouffant) + py-2 au-dessus du hero */}
            <div className="max-w-[1200px] mx-auto w-full py-2">
              {children}
            </div>

          </main>
        </div>
      </div>

      {/* Adja floating chat bubble — always visible */}
      <AdjaBubble />
    </div>
  );
}