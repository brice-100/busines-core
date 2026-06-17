import type { Metadata } from "next";
<<<<<<< HEAD
import Link from "next/link";
import { BookOpen, Clock, Layers } from "lucide-react";
import { getAllFormations } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
=======
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
>>>>>>> 3308c2635c71608418fa2327db226e7e3f4d6a83

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

<<<<<<< HEAD
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formations.map((f) => (
            <Link key={f.id} href={`/formations/${f.id}`} className="group">
              <Card padding="none" className="flex flex-col overflow-hidden hover:border-accent-green-200 transition-colors">
                <div className="p-6 flex-1 flex flex-col relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-green-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <Badge variant="green" className="font-bold tracking-wide">{f.categorie}</Badge>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                    f.niveau === "Débutant" ? "bg-blue-50 text-blue-600" :
                    f.niveau === "Intermédiaire" ? "bg-orange-50 text-orange-600" :
                    "bg-purple-50 text-purple-600"
                  }`}>
                    {f.niveau}
                  </span>
                </div>

                <h2 className="font-display font-bold text-secondary text-lg mb-3 leading-snug group-hover:text-accent-green transition-colors relative z-10">
                  {f.titre}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1 relative z-10">
                  {f.description}
                </p>

                <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mt-auto pt-4 border-t border-gray-100 relative z-10">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {f.duree}
=======
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
>>>>>>> 3308c2635c71608418fa2327db226e7e3f4d6a83
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
<<<<<<< HEAD
                </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
=======
                </header>
>>>>>>> 3308c2635c71608418fa2327db226e7e3f4d6a83

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
