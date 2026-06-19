import { getExplorerItemById } from "@/lib/explorer-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lightbulb } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

// Optionnel: Générer les métadonnées dynamiquement
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const item = getExplorerItemById(id);
  if (!item) return { title: "Non trouvé" };
  return { title: `${item.title} | Explorer | BusinessCore` };
}

export default async function ExplorerDetailPage({ params }: Props) {
  const { id } = await params;
  const item = getExplorerItemById(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 w-full animate-fade-in">
      
      {/* Bouton de retour */}
      <Link 
        href="/explorer" 
        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium text-sm mb-6 bg-white py-2 px-4 rounded-full shadow-sm border border-gray-100 hover:shadow-md"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à l'exploration
      </Link>

      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden mb-12 shadow-lg shadow-gray-200/50">
        <img 
          src={item.image} 
          alt={item.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dégradé pour lisibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
        
        {/* Contenu Hero */}
        <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col items-start justify-end h-full">
          <div className="flex flex-wrap gap-2 mb-4">
            {item.categories.map(cat => (
              <span key={cat} className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider rounded-md border border-white/20">
                {cat}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold !text-white mb-2 leading-tight drop-shadow-lg" style={{color: '#ffffff'}}>
            {item.title}
          </h1>
          <p className="text-lg md:text-xl !text-white/80 font-medium drop-shadow-md" style={{color: 'rgba(255,255,255,0.8)'}}>
            {item.desc}
          </p>
        </div>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Aperçu */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-3">
              <span className="h-8 w-1.5 rounded-full bg-primary" />
              Aperçu
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {item.details.overview}
            </p>
          </section>

          {/* Points clés */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
              <span className="h-8 w-1.5 rounded-full bg-accent-violet" />
              Points clés
            </h2>
            <div className="space-y-4">
              {item.details.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100/50">
                  <div className="mt-0.5 text-primary bg-primary/10 p-1.5 rounded-full flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="text-gray-700 text-[15px] leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1">
          
          {/* L'impact Card */}
          <div className="sticky top-28 bg-gradient-to-br from-primary to-blue-600 p-8 rounded-3xl shadow-xl shadow-primary/20 text-white">
            <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 font-display">L'impact</h3>
            <p className="text-white/90 text-[15px] leading-relaxed italic font-medium">
              "{item.details.impact}"
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
