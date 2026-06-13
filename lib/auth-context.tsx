"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { User, UserRole } from "@/types";

// ===================================================
// Types du contexte d'authentification
// ===================================================
interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface RegisterData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
}

// ===================================================
// Clés localStorage
// ===================================================
const LS_USERS_KEY = "bc_users";
const LS_CURRENT_KEY = "bc_current_user";

// ===================================================
// Contexte
// ===================================================
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ===================================================
// Provider
// ===================================================
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger l'utilisateur courant au montage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_CURRENT_KEY);
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch {
      // session corrompue
      localStorage.removeItem(LS_CURRENT_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Lire la liste des utilisateurs dans localStorage
  const getUsers = useCallback((): User[] => {
    try {
      const raw = localStorage.getItem(LS_USERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, []);

  // Sauvegarder la liste des utilisateurs
  const saveUsers = useCallback((users: User[]) => {
    localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
  }, []);

  // --------------------------------------------------
  // register()
  // --------------------------------------------------
  const register = useCallback(
    async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
      const { nom, prenom, email, password, confirmPassword, role = "utilisateur" } = data;

      if (!nom.trim() || !prenom.trim() || !email.trim() || !password.trim()) {
        return { success: false, error: "Tous les champs sont obligatoires." };
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { success: false, error: "Adresse e-mail invalide." };
      }
      if (password.length < 6) {
        return { success: false, error: "Le mot de passe doit contenir au moins 6 caractères." };
      }
      if (password !== confirmPassword) {
        return { success: false, error: "Les mots de passe ne correspondent pas." };
      }

      const users = getUsers();
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, error: "Un compte avec cet e-mail existe déjà." };
      }

      const newUser: User = {
        id: `u_${Date.now()}`,
        nom: nom.trim(),
        prenom: prenom.trim(),
        email: email.toLowerCase().trim(),
        password, // ⚠️ Simulation uniquement — ne jamais faire ça en production
        role,
        createdAt: new Date().toISOString(),
      };

      saveUsers([...users, newUser]);

      // Connecter automatiquement après inscription
      const { password: _pwd, ...safeUser } = newUser;
      const userToStore = { ...newUser };
      localStorage.setItem(LS_CURRENT_KEY, JSON.stringify(userToStore));
      setCurrentUser(newUser);

      return { success: true };
    },
    [getUsers, saveUsers]
  );

  // --------------------------------------------------
  // login()
  // --------------------------------------------------
  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      if (!email.trim() || !password.trim()) {
        return { success: false, error: "E-mail et mot de passe requis." };
      }

      const users = getUsers();
      const found = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!found) {
        return { success: false, error: "E-mail ou mot de passe incorrect." };
      }

      localStorage.setItem(LS_CURRENT_KEY, JSON.stringify(found));
      setCurrentUser(found);
      return { success: true };
    },
    [getUsers]
  );

  // --------------------------------------------------
  // logout()
  // --------------------------------------------------
  const logout = useCallback(() => {
    localStorage.removeItem(LS_CURRENT_KEY);
    setCurrentUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ===================================================
// Hook useAuth
// ===================================================
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth() doit être utilisé à l'intérieur d'un <AuthProvider>");
  }
  return ctx;
}
