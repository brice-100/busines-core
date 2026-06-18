import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getAllFormations, getFormationById } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllFormations().map((f) => ({ id: f.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const formation = getFormationById(id);
  if (!formation) return { title: "Formation introuvable" };
  return { title: formation.titre, description: formation.description };
}

export default async function FormationDetail({ params }: PageProps) {
  const { id } = await params;
  const formation = getFormationById(id);
  if (!formation) notFound();

  return (
    <div className="flex flex-col">
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/formations" className="hover:text-primary">
          Formations
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-secondary">{formation.titre}</span>
      </nav>

      <Card padding="lg" className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-secondary mb-2">{formation.titre}</h1>
        <p className="text-sm text-gray-600 mb-4">{formation.description}</p>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="text-xs text-gray-500">Catégorie: <strong className="text-gray-700">{formation.categorie}</strong></div>
          <div className="text-xs text-gray-500">Niveau: <strong className="text-gray-700">{formation.niveau}</strong></div>
          <div className="text-xs text-gray-500">Durée: <strong className="text-gray-700">{formation.duree}</strong></div>
          <div className="text-xs text-gray-500">Modules: <strong className="text-gray-700">{formation.modules}</strong></div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card padding="lg">
          <h2 className="font-bold mb-2">Aperçu rapide</h2>
          <p className="text-sm text-gray-600">{formation.description}</p>
        </Card>

        <Card padding="lg">
          <h2 className="font-bold mb-2">Détails</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><strong>Auteur:</strong> {formation.auteur}</li>
            <li><strong>Publié le:</strong> {formation.publishedAt}</li>
            <li><strong>Tags:</strong> {formation.tags?.join(", ")}</li>
          </ul>
        </Card>

        <Card padding="lg" className="flex flex-col justify-center items-start">
          <h2 className="font-bold mb-4">Commencer</h2>
          <Button className="w-full">Commencer la formation</Button>
          <Link href={`/formations`} className="mt-3 text-sm text-gray-500 underline">Retour aux formations</Link>
        </Card>
      </div>
    </div>
  );
}
