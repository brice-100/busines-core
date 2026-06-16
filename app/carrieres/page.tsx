import type { Metadata } from "next";
import { Briefcase, Compass, Route } from "lucide-react";
import { getCarrieres, getFiliereTheme } from "@/lib/carrieres-data";
import { FiliereIcon } from "@/components/modules/formations/FiliereIcon";
import { CarriereCard } from "@/components/modules/carrieres/CarriereCard";
import { SideNav, type SideNavItem } from "@/components/modules/formations/SideNav";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Carrières",
  description:
    "Les carrières de la finance au Cameroun, métier par métier : où se former, quel cursus suivre et quels grades atteindre au fil de sa carrière.",
};

export default function CarrieresPage() {
  const metiers = getCarrieres();

  // Regroupement par filière
  const filieres = Array.from(
    metiers.reduce((map, m) => {
      const arr = map.get(m.filiereNum) ?? [];
      arr.push(m);
      map.set(m.filiereNum, arr);
      return map;
    }, new Map<number, typeof metiers>())
  ).sort(([a], [b]) => a - b);

  const navItems: SideNavItem[] = filieres.map(([num, list]) => ({
    id: `filiere-${num}`,
    label: list[0].filiereTitre,
    sublabel: `Filière ${num}`,
  }));

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-hero px-8 py-12 text-white shadow-lg lg:px-12 lg:py-16">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-accent-cyan-400/20 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
            <Briefcase className="h-4 w-4" />
            Univers Carrières
          </span>
          <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight lg:text-5xl">
            Construire sa carrière dans la finance
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 lg:text-base">
            Pour chaque métier : où se former et quel cursus suivre, puis les
            grades que l&apos;on peut atteindre au fil de sa carrière — du premier
            poste jusqu&apos;aux fonctions de direction.
          </p>
          <div className="mt-8 flex flex-wrap gap-8">
            <Stat icon={<Compass className="h-4 w-4" />} value={metiers.length} label="Métiers" />
            <Stat
              icon={<Route className="h-4 w-4" />}
              value={metiers.reduce((n, m) => n + m.evolution.length, 0)}
              label="Étapes de carrière"
            />
          </div>
        </div>
      </section>

      {/* Menu latéral + sections */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[230px_1fr]">
        <aside className="hidden lg:block">
          <SideNav title="Filières" items={navItems} />
        </aside>

        <div className="flex flex-col gap-14">
          {filieres.map(([num, list]) => {
            const theme = getFiliereTheme(num);
            return (
              <section key={num} id={`filiere-${num}`} className="scroll-mt-6">
                <header className="mb-6 flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl",
                      theme.bgSoft,
                      theme.text
                    )}
                  >
                    <FiliereIcon numero={num} className="h-6 w-6" />
                  </div>
                  <div>
                    <p className={cn("text-xs font-bold uppercase tracking-wider", theme.text)}>
                      Filière {num}
                    </p>
                    <h2 className="font-display text-xl font-bold text-secondary lg:text-2xl">
                      {list[0].filiereTitre}
                    </h2>
                  </div>
                </header>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {list.map((metier) => (
                    <CarriereCard key={metier.id} metier={metier} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
        {icon}
      </span>
      <div>
        <div className="font-display text-2xl font-bold leading-none lg:text-3xl">{value}</div>
        <div className="mt-1 text-xs uppercase tracking-wide text-white/60">{label}</div>
      </div>
    </div>
  );
}
