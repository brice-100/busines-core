/**
 * Badge — Étiquette colorée Business Core
 *
 * Usage :
 *   <Badge>Débutant</Badge>
 *   <Badge variant="green">Formations</Badge>
 *   <Badge variant="violet" size="lg">Nouveau</Badge>
 *
 * ⚠️  Ne pas modifier sans accord de l'équipe.
 */

import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "primary"
  | "secondary"
  | "green"
  | "violet"
  | "orange"
  | "rose"
  | "cyan"
  | "indigo"
  | "gray";

type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  dot?: boolean;
}

const variantMap: Record<BadgeVariant, string> = {
  primary: "bg-primary-100 text-primary-700",
  secondary: "bg-secondary-100 text-secondary-700",
  green: "bg-accent-green-50 text-accent-green-600",
  violet: "bg-accent-violet-50 text-accent-violet-500",
  orange: "bg-accent-orange-50 text-accent-orange-600",
  rose: "bg-accent-rose-50 text-accent-rose-500",
  cyan: "bg-accent-cyan-50 text-accent-cyan-500",
  indigo: "bg-accent-indigo-50 text-accent-indigo-500",
  gray: "bg-gray-100 text-gray-600",
};

const sizeMap: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
};

export function Badge({
  children,
  variant = "primary",
  size = "md",
  className,
  dot,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full",
        variantMap[variant],
        sizeMap[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full bg-current opacity-80"
          )}
        />
      )}
      {children}
    </span>
  );
}
