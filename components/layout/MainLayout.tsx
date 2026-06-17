"use client";

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);
  return (
    <div className="w-full h-screen bg-[white] flex antialiased font-sans overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {isSidebarOpen && (
        <button
          type="button"
          onClick={closeSidebar}
          className="fixed inset-0 z-20 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          aria-label="Fermer le menu"
        />
      )}

      <div className="flex-1 flex flex-col h-screen lg:ml-60">
        <div className="flex-1 bg-[#F8FAFC] lg:rounded-tl-[2.2rem] lg:rounded-bl-[2.2rem] flex flex-col shadow-2xl border-l border-slate-900/10 lg:my-1 lg:mr-1 overflow-hidden">
          <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}