import type { Metadata } from "next";
import { FileText, Clock } from "lucide-react";
import { getAllArticles, formatDate } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Décryptages",
  description: "Articles d'analyse et veille marché sur la fintech et la finance.",
};

export default function DecryptagesPage() {
  const articles = getAllArticles();

  return (
    <div className="px-6 py-10 lg:px-12">
      <div className="max-w-5xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-accent-violet-50 text-accent-violet flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-display font-bold text-secondary">Décryptages</h1>
        </div>
        <p className="text-gray-500 mb-8">Analyses et veille sur l&apos;actualité fintech</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {articles.map((a) => (
            <Card key={a.id} hover accent="violet" padding="md">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="violet" size="sm">{a.categorie}</Badge>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  {a.readTime} min
                </div>
              </div>
              <h2 className="font-semibold text-secondary text-sm mb-2 leading-snug line-clamp-2">{a.titre}</h2>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4">{a.resume}</p>
              <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                <span>{a.auteur}</span>
                <span>{formatDate(a.publishedAt)}</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center">
          <p className="text-gray-400 text-sm">
            Module complet en développement — branche{" "}
            <code className="bg-gray-100 px-2 py-0.5 rounded text-accent-violet text-xs">feature/decryptages</code>
          </p>
        </div>
      </div>
    </div>
  );
}
