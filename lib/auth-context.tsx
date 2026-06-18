"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { User, UserRole } from "@/types";
import defaultUsers from "@/data/utilisateurs.json";

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
  getAllUsers: () => User[];
  toggleBanStatus: (userId: string) => void;
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
const LS_LOGIN_ATTEMPTS_KEY = "bc_login_attempts";

const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000;

// Simulation d'un JWT et expiration
const TOKEN_EXPIRATION_HOURS = 24;

// Fonction utilitaire pour simuler un hash
const hashPassword = (password: string) => {
  // Ceci est un mock frontend. NE JAMAIS utiliser ça en prod.
  return typeof window !== "undefined" ? btoa(password + "_salt_123") : password;
};

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

  // Lire la liste des utilisateurs dans localStorage
  const getUsers = useCallback((): User[] => {
    try {
      const raw = localStorage.getItem(LS_USERS_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
      
      // Initialisation avec les données par défaut si vide
      const mockUsers = defaultUsers.map(u => ({ 
        ...u, 
        password: hashPassword(u.password) 
      })) as User[];
      
      localStorage.setItem(LS_USERS_KEY, JSON.stringify(mockUsers));
      return mockUsers;
    } catch {
      return [];
    }
  }, []);

  // Sauvegarder la liste des utilisateurs
  const saveUsers = useCallback((users: User[]) => {
    localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
  }, []);

  // Charger l'utilisateur courant au montage
  useEffect(() => {
    try {
      getUsers(); // S'assurer que les utilisateurs par défaut sont chargés

      const stored = localStorage.getItem(LS_CURRENT_KEY);
      if (stored) {
        const session = JSON.parse(stored);
        
        // Vérification de l'expiration du token simulé
        if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
          console.warn("Session expirée.");
          localStorage.removeItem(LS_CURRENT_KEY);
          setCurrentUser(null);
        } else if (session.user) {
          // Re-fetch fresh user to check ban status
          const freshUsers = getUsers();
          const freshUser = freshUsers.find(u => u.id === session.user.id);
          
          if (freshUser && freshUser.isBanned) {
            console.warn("Utilisateur banni.");
            localStorage.removeItem(LS_CURRENT_KEY);
            setCurrentUser(null);
          } else {
            setCurrentUser(freshUser || session.user);
          }
        } else {
          // Backward compatibility
          setCurrentUser({ ...session, password: "***" });
        }
      }
    } catch {
      // session corrompue
      localStorage.removeItem(LS_CURRENT_KEY);
    } finally {
      setIsLoading(false);
    }
  }, [getUsers]);

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
        password: hashPassword(password),
        role,
        createdAt: new Date().toISOString(),
      };

      saveUsers([...users, newUser]);

      // Connecter automatiquement après inscription
      const safeUser = { ...newUser, password: "***" };
      
      const token = btoa(`${safeUser.id}_mock_token_${Date.now()}`);
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + TOKEN_EXPIRATION_HOURS);

      const session = {
        user: safeUser,
        token,
        expiresAt: expiresAt.toISOString()
      };

      localStorage.setItem(LS_CURRENT_KEY, JSON.stringify(session));
      setCurrentUser(safeUser);

      return { success: true };
    },
    [getUsers, saveUsers]
  );

  // --------------------------------------------------
  // login()
  // --------------------------------------------------
  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      const attemptsStr = localStorage.getItem(LS_LOGIN_ATTEMPTS_KEY);
      let attempts = attemptsStr ? JSON.parse(attemptsStr) : { count: 0, lockUntil: null };

      if (attempts.lockUntil) {
        const lockUntilDate = new Date(attempts.lockUntil);
        if (new Date() < lockUntilDate) {
          const diffMs = lockUntilDate.getTime() - new Date().getTime();
          const diffMinutes = Math.ceil(diffMs / 60000);
          return { success: false, error: `Trop de tentatives. Veuillez patienter ${diffMinutes} minute(s).` };
        } else {
          attempts = { count: 0, lockUntil: null };
          localStorage.removeItem(LS_LOGIN_ATTEMPTS_KEY);
        }
      }

      if (!email.trim() || !password.trim()) {
        return { success: false, error: "E-mail et mot de passe requis." };
      }

      const users = getUsers();
      const hashedAttempt = hashPassword(password);
      const found = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === hashedAttempt
      );

      if (!found) {
        attempts.count += 1;
        if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
          attempts.lockUntil = new Date(new Date().getTime() + LOCKOUT_DURATION_MS).toISOString();
        }
        localStorage.setItem(LS_LOGIN_ATTEMPTS_KEY, JSON.stringify(attempts));

        if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
          return { success: false, error: `Trop de tentatives. Veuillez patienter 5 minutes.` };
        }

        return { success: false, error: "E-mail ou mot de passe incorrect." };
      }

      localStorage.removeItem(LS_LOGIN_ATTEMPTS_KEY);

      if (found.isBanned) {
        return { success: false, error: "Ce compte a été suspendu par l'administration." };
      }

      const safeUser = { ...found, password: "***" };
      
      // Simulation de JWT
      const token = btoa(`${safeUser.id}_mock_token_${Date.now()}`);
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + TOKEN_EXPIRATION_HOURS);

      const session = {
        user: safeUser,
        token,
        expiresAt: expiresAt.toISOString()
      };

      localStorage.setItem(LS_CURRENT_KEY, JSON.stringify(session));
      setCurrentUser(safeUser);
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

  // --------------------------------------------------
  // Admin functions
  // --------------------------------------------------
  const toggleBanStatus = useCallback((userId: string) => {
    const users = getUsers();
    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        if (u.role === "administrateur") return u; // Empêche de bannir un administrateur
        return { ...u, isBanned: !u.isBanned };
      }
      return u;
    });
    saveUsers(updatedUsers);
    
    // If the banned user is the current user, log them out immediately
    if (currentUser?.id === userId && updatedUsers.find(u => u.id === userId)?.isBanned) {
      logout();
    }
  }, [getUsers, saveUsers, currentUser, logout]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        register,
        logout,
        getAllUsers: getUsers,
        toggleBanStatus,
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
