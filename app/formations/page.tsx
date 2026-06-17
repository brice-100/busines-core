import type { Metadata } from "next";
import { GraduationCap, Sparkles } from "lucide-react";
import {
  getFilieres,
  getAllMetiers,
  getFiliereTheme,
} from "@/lib/formations-data";
import { FiliereIcon } from "@/components/modules/formations/FiliereIcon";
import { MetierCard } from "@/components/modules/formations/MetierCard";
import { SideNav, type SideNavItem } from "@/components/modules/formations/SideNav";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Formations",
  description:
    "L'univers des formations en finance au Cameroun : filières, métiers et établissements de référence, programme détaillé matière par matière.",
};

export default function FormationsPage() {
  const filieres = getFilieres();
  const totalMetiers = getAllMetiers().length;

  const navItems: SideNavItem[] = filieres.map((f) => ({
    id: f.id,
    label: f.titre,
    sublabel: `Filière ${f.numero}`,
  }));

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative mb-20 overflow-hidden rounded-3xl bg-blue-700 px-10 py-14 text-white shadow-lg lg:px-14 lg:py-20">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Univers Formation
          </span>
          <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight lg:text-5xl">
            Les métiers de la finance au Cameroun
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 lg:text-base">
            Un guide complet des filières, métiers et établissements de référence
            en finance, comptabilité, banque et assurance — avec le cursus détaillé,
            matière par matière, pour chaque parcours.
          </p>
          <div className="mt-8 flex flex-wrap gap-8">
            <Stat value={filieres.length} label="Filières" />
            <Stat value={totalMetiers} label="Métiers" />
            <Stat value="CEMAC" label="Zone couverte" />
          </div>
        </div>
      </section>

      {/* Contenu : menu latéral + sections */}
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[230px_1fr]">
        {/* Menu latéral (desktop) */}
        <aside className="hidden lg:block">
          <SideNav title="Filières" items={navItems} />
        </aside>

        {/* Sections par filière */}
        <div className="flex flex-col gap-20">
          {filieres.map((filiere) => {
            const theme = getFiliereTheme(filiere.numero);
            return (
              <section key={filiere.id} id={filiere.id} className="scroll-mt-6">
                <header className="mb-8 flex items-start gap-5">
                  <div
                    className={cn(
                      "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl",
                      theme.bgSoft,
                      theme.text
                    )}
                  >
                    <FiliereIcon numero={filiere.numero} className="h-6 w-6" />
                  </div>
                  <div>
                    <p className={cn("text-xs font-bold uppercase tracking-wider", theme.text)}>
                      Filière {filiere.numero}
                    </p>
                    <h2 className="font-display text-xl font-bold text-secondary lg:text-2xl">
                      {filiere.titre}
                    </h2>
                    {filiere.sousTitre && (
                      <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-gray-500">
                        {filiere.sousTitre}
                      </p>
                    )}
                  </div>
                </header>

                <div className="grid grid-cols-1 gap-10 xl:grid-cols-2">
                  {filiere.metiers.map((metier) => (
                    <MetierCard key={metier.id} metier={metier} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Note de bas de page */}
      <p className="mt-20 flex items-start gap-3 rounded-2xl bg-gray-50 p-6 text-xs leading-relaxed text-gray-500">
        <GraduationCap className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
        Les volumes horaires sont des estimations pédagogiques basées sur les
        standards LMD appliqués au Cameroun. Ils peuvent varier d&apos;un
        établissement à l&apos;autre et d&apos;une année à l&apos;autre.
      </p>
    </div>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold lg:text-3xl">{value}</div>
      <div className="text-xs uppercase tracking-wide text-white/60">{label}</div>
    </div>
  );
}
