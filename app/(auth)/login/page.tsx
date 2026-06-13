"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, TrendingUp, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error ?? "Erreur de connexion.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-bold text-white text-xl">
              Business<span className="text-primary-300">Core</span>
            </span>
          </Link>
          <h1 className="mt-6 text-2xl font-display font-bold text-white">Bon retour !</h1>
          <p className="mt-1 text-white/60 text-sm">Connectez-vous à votre espace</p>
        </div>

        {/* Card formulaire */}
        <div className="glass rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <Input
              label="Adresse e-mail"
              type="email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4" />}
              autoComplete="email"
              required
            />

            <Input
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Masquer" : "Afficher"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              autoComplete="current-password"
              required
            />

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-100">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              rightIcon={<LogIn className="h-4 w-4" />}
            >
              Se connecter
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-4 p-3 rounded-xl bg-primary-50 border border-primary-100">
            <p className="text-xs text-primary-700 font-medium mb-1">Compte démo :</p>
            <p className="text-xs text-primary-600">admin@businesscore.com / admin2024</p>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Pas encore de compte ?{" "}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline inline-flex items-center gap-1"
            >
              S&apos;inscrire <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          <Link href="/" className="hover:text-white/60 transition-colors">
            ← Continuer sans connexion
          </Link>
        </p>
      </div>
    </div>
  );
}
