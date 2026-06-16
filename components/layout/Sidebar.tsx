import React from 'react';

export default function Sidebar() {
  const menuItems = [
    { title: "Accueil", subtitle: "Tableau de bord", icon: "🏠", active: false },
    { title: "Explorer", subtitle: "Fintech & Monnaie", icon: "🔍", active: false },
    { title: "Formations", subtitle: "Cours & Établissements", icon: "🎓", active: false },
    { title: "Décryptages", subtitle: "Comprendre & Analyser", icon: "📊", active: true },
    { title: "Pratiques", subtitle: "Simuler & Apprendre", icon: "💼", active: false },
    { title: "Juniors", subtitle: "Par niveau scolaire", icon: "👶", active: false },
    { title: "Carrières", subtitle: "Métiers & Débouchés", icon: "🚀", active: false },
    { title: "Innovation", subtitle: "Startups & Tendances", icon: "💡", active: false },
    { title: "À propos", subtitle: "Notre mission", icon: "ℹ️", active: false },
  ];

  return (
    // MODIFICATION 1 : Passage de w-64 à w-72 (La barre gagne 32px en largeur pour laisser respirer les textes)
    <aside className="w-72 flex-shrink-0 bg-[#090D1A] text-slate-400 h-screen p-4 flex flex-col select-none border-r border-slate-900">
      
      {/* Brand Logo */}
      <div className="flex items-center gap-3.5 px-3 py-4 mb-5">
        <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11V9a3 3 0 00-6 0v6a3 3 0 003 3h10a3 3 0 003-3v-1a3 3 0 00-3-3H7" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-extrabold text-base tracking-wide leading-none">BusinessCore</span>
          <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase mt-1">Fintech & Innovation</span>
        </div>
      </div>

      {/* Navigation Links */}
      {/* MODIFICATION 2 : Passage de gap-1 à gap-2 pour donner de l'espace vertical entre chaque bouton de menu */}
      <nav className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1 scrollbar-thin">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            // MODIFICATION 3 : py-2.5 passe à py-3 pour donner plus de volume à la zone cliquable
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
              item.active
                ? 'bg-[#2563EB] text-white font-medium shadow-md shadow-blue-600/20'
                : 'hover:bg-slate-800/40 hover:text-slate-200'
            }`}
          >
            <span className={`text-lg transition-transform duration-200 ${!item.active && 'group-hover:scale-110'}`}>
              {item.icon}
            </span>
            <div className="flex flex-col min-w-0">
              <span className={`text-xs md:text-sm truncate ${item.active ? 'font-bold text-white' : 'text-slate-300 font-medium'}`}>
                {item.title}
              </span>
              <span className={`text-[10px] truncate mt-0.5 ${item.active ? 'text-blue-100/80' : 'text-slate-500'}`}>
                {item.subtitle}
              </span>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
}