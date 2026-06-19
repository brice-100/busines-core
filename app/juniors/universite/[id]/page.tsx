import type { Metadata } from "next";
import { getUniversiteCourseById } from "@/lib/mock-data";
import { ArrowLeft, Clock, Layers, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: "Cours - Université",
  description: "Contenu éducatif universitaire",
};

export default async function CourseDetailPage({ params }: PageProps) {
  const { id } = await params;
  const course = getUniversiteCourseById(id);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full">
      <div className="mb-8">
        <Link href="/juniors/universite">
          <button className="flex items-center gap-2 text-secondary hover:text-green-600 transition-colors mb-6 font-semibold">
            <ArrowLeft className="h-5 w-5" />
            Retour aux cours
          </button>
        </Link>

        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-secondary">
                {course.titre}
              </h1>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              {course.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Badge variant="secondary" className="font-semibold">
            {course.categorie}
          </Badge>
          <span className={`text-sm font-semibold px-3 py-1 rounded-md ${
            course.niveau === "Débutant" ? "bg-blue-50 text-blue-600" :
            course.niveau === "Intermédiaire" ? "bg-orange-50 text-orange-600" :
            "bg-purple-50 text-purple-600"
          }`}>
            {course.niveau}
          </span>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">{course.duree}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Layers className="h-4 w-4" />
            <span className="text-sm font-medium">{course.modules} sections</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {course.tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Table of contents */}
      <div className="mt-6 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Sommaire</h3>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-2">
            {course.sections.map((s, i) => {
              const slug = `${i + 1}-${s.titre.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
              return (
                <li key={i}>
                  <a href={`#${slug}`} className="text-accent hover:underline text-sm">{s.titre}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        {course.sections.map((section, index) => {
          const id = `${index + 1}-${section.titre.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
          return (
          <div 
            id={id}
            key={index}
            className="bg-white rounded-2xl border border-gray-100 p-8 hover:border-green-200 transition-colors"
          >
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <h2 className="text-2xl font-display font-bold text-secondary">
                  {section.titre}
                </h2>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-base font-semibold text-gray-700 mb-3">📚 Explication</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {section.contenu}
              </p>
            </div>

            <div className="mb-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
              <h3 className="text-base font-semibold text-gray-800 mb-3">💡 Exemple</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {section.exemple}
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
              <h3 className="text-base font-semibold text-gray-800 mb-4">❓ Questions pour tester ta compréhension</h3>
              <ul className="space-y-3">
                {section.questions.map((question, qIndex) => (
                  <li key={qIndex} className="flex gap-3">
                    <span className="text-purple-600 font-bold flex-shrink-0">•</span>
                    <p className="text-gray-700">{question}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
            );
          })}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm text-gray-500 mb-4 sm:mb-0">
          <p>Cours créé par <span className="font-semibold text-gray-700">{course.auteur}</span></p>
          <p>Publié le {new Date(course.publishedAt).toLocaleDateString("fr-FR")}</p>
        </div>
        <Link href="/juniors/universite">
          <Button variant="outline" className="rounded-full">
            ← Voir les autres cours
          </Button>
        </Link>
      </div>
    </div>
  );
}
