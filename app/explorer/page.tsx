import type { Metadata } from "next";
import { Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Explorer",
  description: "Explorez l'écosystème fintech et finance sur BusinessCore.",
};

export default function ExplorerPage() {
  return (
    <div className="px-6 py-10 lg:px-12">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
            <Compass className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-display font-bold text-secondary">Explorer</h1>
        </div>
        <p className="text-gray-500 mb-8 ml-13">Naviguez dans l&apos;écosystème fintech et finance</p>

        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
          <div className="h-16 w-16 rounded-2xl bg-primary-50 text-primary flex items-center justify-center mx-auto mb-4">
            <Compass className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-semibold text-secondary mb-2">Module en construction</h2>
          <p className="text-gray-400 text-sm max-w-sm mx-auto">
            Ce module est en cours de développement par l&apos;équipe. Revenez bientôt !
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Branche : feature/explorer
          </div>
        </div>
      </div>
    </div>
  );
}
