import type { Metadata } from "next";
import { ArrowLeft, Bitcoin, Link as LinkIcon, Lock, Globe, Scale, Coins, ShieldAlert, BookOpen, Clock, ChevronRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import decryptageData from "@/data/decryptage_arcticles.json";

export const metadata: Metadata = {
  title: "Cryptomonnaies",
  description: "Guide complet sur les cryptomonnaies : Bitcoin, blockchain, stablecoins et leur adoption massive en Afrique.",
};

export default function CryptoPage() {
  const categoryData = decryptageData.categories.find(c => c.id === "crypto");
  const relatedArticles = categoryData?.articles || [];

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="mb-12">
        <Link href="/decryptages" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent-violet transition-colors mb-6 font-medium">
          <ArrowLeft className="h-4 w-4" /> Retour aux décryptages
        </Link>
        <h1 className="text-4xl lg:text-5xl font-display font-bold text-secondary tracking-tight mb-4">
          Cryptomonnaies & Blockchain
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl leading-relaxed">
          Au-delà de la simple spéculation, découvrez comment la technologie blockchain et les cryptomonnaies, du Bitcoin aux Stablecoins, transforment les usages financiers, particulièrement sur le continent africain.
        </p>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl text-lg space-y-20">
        
        {/* Section 1 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Coins className="h-8 w-8 text-accent-violet" />
            Qu’est-ce qu’une cryptomonnaie ?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Une cryptomonnaie est une monnaie numérique ou virtuelle qui s’appuie sur la cryptographie pour sécuriser les transactions, contrôler la création de nouvelles unités et vérifier le transfert d’actifs. Contrairement aux monnaies traditionnelles (fiat) comme l’Euro ou le Franc CFA, les cryptomonnaies ne sont généralement émises par aucune autorité centrale ou gouvernement. Elles fonctionnent de manière décentralisée sur un réseau informatique réparti à travers le monde.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Bitcoin className="h-8 w-8 text-accent-violet" />
            L’histoire du Bitcoin
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Le Bitcoin a été créé en 2009 par une ou plusieurs personnes sous le pseudonyme de Satoshi Nakamoto, en réponse directe à la crise financière mondiale de 2008. L’objectif initial décrit dans le fameux &quot;Livre Blanc&quot; (Whitepaper) était de créer un système de monnaie électronique purement pair-à-pair, permettant d’envoyer des paiements en ligne directement d’une partie à une autre sans passer par une institution financière de confiance. D’une valeur de quelques centimes à ses débuts, le Bitcoin est aujourd’hui considéré par beaucoup comme une réserve de valeur, souvent qualifiée d’&quot;or numérique&quot;.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <LinkIcon className="h-8 w-8 text-accent-violet" />
            La blockchain expliquée simplement
          </h2>
          <p className="text-gray-600 leading-relaxed">
            La blockchain (ou chaîne de blocs) est la technologie d’infrastructure qui permet aux cryptomonnaies d’exister. Imaginez un grand livre de comptes numérique, public et infalsifiable. Chaque fois qu’une transaction se produit, elle est regroupée avec d’autres dans un &quot;bloc&quot;. Une fois rempli et vérifié par les ordinateurs du réseau (les mineurs ou les validateurs), ce bloc est scellé mathématiquement et relié au bloc précédent, formant une longue chaîne inaltérable. La particularité ? Ce grand livre n’est pas stocké dans le serveur d’une seule banque, mais copié à l’identique sur des milliers d’ordinateurs à travers la planète, rendant toute modification frauduleuse quasiment impossible.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Scale className="h-8 w-8 text-accent-violet" />
            Crypto vs Monnaie classique
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">Monnaie Classique (Fiat)</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li>• Émise et contrôlée par une Banque Centrale.</li>
                <li>• Offre illimitée, permettant l’impression monétaire (créant de l’inflation).</li>
                <li>• Gérée et stockée par des banques commerciales.</li>
                <li>• Virements transfrontaliers lents, complexes et coûteux.</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
              <h3 className="font-bold text-orange-800 mb-3 text-lg">Cryptomonnaie</h3>
              <ul className="space-y-3 text-orange-700 text-sm">
                <li>• Décentralisée, régie par du code informatique.</li>
                <li>• Offre souvent limitée et transparente (ex: maximum de 21 millions de Bitcoins).</li>
                <li>• Conservée par l’utilisateur lui-même dans un portefeuille cryptographique (wallet).</li>
                <li>• Transactions internationales réalisables en quelques secondes à moindre coût.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-accent-violet" />
            Les différents types de cryptos
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-4">
            <li><strong>Les cryptomonnaies natives (Coins) :</strong> Elles possèdent leur propre blockchain. Exemple : Bitcoin (réserve de valeur) ou Ethereum (plateforme d’exécution pour contrats intelligents ou &quot;smart contracts&quot;).</li>
            <li><strong>Les Stablecoins :</strong> Des cryptos dont la valeur est indexée sur celle d’une monnaie fiduciaire (généralement le dollar américain, comme l’USDT ou l’USDC). Elles offrent les avantages de la blockchain (rapidité, transferts internationaux) sans la volatilité du marché.</li>
            <li><strong>Les Utility Tokens (Jetons utilitaires) :</strong> Ils donnent accès à un service, un produit ou un droit de vote au sein d’un écosystème d’application décentralisée (DApp).</li>
            <li><strong>Les Memecoins :</strong> Des jetons créés souvent autour d’une plaisanterie (comme le Dogecoin). Leur valeur repose essentiellement sur l’engouement communautaire et la viralité sur les réseaux sociaux.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Globe className="h-8 w-8 text-accent-violet" />
            Les cryptos en Afrique
          </h2>
          <p className="text-gray-600 leading-relaxed">
            L’Afrique présente un cas d’usage des cryptomonnaies totalement différent des pays occidentaux. Là où le Nord voit un actif spéculatif ou un investissement technologique, de nombreux pays africains (notamment le Nigeria, le Kenya et le Ghana) utilisent la crypto pour des besoins quotidiens vitaux. Les cryptomonnaies — et plus particulièrement les stablecoins (USDT) — servent de bouclier contre la dévaluation rapide des monnaies locales. Elles facilitent également les envois de fonds de la diaspora (remittances) avec des frais dérisoires par rapport aux acteurs classiques (Western Union, MoneyGram), et permettent aux entreprises de payer des fournisseurs internationaux sans subir les pénuries de dollars imposées par certaines banques centrales. Le marché africain est dominé par les transactions Pair-à-Pair (P2P).
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <ShieldAlert className="h-8 w-8 text-accent-violet" />
            Les risques et arnaques
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Le domaine des cryptomonnaies n’est pas sans danger. La liberté financière qu’il offre s’accompagne d’une responsabilité totale de l’utilisateur. Les principaux risques incluent :
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li><strong>La volatilité :</strong> Le prix des cryptomonnaies non arrimées à une valeur stable peut subir des variations extrêmes en quelques heures.</li>
            <li><strong>Les escroqueries (Scams) :</strong> Les systèmes de Ponzi et les fausses plateformes d’investissement pullulent sur les réseaux sociaux, promettant des rendements garantis irréalistes.</li>
            <li><strong>Les piratages (Hacks) :</strong> Les plateformes d’échanges peuvent être vulnérables aux attaques cybernétiques.</li>
            <li><strong>La perte de clés privées :</strong> Contrairement à une banque où l’on peut réinitialiser son mot de passe, perdre la &quot;Seed Phrase&quot; (les 12 ou 24 mots de sécurité) d’un portefeuille décentralisé signifie la perte irrémédiable de tous les fonds.</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <Lock className="h-8 w-8 text-accent-violet" />
            Crypto vs MNBC
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Face à l’essor des cryptomonnaies, les États ont réagi en créant les Monnaies Numériques de Banque Centrale (MNBC). Bien qu’elles soient toutes deux virtuelles, leurs philosophies s’opposent frontalement. Une cryptomonnaie (comme le Bitcoin) repose sur la décentralisation, la résistance à la censure et un pseudonymat fort. À l’inverse, une MNBC (comme l’eNaira au Nigeria) est une monnaie étatique 100 % centralisée, émise par une institution, où chaque transaction peut théoriquement être tracée, surveillée, voire programmée ou bloquée par le gouvernement.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-3xl font-display font-bold text-secondary mb-5 flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-accent-violet" />
            Le futur des cryptomonnaies
          </h2>
          <p className="text-gray-600 leading-relaxed">
            L’écosystème crypto entre dans une ère de maturité. Le futur s’articule autour de la régulation (comme la loi MiCA en Europe) visant à assainir le marché et rassurer les investisseurs institutionnels. La tendance forte est la &quot;Tokenisation des Actifs Réels&quot; (RWA), qui consiste à utiliser la blockchain pour numériser des actions d’entreprises, de l’immobilier ou des obligations d’État, rendant ces marchés plus liquides et accessibles mondialement. La Finance Décentralisée (DeFi) continuera d’évoluer pour proposer une alternative robuste aux banques, où le code informatique remplace le banquier de confiance.
          </p>
        </section>

      </div>

      {/* Articles Section */}
      <div className="mt-24 pt-10 border-t border-gray-100">
        <h2 className="text-3xl font-display font-bold text-secondary mb-8">
          Articles liés aux Cryptomonnaies
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedArticles.map((a) => (
            <Link key={a.id} href={`/decryptages/${a.id}`}>
              <Card padding="lg" className="h-full flex flex-col group border-gray-100 hover:border-accent-violet-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 rounded-2xl bg-white">
                <div className="flex items-start justify-between mb-5">
                  <Badge variant={a.category === "Crypto" ? "orange" : "violet"} className="font-bold shadow-sm">{a.category}</Badge>
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
