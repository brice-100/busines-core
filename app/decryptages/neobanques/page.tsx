import type { Metadata } from "next";
import { ArrowLeft, Building2, Zap, Smartphone, Globe, ShieldCheck, TrendingUp, CreditCard, Clock, ChevronRight, Scale } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import decryptageData from "@/data/decryptage_arcticles.json";

export const metadata: Metadata = {
  title: "Néobanques",
  description: "Tout comprendre sur les néobanques : fonctionnement, développement, et leur impact en Afrique.",
};

export default function NeobanquesPage() {
  const categoryData = decryptageData.categories.find(c => c.id === "neobanques");
  const relatedArticles = categoryData?.articles || [];

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="mb-12">
        <Link href="/decryptages" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent-violet transition-colors mb-6 font-medium">
          <ArrowLeft className="h-4 w-4" /> Retour aux décryptages
        </Link>
        <h1 className="text-4xl lg:text-5xl font-display font-bold text-secondary tracking-tight mb-4">
          Les Néobanques
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl leading-relaxed">
          De N26 à Kuda en passant par Djamo, les néobanques redéfinissent la relation client dans le secteur financier avec des modèles 100 % digitaux, sans agences et sans frictions.
        </p>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl text-lg space-y-20">
        
        {/* Section 1 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Smartphone className="h-8 w-8 text-accent-violet" />
            Qu’est-ce qu’une néobanque ?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Une néobanque est une institution financière 100 % numérique, accessible uniquement via une application mobile ou une plateforme web. Elle ne possède aucune agence physique. Apparues dans les années 2010 (comme Revolut, N26 ou Monzo), elles repensent intégralement l’expérience utilisateur en offrant des services bancaires simples, instantanés, intuitifs et souvent moins onéreux que les banques classiques.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Scale className="h-8 w-8 text-accent-violet" />
            Banque traditionnelle vs Néobanque
          </h2>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <ul className="space-y-4 text-gray-600">
              <li className="flex gap-4">
                <strong className="min-w-[150px] text-secondary">Agences physiques</strong> 
                <span>Présentes partout pour les banques traditionnelles, totalement absentes pour les néobanques.</span>
              </li>
              <li className="flex gap-4">
                <strong className="min-w-[150px] text-secondary">Frais bancaires</strong> 
                <span>Souvent élevés et opaques d’un côté, réduits, prévisibles et transparents de l’autre.</span>
              </li>
              <li className="flex gap-4">
                <strong className="min-w-[150px] text-secondary">Ouverture de compte</strong> 
                <span>Des procédures lourdes nécessitant des rendez-vous contre une ouverture en 5 minutes depuis un smartphone.</span>
              </li>
              <li className="flex gap-4">
                <strong className="min-w-[150px] text-secondary">Technologie</strong> 
                <span>Systèmes informatiques anciens (legacy) contre une architecture moderne, souvent hébergée dans le cloud et pensée "Mobile-First".</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Zap className="h-8 w-8 text-accent-violet" />
            Comment ça fonctionne ?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Le processus est conçu pour éliminer toute friction. L’utilisateur télécharge l’application, remplit ses informations, scanne sa pièce d’identité et prend un selfie (procédure de KYC biométrique automatisée). Une fois validé, le compte est actif. Il peut générer une carte virtuelle immédiate pour ses achats en ligne et commander une carte physique. La gestion au quotidien — virements instantanés, blocage de carte, modification de plafonds, catégorisation automatique des dépenses — se fait en temps réel, d’un simple clic.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-accent-violet" />
            Pourquoi elles se développent ?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            L’ascension des néobanques répond à une frustration profonde des consommateurs face à la lenteur et à l’inefficacité perçue des banques classiques. Leur développement fulgurant s’appuie sur deux piliers :
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li><strong>Des coûts de structure drastiquement réduits :</strong> Pas de loyers d’agences physiques, pas de milliers d’employés de guichet, une automatisation poussée du support client.</li>
            <li><strong>Un modèle économique alternatif :</strong> Elles se rémunèrent via les commissions d’interchange (frais prélevés aux commerçants lors des paiements par carte), les offres d’abonnement premium (cartes métal, assurances incluses) et de plus en plus via le crédit à la consommation.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Globe className="h-8 w-8 text-accent-violet" />
            Les néobanques en Afrique
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Sur le continent africain, le modèle s’adapte pour répondre à l’immense défi de l’inclusion financière. Des startups comme Kuda (Nigeria), Carbon, Djamo (Côte d’Ivoire) ou TymeBank (Afrique du Sud) démocratisent l’accès à la carte bancaire Visa/Mastercard, un produit autrefois réservé à une élite. Elles séduisent la classe moyenne émergente et la jeunesse connectée en proposant des virements locaux gratuits et en utilisant des données alternatives (habitudes de consommation mobile) pour octroyer des micro-crédits.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Building2 className="h-8 w-8 text-accent-violet" />
            Néobanque vs Mobile Money
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
              <h3 className="font-bold text-orange-800 mb-3 text-lg">Mobile Money</h3>
              <p className="text-orange-700 text-sm leading-relaxed">
                Rattaché à un numéro de téléphone et opéré par les télécoms (Orange, MTN, Safaricom). Il permet de transférer de l’argent et payer des factures via des codes USSD, sans nécessiter de smartphone ni d’internet. C’est le roi des transactions informelles.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-3 text-lg">Néobanque</h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                Nécessite un smartphone, une connexion internet et un téléchargement d’application. Fournit un véritable compte (avec RIB/IBAN), une carte de paiement internationale et des services d’épargne/crédit. Les deux modèles convergent progressivement aujourd’hui.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-accent-violet" />
            Sécurité
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Bien qu’elles soient invisibles dans la rue, les néobanques sont soumises à des réglementations très strictes, tout comme les banques traditionnelles. En Europe, elles doivent obtenir un agrément bancaire complet (ex: auprès de la BCE) ou s’adosser à un partenaire agréé.
          </p>
          <p className="text-gray-600 leading-relaxed">
            En Afrique francophone, elles opèrent souvent sous couvert d’une licence d’établissement de monnaie électronique (EME) délivrée par la BCEAO ou la COBAC, ou s’associent à des banques locales (BaaS - Bank as a Service). La sécurité technologique est au cœur de leur modèle : Face ID, empreinte digitale, authentification à double facteur (2FA) et gel instantané de la carte via l’application garantissent la sécurité des fonds.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <CreditCard className="h-8 w-8 text-accent-violet" />
            Le futur des services bancaires numériques
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Le futur des néobanques s’oriente vers la création de "Super-Apps" financières intégrant tous les aspects de la vie économique de l’utilisateur : trading d’actions fractionnées, investissement en cryptomonnaies, assurances, gestion de patrimoine automatisée et "Buy Now Pay Later" (BNPL). Le plus grand défi de ces entreprises restera d’atteindre une rentabilité durable, tout en naviguant dans un écosystème réglementaire mouvant et en maintenant la confiance absolue de leurs millions de clients.
          </p>
        </section>
      </div>

      {/* Articles Section */}
      <div className="mt-24 pt-10 border-t border-gray-100">
        <h2 className="text-3xl font-display font-bold text-secondary mb-8">
          Articles liés aux Néobanques
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
