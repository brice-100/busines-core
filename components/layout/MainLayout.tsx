import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-[#090D1A] flex antialiased font-sans overflow-x-hidden">
      {/* La Sidebar s'aligne sagement à gauche */}
      <Sidebar />

      {/* On a enlevé "pl-64" ici, le bloc prend le reste de l'espace proprement */}
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="flex-1 bg-[#F8FAFC] rounded-l-[2.2rem] flex flex-col shadow-2xl border-l border-slate-900/10 my-1 mr-1 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto px-10 pb-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}