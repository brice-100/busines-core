"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, UserPlus, TrendingUp, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { UserRole } from "@/types";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "utilisateur" as UserRole,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await register(form);
    setIsLoading(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error ?? "Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-lg animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-bold text-white text-xl">
              Business<span className="text-primary-300">Core</span>
            </span>
          </Link>
          <h1 className="mt-6 text-2xl font-display font-bold text-white">Créer un compte</h1>
          <p className="mt-1 text-white/60 text-sm">Rejoignez la communauté BusinessCore</p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Prénom"
                type="text"
                placeholder="Marie"
                value={form.prenom}
                onChange={update("prenom")}
                leftIcon={<User className="h-4 w-4" />}
                autoComplete="given-name"
                required
              />
              <Input
                label="Nom"
                type="text"
                placeholder="Dupont"
                value={form.nom}
                onChange={update("nom")}
                autoComplete="family-name"
                required
              />
            </div>

            <Input
              label="Adresse e-mail"
              type="email"
              placeholder="vous@exemple.com"
              value={form.email}
              onChange={update("email")}
              leftIcon={<Mail className="h-4 w-4" />}
              autoComplete="email"
              required
            />

            <Input
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              placeholder="6 caractères minimum"
              value={form.password}
              onChange={update("password")}
              leftIcon={<Lock className="h-4 w-4" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              hint="Au moins 6 caractères"
              autoComplete="new-password"
              required
            />

            <Input
              label="Confirmer le mot de passe"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={update("confirmPassword")}
              leftIcon={<Lock className="h-4 w-4" />}
              autoComplete="new-password"
              required
            />

            {/* Rôle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-secondary-600">Rôle</label>
              <select
                value={form.role}
                onChange={update("role")}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-secondary focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              >
                <option value="visiteur">Visiteur</option>
                <option value="utilisateur">Utilisateur</option>
                <option value="administrateur">Administrateur</option>
              </select>
            </div>

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
              rightIcon={<UserPlus className="h-4 w-4" />}
              className="mt-2"
            >
              Créer mon compte
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Déjà inscrit ?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline inline-flex items-center gap-1"
            >
              Se connecter <ArrowRight className="h-3.5 w-3.5" />
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
