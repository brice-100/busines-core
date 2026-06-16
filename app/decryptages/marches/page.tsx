import type { Metadata } from "next";
import { ArrowLeft, Landmark, PieChart, Building, TrendingUp, Globe2, Users, AlertTriangle, Scale, Rocket, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import decryptageData from "@/data/decryptage_arcticles.json";

export const metadata: Metadata = {
  title: "Marchés Financiers",
  description: "Bourse, actions, obligations, et le fonctionnement des marchés en Afrique et dans le monde.",
};

export default function MarchesPage() {
  const categoryData = decryptageData.categories.find(c => c.id === "marches");
  const relatedArticles = categoryData?.articles || [];

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="mb-12">
        <Link href="/decryptages" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent-violet transition-colors mb-6 font-medium">
          <ArrowLeft className="h-4 w-4" /> Retour aux décryptages
        </Link>
        <h1 className="text-4xl lg:text-5xl font-display font-bold text-secondary tracking-tight mb-4">
          Les Marchés Financiers
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl leading-relaxed">
          Décryptage de la machine économique mondiale : actions, obligations, crises financières et les spécificités des bourses africaines.
        </p>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl text-lg space-y-20">
        
        {/* Section 1 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Landmark className="h-8 w-8 text-accent-violet" />
            Qu’est-ce qu’un marché financier ?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Un marché financier est un lieu, aujourd’hui principalement virtuel, où se rencontrent des acteurs ayant besoin de financement (États, entreprises) et des acteurs ayant des excédents de capitaux à investir (épargnants, fonds d’investissement). C’est le moteur de l’économie capitaliste moderne, permettant de fixer le prix des actifs financiers et d’allouer efficacement les ressources.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <PieChart className="h-8 w-8 text-accent-violet" />
            Les actions, obligations et autres actifs
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-4">
            <li><strong>Les actions :</strong> Elles représentent une fraction du capital d’une entreprise. L’investisseur devient actionnaire, possède un droit de vote aux assemblées et peut percevoir des dividendes. Le risque est plus élevé car la valeur fluctue fortement.</li>
            <li><strong>Les obligations :</strong> Ce sont des titres de dette. Vous prêtez de l’argent à un État ou à une entreprise sur une durée définie, en échange d’un taux d’intérêt régulier (le coupon). Le risque est généralement plus faible que celui des actions.</li>
            <li><strong>Matières premières et devises (Forex) :</strong> Des marchés massifs où s’échangent l’or, le pétrole, le cacao, ou encore les monnaies mondiales (Dollars, Euros, Yens).</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Building className="h-8 w-8 text-accent-violet" />
            La bourse expliquée simplement
          </h2>
          <p className="text-gray-600 leading-relaxed">
            La bourse est le marché public et strictement réglementé où s’échangent les actions et obligations des entreprises cotées (qui ont fait le choix d’ouvrir leur capital au public). Imaginez un immense marché physique, mais au lieu d’y acheter des fruits, vous achetez des parts d’entreprises. Si une entreprise annonce de gros bénéfices ou une invention majeure, la demande pour ses actions augmente, et par conséquent son prix (son cours boursier) monte.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-accent-violet" />
            L’offre et la demande
          </h2>
          <p className="text-gray-600 leading-relaxed">
            C’est la loi universelle qui régit absolument tous les marchés. Le prix d’un actif financier est déterminé à chaque instant par la rencontre entre ceux qui veulent vendre (l’offre) et ceux qui veulent acheter (la demande). Si une action est extrêmement demandée à un instant T, mais que très peu de personnes sont prêtes à s’en séparer, son prix s’envole mécaniquement jusqu’à trouver un équilibre.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Globe2 className="h-8 w-8 text-accent-violet" />
            Les marchés africains
          </h2>
          <p className="text-gray-600 leading-relaxed">
            L’Afrique possède plusieurs bourses dynamiques, bien que souvent moins liquides et plus petites que leurs homologues occidentales. La JSE (Johannesburg Stock Exchange) en Afrique du Sud est la plus grande du continent. On trouve également la BRVM (Bourse Régionale des Valeurs Mobilières) qui regroupe les 8 pays de l’UEMOA avec son siège à Abidjan, ou le NSE (Nigerian Stock Exchange). Elles jouent un rôle crucial pour permettre aux entreprises locales de lever des capitaux et aux États de réduire leur dépendance aux dettes extérieures en devises étrangères.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Users className="h-8 w-8 text-accent-violet" />
            Les acteurs du marché
          </h2>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <ul className="space-y-4 text-gray-600">
              <li className="flex gap-4">
                <strong className="min-w-[150px] text-secondary">Émetteurs</strong> 
                <span>Les entreprises privées et les États qui émettent des titres pour se financer.</span>
              </li>
              <li className="flex gap-4">
                <strong className="min-w-[150px] text-secondary">Institutionnels</strong> 
                <span>Les fonds de pension, assurances et gestionnaires d’actifs (les "baleines" du marché qui manipulent des milliards).</span>
              </li>
              <li className="flex gap-4">
                <strong className="min-w-[150px] text-secondary">Particuliers</strong> 
                <span>Les investisseurs individuels (ou "retail investors").</span>
              </li>
              <li className="flex gap-4">
                <strong className="min-w-[150px] text-secondary">Intermédiaires</strong> 
                <span>Les banques d’investissement et les courtiers (brokers) qui exécutent les ordres sur les places boursières.</span>
              </li>
              <li className="flex gap-4">
                <strong className="min-w-[150px] text-secondary">Régulateurs</strong> 
                <span>Les autorités (AMF, SEC, CREPMF) qui veillent à la transparence, protègent l’épargne et punissent les fraudes et délits d’initiés.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-accent-violet" />
            Les crises financières
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Les marchés fonctionnent par cycles, souvent marqués par des phases d’euphorie (bulles spéculatives) suivies de krachs sévères. Une crise survient lorsqu’un événement inattendu (pandémie, faillite d’une grande banque) ou l’éclatement d’une bulle provoque un mouvement de panique généralisé. Tous les acteurs cherchent alors à vendre en même temps. Les krachs de 1929, 2001 (bulle internet) ou 2008 (crise des subprimes) ont tragiquement rappelé que les marchés peuvent être irrationnels et avoir un impact dévastateur sur l’économie réelle (chômage, récession).
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Scale className="h-8 w-8 text-accent-violet" />
            Risque et rendement
          </h2>
          <p className="text-gray-600 leading-relaxed">
            C’est la loi d’airain de la finance : <strong>il n’y a pas de rendement élevé sans risque élevé</strong>. Un compte d’épargne classique offre un rendement très faible, mais le capital est garanti par l’État. À l’inverse, investir dans une jeune startup très prometteuse ou dans un actif volatile peut rapporter énormément, mais porte le risque très réel de perdre 100 % de sa mise. L’investisseur intelligent doit donc diversifier son portefeuille (ne pas mettre tous ses œufs dans le même panier) pour diluer ce risque tout au long de sa vie.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Rocket className="h-8 w-8 text-accent-violet" />
            Le futur des marchés
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Les marchés se mondialisent et se digitalisent à une vitesse étourdissante. L’hégémonie du trading algorithmique (des robots ultra-rapides qui achètent et vendent en quelques millisecondes), la démocratisation massive de l’investissement de détail grâce aux applications mobiles sans frais, et la tokenisation des actifs (titres représentés sur une blockchain) promettent de rendre les marchés de plus en plus accessibles. Ce futur passionnant augmente néanmoins leur complexité, leur volatilité et exige une éducation financière solide pour les nouvelles générations.
          </p>
        </section>

      </div>

      {/* Articles Section */}
      <div className="mt-24 pt-10 border-t border-gray-100">
        <h2 className="text-3xl font-display font-bold text-secondary mb-8">
          Articles liés aux Marchés Financiers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedArticles.map((a) => (
            <Link key={a.id} href={`/decryptages/${a.id}`}>
              <Card padding="lg" className="h-full flex flex-col group border-gray-100 hover:border-accent-violet-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 rounded-2xl bg-white">
                <div className="flex items-start justify-between mb-5">
                  <Badge variant={a.category === "Marchés" ? "rose" : "violet"} className="font-bold shadow-sm">{a.category}</Badge>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                    <Clock className="h-3.5 w-3.5" />
                    {a.read_time_min} min
                  </div>
                </div>
                
                <h3 className="font-display font-bold text-secondary text-xl mb-3 leading-snug group-hover:text-accent-violet transition-colors duration-300 line-clamp-2">
                  {a.title}
                </h3>
                
                <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-1 line-clamp-3">
                  {a.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-50">
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm"
                      style={{ backgroundColor: a.author.avatar_color }}
                    >
                      {a.author.avatar_initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-secondary">{a.author.name}</p>
                      <p className="text-xs text-gray-400">{formatDate(a.published_at)}</p>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-accent-violet group-hover:text-white text-gray-400 transition-colors duration-300">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
          {relatedArticles.length === 0 && (
            <p className="text-gray-500 col-span-full">Aucun article trouvé pour le moment.</p>
          )}
        </div>
      </div>

    </div>
  );
}
