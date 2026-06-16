"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !currentUser) {
        router.push("/login");
        return;
      }

      if (currentUser.isBanned) {
        logout();
        alert("Votre compte a été suspendu par l'administration.");
        router.push("/login");
        return;
      }

      // Redirections spécifiques selon le rôle
      if (pathname === "/dashboard") {
        if (currentUser.role === "administrateur") {
          router.push("/dashboard/admin");
        } else if (currentUser.role === "blogueur") {
          router.push("/dashboard/blogueur");
        }
      } else if (pathname.startsWith("/dashboard/admin") && currentUser.role !== "administrateur") {
        router.push("/dashboard");
      } else if (pathname.startsWith("/dashboard/blogueur") && currentUser.role !== "blogueur" && currentUser.role !== "administrateur") {
        router.push("/dashboard");
      }
    }
  }, [isLoading, isAuthenticated, currentUser, router, pathname, logout]);

  if (isLoading || !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
