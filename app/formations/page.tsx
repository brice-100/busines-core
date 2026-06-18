import type { Metadata } from "next";
import { GraduationCap, Sparkles } from "lucide-react";
import {
  getFilieres,
  getAllMetiers,
  getFiliereTheme,
  getFiliereByNum,
  getMetierById,
} from "@/lib/formations-data";
import { FiliereIcon } from "@/components/modules/formations/FiliereIcon";
import { MetierCard } from "@/components/modules/formations/MetierCard";
import { SideNav, type SideNavItem } from "@/components/modules/formations/SideNav";
import { CursusSection, type Cursus } from "@/components/modules/formations/CursusSection";
import { cn } from "@/lib/utils";

// Classement des 20 métiers par cursus officiel du système camerounais.
// Chaque entrée référence les métiers par leur identifiant global (filière inchangée).
const CURSUS_DEF: {
  id: string;
  titre: string;
  sousTitre: string;
  filieres: { num: number; metierIds: string[] }[];
}[] = [
  {
    id: "cursus-1",
    titre: "Cursus 1 : L'Enseignement Supérieur Professionnel Court (Bac+2)",
    sousTitre:
      "Forme les techniciens opérationnels du secteur financier. Diplômes d'État BTS / HND délivrés dans les instituts privés (IPES) — 2 ans de formation et un stage de 2 à 3 mois. Débouchés : assistants, agents de maîtrise, guichetiers, agents de crédit junior.",
    filieres: [
      { num: 1, metierIds: ["f1-metier-e"] },
      { num: 3, metierIds: ["f3-metier-c"] },
    ],
  },
  {
    id: "cursus-2",
    titre: "Cursus 2 : L'Enseignement Supérieur Universitaire LMD (Bac+3 à Bac+5)",
    sousTitre:
      "Forme les cadres intermédiaires et supérieurs en entreprise et en banque. Licence et Master Professionnels, dans les facultés publiques (FSEG Soa, Douala) et les grandes écoles (ESSEC, UCAC), avec stages de fin de cycle.",
    filieres: [
      { num: 1, metierIds: ["f1-metier-a", "f1-metier-b", "f1-metier-c"] },
      { num: 2, metierIds: ["f2-metier-a", "f2-metier-b", "f2-metier-c", "f2-metier-d"] },
      { num: 3, metierIds: ["f2-metier-e", "f3-metier-a", "f3-metier-b", "f3-metier-d"] },
    ],
  },
  {
    id: "cursus-3",
    titre: "Cursus 3 : Les Grandes Écoles Spécialisées et Inter-États (Bac+3 à Bac+5)",
    sousTitre:
      "Cursus d'élite sous-régional formant les experts hautement quantitatifs et sectoriels de la zone CEMAC. Diplôme d'Ingénieur (ISE) ou Master spécialisé (Assurance), via concours très sélectifs. Instituts basés à Yaoundé : l'ISSEA (statistiques) et l'IIA (assurances).",
    filieres: [
      { num: 3, metierIds: ["f3-metier-e"] },
      { num: 4, metierIds: ["f4-metier-a", "f4-metier-b", "f4-metier-c", "f4-metier-d", "f4-metier-e"] },
    ],
  },
  {
    id: "cursus-4",
    titre: "Cursus 4 : L'Expertise et la Haute Certification (Post-Bac+5)",
    sousTitre:
      "Cursus réglementé octroyant le droit légal de certifier les comptes des entreprises. Diplôme d'Expertise Comptable (DEC) sous l'égide de l'OHADA, accessible après un Master CCA, avec 3 ans de stage en cabinet agréé. Tutelle : l'ONECCA.",
    filieres: [{ num: 1, metierIds: ["f1-metier-d"] }],
  },
];

function buildCursus(): Cursus[] {
  return CURSUS_DEF.map((c) => ({
    id: c.id,
    titre: c.titre,
    sousTitre: c.sousTitre,
    filieres: c.filieres.map((f) => ({
      num: f.num,
      titre: getFiliereByNum(f.num)?.titre ?? `Filière ${f.num}`,
      metiers: f.metierIds.map((id) => {
        const m = getMetierById(id);
        return { id, nom: m?.nom ?? id };
      }),
    })),
  }));
}

export const metadata: Metadata = {
  title: "Formations",
  description:
    "L'univers des formations en finance au Cameroun : filières, métiers et établissements de référence, programme détaillé matière par matière.",
};

export default function FormationsPage() {
  const filieres = getFilieres();
  const totalMetiers = getAllMetiers().length;
  const cursus = buildCursus();

  const navItems: SideNavItem[] = [
    ...filieres.map((f) => ({
      id: f.id,
      label: f.titre,
      sublabel: `Filière ${f.numero}`,
    })),
    { id: "cursus", label: "Les Cursus", sublabel: "Parcours officiels" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative mb-12 overflow-hidden rounded-3xl bg-indigo-700 px-10 py-14 text-white shadow-lg lg:px-14 lg:py-20">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-indigo-400/20 blur-3xl" />
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
        <div className="flex flex-col gap-14">
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

                <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                  {filiere.metiers.map((metier) => (
                    <MetierCard key={metier.id} metier={metier} />
                  ))}
                </div>
              </section>
            );
          })}

          {/* Onglet Cursus : classement par parcours officiels (aligné sur les métiers) */}
          <CursusSection cursus={cursus} />
        </div>
      </div>

      {/* Note de bas de page */}
      <p className="mt-14 flex items-start gap-3 rounded-2xl bg-gray-50 p-6 text-xs leading-relaxed text-gray-500">
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
