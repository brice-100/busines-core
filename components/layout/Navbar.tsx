"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Bell, User, LogIn, UserPlus, Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";

export function Navbar() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/explorer?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-secondary/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 lg:hidden transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar />
      </div>

      {/* Top navbar */}
      <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white/90 backdrop-blur-md border-b border-gray-100 z-20 transition-all duration-300">
        <div className="flex items-center gap-4 h-full px-4 lg:px-6">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une formation, un article…"
                className={cn(
                  "w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200",
                  "bg-surface focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100",
                  "placeholder:text-gray-400 transition-all duration-200"
                )}
                aria-label="Recherche globale"
              />
            </div>
          </form>

          <div className="flex items-center gap-2 ml-auto">
            {isAuthenticated && currentUser ? (
              <>
                {/* Notifications */}
                <button
                  className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors relative"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent-rose" />
                </button>

                {/* Avatar */}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-secondary">
                    {currentUser.prenom}
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Button variant="ghost" href="/login" size="sm" leftIcon={<LogIn className="h-4 w-4" />}>
                  <span className="hidden sm:inline">Se connecter</span>
                </Button>
                <Button variant="primary" href="/register" size="sm" leftIcon={<UserPlus className="h-4 w-4" />}>
                  <span className="hidden sm:inline">S&apos;inscrire</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
