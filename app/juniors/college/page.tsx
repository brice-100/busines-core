import type { Metadata } from "next";
import { BookOpen, Clock, Layers } from "lucide-react";
import Image from "next/image";
import { getAllCollegeCourses } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Collège - Juniors",
  description: "Parcours éducatif complet pour les élèves du collège. Maîtrisez les bases de l'argent et de la finance.",
};

const pills = ["Tous", "Fondamentaux", "Pratique", "Banque", "Gestion", "Économie", "Sécurité"];

export default function CollegePage() {
  const courses = getAllCollegeCourses();

  return (
    <div className="flex flex-col">
      <div className="w-full">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shadow-inner">
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-secondary">Collège</h1>
          </div>
          <p className="text-gray-500 max-w-2xl text-sm lg:text-base">
            Découvrez les bases de l'argent et de la finance adaptées à ton niveau. Des explications simples, des exemples concrets, et des questions pour progresser.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {pills.map((pill, i) => (
            <button 
              key={pill}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                i === 0 
                  ? "bg-secondary text-white shadow-lg shadow-secondary/20" 
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link 
              key={course.id}
              href={`/juniors/college/${course.id}`}
            >
              <Card padding="none" className="group overflow-hidden hover:border-blue-200 transition-colors cursor-pointer h-full hover:shadow-lg">
                <div className="relative">
                  <div className="h-44 w-full bg-blue-50 relative">
                    <Image
                      src={`/images/juniors/college/${course.id}.png`}
                      alt={course.titre}
                      fill
                      className="object-cover"
                      placeholder="empty"
                    />
                  </div>
                  <div className="p-6 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary" className="font-bold tracking-wide">{course.categorie}</Badge>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                        course.niveau === "Débutant" ? "bg-blue-50 text-blue-600" :
                        course.niveau === "Intermédiaire" ? "bg-orange-50 text-orange-600" :
                        "bg-purple-50 text-purple-600"
                      }`}>
                        {course.niveau}
                      </span>
                    </div>

                    <h2 className="font-display font-bold text-secondary text-lg mb-2 leading-snug group-hover:text-blue-500 transition-colors">
                      {course.titre}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mt-2 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {course.duree}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Layers className="h-4 w-4" />
                        {course.modules} sections
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
