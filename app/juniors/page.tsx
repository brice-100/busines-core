import type { Metadata } from "next";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Juniors",
  description: "Ressources fintech et finance spécialement conçues pour les étudiants.",
};

export default function JuniorsPage() {
  return (
    <div className="px-6 py-10 lg:px-12">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-accent-rose-50 text-accent-rose flex items-center justify-center">
            <Users className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-display font-bold text-secondary">Juniors</h1>
        </div>
        <p className="text-gray-500 mb-8">Ressources spécialement conçues pour les étudiants et jeunes professionnels</p>

        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
          <div className="h-16 w-16 rounded-2xl bg-accent-rose-50 text-accent-rose flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-semibold text-secondary mb-2">Module en construction</h2>
          <p className="text-gray-400 text-sm max-w-sm mx-auto">
            Le module Juniors est en cours de développement. Il proposera des parcours adaptés aux étudiants.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-rose-50 text-accent-rose-500 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-rose animate-pulse" />
            Branche : feature/juniors
          </div>
        </div>
      </div>
    </div>
  );
}
