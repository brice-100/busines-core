import React from "react";
import Link from "next/link";
import { TrendingUp, Twitter, Linkedin, Github, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white/70 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">
                Business<span className="text-primary-300">Core</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              La plateforme éducative de référence sur la fintech et la finance pour les étudiants
              et professionnels africains et francophones.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" aria-label="Twitter" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" aria-label="GitHub" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Email" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Modules */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Modules</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/formations", label: "Formations" },
                { href: "/decryptages", label: "Décryptages" },
                { href: "/carrieres", label: "Carrières" },
                { href: "/innovation", label: "Innovation" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Infos */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Infos</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/a-propos", label: "À propos" },
                { href: "/juniors", label: "Juniors" },
                { href: "/explorer", label: "Explorer" },
                { href: "/adja", label: "Assistant Adja" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {year} BusinessCore — Projet éducatif. Tous droits réservés.</p>
          <p className="text-white/40">Fait avec ❤️ par l&apos;équipe réseau</p>
        </div>
      </div>
    </footer>
  );
}
