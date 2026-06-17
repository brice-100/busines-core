"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UserCheck, Shield, ChevronRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const result = await login(email, password);
      if (result.success) {
        // La redirection est gérée par le DashboardLayout
        router.push("/dashboard");
      } else {
        setError(result.error || "Identifiants incorrects.");
      }
    } catch (err) {
      setError("Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center justify-center">
        
        {/* Form Section */}
        <div className="flex-1 w-full max-w-md bg-white p-6 sm:p-8 rounded-xl overflow-hidden shadow-card border border-gray-100 min-w-0">
          <div className="mb-8 text-center space-y-2">
            <div className="mx-auto h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <UserCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold text-secondary mb-2">Bon retour</h1>
            <p className="text-sm text-gray-500">Veuillez vous connecter à votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="space-y-6">
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
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="h-5 w-5 rounded-md border-2 border-gray-300 bg-white peer-checked:bg-[#2563eb] peer-checked:border-[#2563eb] transition-all"></div>
                  <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600 font-medium select-none group-hover:text-secondary">Se souvenir de moi</span>
              </label>

              <Link href="#" className="text-sm font-bold text-[#2563eb] hover:text-blue-700 transition-colors">
                Mot de passe oublié ?
              </Link>
            </div>

            {error && <p className="text-sm text-red-500 font-medium bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}

            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              fullWidth 
              isLoading={isLoading}
              className="mt-8 shadow-lg shadow-primary/30 rounded-full"
            >
              Se connecter
            </Button>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500 font-medium">
                Vous n'avez pas de compte ?{" "}
                <Link href="/register" className="text-primary font-bold hover:underline inline-flex items-center gap-1">
                  S'inscrire <ChevronRight className="h-3 w-3" />
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Decorative Section (Hidden on mobile) */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-center pl-10 border-l border-gray-200">
          <div className="text-center max-w-sm">
            <div className="inline-flex items-center justify-center p-4 bg-accent-violet-50 rounded-2xl mb-6">
              <Shield className="h-10 w-10 text-accent-violet" />
            </div>
            <h2 className="text-2xl font-display font-bold text-secondary mb-4">Espace sécurisé</h2>
            <p className="text-gray-500 leading-relaxed">
              Vos données sont chiffrées de bout en bout. Accédez à vos formations, votre progression et vos outils de simulation en toute sécurité.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
