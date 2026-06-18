import type { Metadata } from "next";
import { CheckCircle2, Target, Users, Zap } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez notre mission, notre vision et notre équipe chez BusinessCore.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

        {/* Left Column - Content */}
        <div className="w-full lg:w-1/2">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide mb-6">
            NOTRE MISSION
          </div>

          <h1 className="text-4xl lg:text-5xl font-display font-bold text-secondary leading-tight mb-8">
            Démocratiser l'accès à l'éducation <span className="text-primary">financière.</span>
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-16">
            BusinessCore est né d'une conviction simple : la finance et la technologie financière (fintech) doivent être accessibles à tous. Nous construisons la plateforme de référence pour former la prochaine génération d'experts financiers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Value 1 */}
            <div className="flex gap-6">
              <div className="h-12 w-12 rounded-xl bg-accent-violet-50 flex items-center justify-center flex-shrink-0">
                <Target className="h-6 w-6 text-accent-violet" />
              </div>
              <div>
                <h3 className="font-bold text-secondary mb-2">Notre Vision</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Devenir le pont entre l'éducation traditionnelle et les réalités du marché de l'emploi fintech.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="flex gap-6">
              <div className="h-12 w-12 rounded-xl bg-accent-green-50 flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-accent-green" />
              </div>
              <div>
                <h3 className="font-bold text-secondary mb-2">Communauté</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Un espace d'échange, de mentorat et d'apprentissage collaboratif pour tous.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-accent-orange-50 flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-accent-orange" />
              </div>
              <div>
                <h3 className="font-bold text-secondary mb-2">Innovation</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Des contenus toujours à la pointe des dernières technologies (Blockchain, IA).
                </p>
              </div>
            </div>

            {/* Value 4 */}
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-accent-cyan-50 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-accent-cyan" />
              </div>
              <div>
                <h3 className="font-bold text-secondary mb-2">Excellence</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Une qualité de contenu validée par des experts de l'industrie.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
            <Image
              src="/images/building.png"
              alt="Bâtiment moderne BusinessCore"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-[200px] animate-float">
            <p className="text-3xl font-display font-bold text-primary mb-1">2027</p>
            <p className="text-sm text-gray-500 font-medium leading-tight">Lancement officiel de la plateforme</p>
          </div>
        </div>

      </div>
    </div>
  );
}
