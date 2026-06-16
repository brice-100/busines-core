import type { Metadata } from "next";
import { ArrowLeft, Leaf, Globe2, ShieldCheck, ShieldAlert, Landmark, Recycle, BarChart4, Target, Sprout, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import decryptageData from "@/data/decryptage_arcticles.json";

export const metadata: Metadata = {
  title: "Finance Durable",
  description: "Comprendre la finance durable, les critères ESG, l'économie circulaire et les Green Bonds en Afrique.",
};

export default function FinanceDurablePage() {
  const categoryData = decryptageData.categories.find(c => c.id === "finance_durable");
  const relatedArticles = categoryData?.articles || [];

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="mb-12">
        <Link href="/decryptages" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent-violet transition-colors mb-6 font-medium">
          <ArrowLeft className="h-4 w-4" /> Retour aux décryptages
        </Link>
        <h1 className="text-4xl lg:text-5xl font-display font-bold text-secondary tracking-tight mb-4">
          Finance Durable
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl leading-relaxed">
          Au croisement de la rentabilité économique et de la responsabilité écologique, découvrez comment l’investissement responsable et les critères ESG façonnent l’économie de demain.
        </p>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl text-lg space-y-20">
        
        {/* Section 1 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Leaf className="h-8 w-8 text-accent-violet" />
            Qu’est-ce que la finance durable ?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            La finance durable désigne l’intégration de critères environnementaux, sociaux et de gouvernance (ESG) dans les décisions d’investissement financier. Elle vise à financer des projets et des entreprises qui contribuent au développement durable, tout en générant un rendement financier sur le long terme. L’objectif est de créer un impact positif ou de minimiser les impacts négatifs sur la société et la planète.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Globe2 className="h-8 w-8 text-accent-violet" />
            Pourquoi est-elle devenue importante ?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Face à l’urgence climatique, à l’épuisement des ressources naturelles et à la montée des inégalités sociales, les investisseurs, les régulateurs et les consommateurs exigent de la transparence. La finance ne peut plus se contenter d’être seulement rentable ; elle doit être responsable. L’inaction climatique est désormais perçue comme un risque financier majeur (risques de transition et risques physiques) qui menace la stabilité de l’économie mondiale.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-accent-violet" />
            Les critères ESG
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
              <h3 className="font-bold text-green-800 mb-3 text-lg flex items-center gap-2"><Leaf className="h-5 w-5" /> Environnement</h3>
              <ul className="space-y-2 text-green-700 text-sm">
                <li>• Réduction des émissions de CO2</li>
                <li>• Gestion de l’eau et des déchets</li>
                <li>• Efficacité énergétique</li>
                <li>• Préservation de la biodiversité</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-3 text-lg flex items-center gap-2"><Globe2 className="h-5 w-5" /> Social</h3>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li>• Respect des droits humains</li>
                <li>• Diversité et inclusion en entreprise</li>
                <li>• Santé et sécurité au travail</li>
                <li>• Relations avec les communautés locales</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
              <h3 className="font-bold text-purple-800 mb-3 text-lg flex items-center gap-2"><Landmark className="h-5 w-5" /> Gouvernance</h3>
              <ul className="space-y-2 text-purple-700 text-sm">
                <li>• Équité de rémunération des dirigeants</li>
                <li>• Indépendance du conseil d’administration</li>
                <li>• Lutte stricte contre la corruption</li>
                <li>• Transparence fiscale</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Landmark className="h-8 w-8 text-accent-violet" />
            Le rôle des banques
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Les banques ont un rôle charnière : elles orientent les flux de capitaux. De plus en plus d’établissements s’engagent publiquement à exclure de leurs portefeuilles les énergies fossiles très polluantes (charbon thermique, forages arctiques). Elles créent également des produits financiers incitatifs, comme les prêts indexés sur des objectifs de durabilité (Sustainability-Linked Loans), où le taux d’intérêt baisse si l’entreprise atteint ses objectifs environnementaux.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Globe2 className="h-8 w-8 text-accent-violet" />
            Finance durable en Afrique
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Bien que l’Afrique ne contribue qu’à une fraction infime des émissions mondiales de gaz à effet de serre, elle est le continent le plus vulnérable aux changements climatiques. La finance durable y est donc un levier de survie et de développement. L’émission de &quot;Green Bonds&quot; (obligations vertes) s’y accélère, notamment en Égypte, en Afrique du Sud et au Nigeria, pour financer des parcs solaires, des barrages et des projets d’agriculture résiliente. Parallèlement, la microfinance durable soutient l’entrepreneuriat féminin et les petits exploitants agricoles.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Recycle className="h-8 w-8 text-accent-violet" />
            Économie circulaire et recyclage
          </h2>
          <p className="text-gray-600 leading-relaxed">
            L’économie circulaire propose de rompre avec le modèle linéaire destructeur &quot;extraire, fabriquer, jeter&quot;. La finance durable soutient activement les startups et entreprises qui favorisent l’écoconception, le réemploi, la réparation et le recyclage. L’objectif est de transformer nos déchets en nouvelles ressources primaires, permettant ainsi de découpler la croissance économique de la consommation épuisante des ressources terrestres.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <ShieldAlert className="h-8 w-8 text-accent-violet" />
            Greenwashing
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Le greenwashing (ou écoblanchiment) est la face sombre de cette transition. Il consiste pour une entreprise ou un fonds d’investissement à utiliser des arguments écologiques trompeurs à des fins purement marketing, sans réel impact positif derrière. Pour le combattre, les régulateurs mondiaux (comme la taxonomie européenne) mettent en place des classifications strictes pour définir scientifiquement ce qui est réellement durable, et imposent de lourdes amendes en cas de communication mensongère.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Target className="h-8 w-8 text-accent-violet" />
            Mesurer l’impact
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Contrairement à la rentabilité financière classique (facile à lire sur un bilan), l’impact environnemental et social est complexe à quantifier. De nouvelles métriques émergent : calcul de l’empreinte carbone évitée, volume d’eau économisé, nombre d’emplois durables créés, ou encore l’alignement des investissements sur les 17 Objectifs de Développement Durable (ODD) définis par les Nations Unies.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Sprout className="h-8 w-8 text-accent-violet" />
            Le futur de la finance durable
          </h2>
          <p className="text-gray-600 leading-relaxed">
            L’investissement ESG est en passe de devenir la norme absolue du marché, et non plus un simple secteur de niche. Avec l’intégration de l’intelligence artificielle pour mieux auditer les données extra-financières complexes, et la mise en place de législations de plus en plus contraignantes pour les industries polluantes, la finance de demain sera inévitablement liée à la survie et à la régénération de notre écosystème planétaire.
          </p>
        </section>

      </div>

      {/* Articles Section */}
      <div className="mt-24 pt-10 border-t border-gray-100">
        <h2 className="text-3xl font-display font-bold text-secondary mb-8">
          Articles liés à la Finance Durable
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedArticles.map((a) => (
            <Link key={a.id} href={`/decryptages/${a.id}`}>
              <Card padding="lg" className="h-full flex flex-col group border-gray-100 hover:border-accent-violet-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 rounded-2xl bg-white">
                <div className="flex items-start justify-between mb-5">
                  <Badge variant={a.category === "Finance Durable" ? "green" : "violet"} className="font-bold shadow-sm">{a.category}</Badge>
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
