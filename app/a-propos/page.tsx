import type { Metadata } from "next";
import { Info, Users, Target, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez l'équipe et la mission de BusinessCore.",
};

export default function AProposPage() {
  return (
    <div className="px-6 py-10 lg:px-12">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
            <Info className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-display font-bold text-secondary">À propos</h1>
        </div>
        <p className="text-gray-500 mb-8">Notre mission et notre équipe</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {[
            { icon: Target, title: "Notre mission", desc: "Démocratiser l'éducation financière et rendre la fintech accessible à tous." },
            { icon: Users, title: "L'équipe", desc: "Un groupe d'étudiants passionnés de finance et de technologie." },
            { icon: Globe, title: "Notre vision", desc: "Devenir la référence francophone en éducation fintech et finance." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card text-center">
                <div className="h-12 w-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="font-semibold text-secondary mb-2">{item.title}</h2>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center">
          <p className="text-gray-400 text-sm">
            Page complète en développement — branche{" "}
            <code className="bg-gray-100 px-2 py-0.5 rounded text-primary text-xs">feature/a-propos</code>
          </p>
        </div>
      </div>
    </div>
  );
}
