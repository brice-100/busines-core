"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LockKeyhole, Sparkles, ChevronRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [nomComplet, setNomComplet] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const [prenom, ...nomParts] = nomComplet.split(" ");
      const nom = nomParts.join(" ") || "Inconnu";

      const success = register({ nom, prenom, email, password });
      if (success) {
        router.push("/dashboard");
      } else {
        setError("Cet email est déjà utilisé.");
      }
    } catch (err) {
      setError("Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row-reverse gap-10 items-center justify-center">
        
        {/* Form Section */}
        <div className="flex-1 w-full max-w-md bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="mb-10 text-center">
            <div className="mx-auto h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <LockKeyhole className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-secondary mb-2">Créer un compte</h1>
            <p className="text-sm text-gray-500">Rejoignez la communauté BusinessCore</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <Input
                label="Nom complet"
                type="text"
                value={nomComplet}
                onChange={(e) => setNomComplet(e.target.value)}
                placeholder="Ex: Jean Dupont"
                required
                fullWidth
              />

              <Input
                label="Email professionnel"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@entreprise.com"
                required
                fullWidth
              />
              
              <Input
                label="Mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                fullWidth
              />

              <Input
                label="Confirmer le mot de passe"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                fullWidth
              />
            </div>

            {error && <p className="text-sm text-red-500 font-medium bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}

            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              fullWidth 
              isLoading={isLoading}
              className="mt-4 shadow-lg shadow-primary/30 rounded-xl"
            >
              S'inscrire
            </Button>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500 font-medium">
                Vous avez déjà un compte ?{" "}
                <Link href="/login" className="text-primary font-bold hover:underline inline-flex items-center gap-1">
                  Se connecter <ChevronRight className="h-3 w-3" />
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Decorative Section (Hidden on mobile) */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-center pr-10 border-r border-gray-200">
          <div className="text-center max-w-sm">
            <div className="inline-flex items-center justify-center p-4 bg-accent-orange-50 rounded-2xl mb-6">
              <Sparkles className="h-10 w-10 text-accent-orange" />
            </div>
            <h2 className="text-2xl font-display font-bold text-secondary mb-4">L'excellence financière</h2>
            <p className="text-gray-500 leading-relaxed">
              Rejoignez des milliers de professionnels et d'étudiants. Formez-vous aux enjeux de demain, développez votre réseau et propulsez votre carrière.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
