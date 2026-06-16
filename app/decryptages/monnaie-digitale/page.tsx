import type { Metadata } from "next";
import { ArrowLeft, Wallet, Globe, ShieldAlert, Smartphone, Banknote, TrendingUp, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import decryptageData from "@/data/decryptage_arcticles.json";

export const metadata: Metadata = {
  title: "Monnaie Digitale",
  description: "Tout comprendre sur la monnaie digitale : Mobile Money, MNBC, portefeuilles numériques.",
};

export default function MonnaieDigitalePage() {
  const categoryData = decryptageData.categories.find(c => c.id === "monnaie_digitale");
  const relatedArticles = categoryData?.articles || [];

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="mb-12">
        <Link href="/decryptages" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent-violet transition-colors mb-6 font-medium">
          <ArrowLeft className="h-4 w-4" /> Retour aux décryptages
        </Link>
        <h1 className="text-4xl lg:text-5xl font-display font-bold text-secondary tracking-tight mb-4">
          La Monnaie Digitale
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl leading-relaxed">
          De l’explosion du Mobile Money en Afrique à l’avènement des Monnaies Numériques de Banque Centrale (MNBC), plongez au cœur de la révolution financière qui redessine l’économie mondiale.
        </p>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl text-lg space-y-20">
        {/* Section 1 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Globe className="h-8 w-8 text-accent-violet" />
            Qu’est-ce que la monnaie digitale ?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            La monnaie digitale, ou monnaie numérique, est tout moyen de paiement qui existe uniquement sous forme électronique. Contrairement aux billets et aux pièces, elle n’a pas de forme physique. Elle est transférée, stockée et échangée au travers de systèmes informatiques, de smartphones et d’Internet, rendant les transactions instantanées et sans frontières.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Smartphone className="h-8 w-8 text-accent-violet" />
            Le Mobile Money
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Le Mobile Money permet de stocker, d’envoyer et de recevoir de l’argent directement depuis un téléphone portable basique (via USSD) ou un smartphone, sans nécessiter de compte bancaire traditionnel.
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li><strong>Inclusion financière :</strong> Il a permis de bancariser des millions de personnes non desservies par les banques classiques.</li>
            <li><strong>Paiements du quotidien :</strong> Achat de biens, paiement de factures, transfert d’argent à des proches.</li>
            <li><strong>Acteurs majeurs :</strong> M-Pesa, Wave, Orange Money, MTN Mobile Money.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Wallet className="h-8 w-8 text-accent-violet" />
            Les Portefeuilles Numériques (Digital Wallets)
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Un portefeuille numérique (Apple Pay, Google Wallet, PayPal, ou des apps locales) est un système logiciel qui stocke en toute sécurité les informations de paiement des utilisateurs. Il permet de réaliser des transactions électroniques rapides et sécurisées, que ce soit en ligne ou en magasin via la technologie NFC ou les QR codes.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Banknote className="h-8 w-8 text-accent-violet" />
            Les Monnaies Numériques de Banque Centrale (MNBC / CBDCs)
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Une MNBC est l’équivalent numérique de la monnaie fiduciaire d’un pays, émise et régulée directement par sa banque centrale. Contrairement aux cryptomonnaies (comme le Bitcoin) qui sont décentralisées et volatiles, la MNBC est centralisée et sa valeur est indexée sur la monnaie nationale.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Elles visent à moderniser les systèmes de paiement nationaux, réduire les coûts de transaction et lutter contre la fraude, tout en maintenant la souveraineté monétaire des États face aux cryptomonnaies et aux stablecoins privés.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <ShieldAlert className="h-8 w-8 text-accent-violet" />
            Avantages et Risques
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
              <h3 className="font-bold text-green-800 mb-3 text-lg">Avantages</h3>
              <ul className="list-disc pl-5 text-green-700 space-y-2 text-base">
                <li>Instantanéité des paiements (24/7).</li>
                <li>Réduction drastique des frais de transaction transfrontaliers.</li>
                <li>Inclusion financière des populations non bancarisées.</li>
                <li>Traçabilité réduisant l’évasion fiscale.</li>
              </ul>
            </div>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <h3 className="font-bold text-red-800 mb-3 text-lg">Risques</h3>
              <ul className="list-disc pl-5 text-red-700 space-y-2 text-base">
                <li>Vulnérabilité aux cyberattaques et piratages.</li>
                <li>Atteinte potentielle à la vie privée (traçabilité de chaque achat).</li>
                <li>Exclusion numérique pour les personnes sans accès à la technologie.</li>
                <li>Dépendance totale aux infrastructures électriques et internet.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Globe className="h-8 w-8 text-accent-violet" />
            Le Cas Africain
          </h2>
          <p className="text-gray-600 leading-relaxed">
            L’Afrique est le leader mondial incontesté de l’adoption du Mobile Money. Dans de nombreux pays subsahariens, le volume des transactions mobiles dépasse le PIB national. Cette révolution pallie le manque d’infrastructures bancaires traditionnelles. De plus, plusieurs pays africains (comme le Nigeria avec l’eNaira) sont pionniers dans l’expérimentation des MNBC pour stimuler l’économie digitale.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-accent-violet" />
            Le Futur
          </h2>
          <p className="text-gray-600 leading-relaxed">
            L’avenir s’oriente vers une interopérabilité totale entre les portefeuilles mobiles, les banques classiques et les MNBC. La tokenisation des actifs réels, l’intelligence artificielle pour la détection des fraudes, et les paiements programmables (smart contracts) promettent de rendre l’argent non seulement digital, mais "intelligent". L’argent liquide, bien qu’il ne disparaisse pas du jour au lendemain, deviendra de plus en plus résiduel.
          </p>
        </section>
      </div>

      {/* Articles Section */}
      <div className="mt-24 pt-10 border-t border-gray-100">
        <h2 className="text-3xl font-display font-bold text-secondary mb-8">
          Articles liés à la monnaie digitale
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedArticles.map((a) => (
            <Link key={a.id} href={`/decryptages/${a.id}`}>
              <Card padding="lg" className="h-full flex flex-col group border-gray-100 hover:border-accent-violet-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 rounded-2xl bg-white">
                <div className="flex items-start justify-between mb-5">
                  <Badge variant="violet" className="font-bold shadow-sm">{a.category}</Badge>
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
