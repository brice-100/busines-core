import articlesData from '@/data/articles.json';

export default function DecryptagesPage() {
  const featuredArticle = articlesData.find(article => article.featured) || articlesData[0];
  const regularArticles = articlesData.filter(article => article.id !== featuredArticle.id);

  const rawCategories = [
  { label: "Tous les articles", icon: "✨" },
  { label: "Systèmes monétaires", icon: "🏛️" },
  { label: "Finance africaine", icon: "🌍" },
  { label: "Tech & Crypto", icon: "💻" },
];

// Compute article count per category (including All)
const categories = rawCategories.map(cat => {
  const count = cat.label === "Tous les articles"
    ? articlesData.length
    : articlesData.filter(a => a.categorie === cat.label).length;
  return { ...cat, count };
});

  return (
    // AJUSTEMENT 1 : On supprime la limite "max-w-7xl" pour occuper TOUT l'espace à droite de la sidebar
    <div className="w-full pl-4 pr-6 md:pl-6 md:pr-10 py-8 bg-[#F8FAFC] min-h-screen">

      {/* 1. EN-TÊTE & FILTRES */}
      <div className="mb-8">
        {/*<nav className="text-xs font-medium text-slate-400 mb-4 flex items-center gap-1.5 select-none">
          <span className="hover:text-slate-600 cursor-pointer">Accueil</span>
          <span className="text-slate-300">&gt;</span>
          <span className="text-[#2563EB] font-semibold">Décryptages</span>
        </nav>*/}
      
        <div className="flex items-center gap-3.5 mb-4">
          <span className="text-3xl md:text-4xl select-none">🔬</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Décryptages
          </h1>
        </div>

        <p className="text-slate-600 text-sm md:text-base max-w-4xl leading-relaxed mb-6">
          Pour ceux qui veulent aller au fond des choses. Des sujets complexes, rendus accessibles 
          — avec des schémas, des données et du contexte africain.
        </p>

        <div className="flex flex-wrap gap-3 mb-8 select-none">
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200/40">
            <span>📊</span> <span>12 articles</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200/40">
            <span>⏱️</span> <span>5-12 min de lecture</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100">
            <span>🌍</span> <span>Contexte camerounais intégré</span>
          </div>
        </div>

        {/* AJUSTEMENT 2 : Ajout d'un défilement horizontal fluide au cas où l'écran est vraiment trop petit */}
        <div className="flex gap-8 border-b border-slate-200/80 mb-6 overflow-x-auto scrollbar-none select-none">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`pb-3 text-xs md:text-sm font-bold tracking-wide transition-all relative flex items-center gap-2 whitespace-nowrap border-b-2 -mb-[2px] ${
                index === 0
                  ? 'text-[#2563EB] border-[#2563EB]' 
                  : 'text-slate-500 hover:text-slate-800 border-transparent'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              
              <span className={`ml-1 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                index === 0 
                  ? 'bg-blue-100 text-[#2563EB]' 
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. GRILLE PRINCIPALE RÉÉQUILIBRÉE */}
      {/* AJUSTEMENT 3 : Passage sur une grille de 4 colonnes (lg:grid-cols-4) au lieu de 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

        {/* AJUSTEMENT 4 : La liste de gauche prend désormais 3/4 de la largeur (lg:col-span-3) au lieu de 2/3 */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {regularArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl p-4 flex gap-6 border border-gray-100 hover:shadow-md transition-all cursor-pointer items-center group"
            >
              <div className="w-32 h-24 md:w-44 md:h-28 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                <img 
                  src={article.image} 
                  alt={article.titre} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Le contenu textuel a maintenant beaucoup plus de place pour s'étaler sur la ligne */}
              <div className="flex-1 flex flex-col justify-between h-full py-1">
                <div>
                  <h3 className="font-bold text-[#0F172A] text-base md:text-xl leading-snug group-hover:text-[#2563EB] transition-colors line-clamp-2 mb-2">
                    {article.titre}
                  </h3>
                  {/* Optionnel : On réintègre un bout de résumé pour combler l'espace horizontal disponible */}
                  <p className="text-slate-400 text-xs hidden md:line-clamp-1 mb-3">
                    {article.resume}
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-400 font-medium">
                  <span className="capitalize text-[#2563EB] font-semibold">{article.categorie}</span>
                  <span className="bg-slate-50 px-2.5 py-1 rounded text-slate-500 font-semibold text-[10px]">Analyse</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* COLONNE DROITE : Le bloc "À la une" conserve son format compact de 1 colonne (lg:col-span-1) */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm flex flex-col gap-4">
            <h2 className="text-base font-bold text-[#0F172A] tracking-wide">À la une</h2>

            <div className="w-full h-44 bg-slate-100 rounded-2xl overflow-hidden relative">
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.titre} 
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="font-bold text-[#0F172A] text-lg leading-snug hover:text-[#2563EB] cursor-pointer transition-colors">
              {featuredArticle.titre}
            </h3>

            <button className="w-full mt-2 py-3 bg-[#EFF6FF] text-[#2563EB] rounded-xl font-semibold text-sm hover:bg-[#DBEAFE] transition-colors">
              Lire l'article
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}