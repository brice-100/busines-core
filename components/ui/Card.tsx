/**
 * Card — Composant carte réutilisable Business Core
 *
 * Usage :
 * <Card>...</Card>
 * <Card hover accent="green" padding="lg">...</Card>
 *
 * ⚠️  Ne pas modifier sans accord de l'équipe.
 */

import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type AccentColor = "green" | "violet" | "orange" | "rose" | "cyan" | "indigo" | "primary" | "none";
type CardPadding = "sm" | "md" | "lg" | "none";

// On étend HTMLAttributes pour supporter nativement toutes les props d'un div classique (style, id, aria-*, etc.)
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  accent?: AccentColor;
  padding?: CardPadding;
  onClick?: () => void;
}

const accentBorderMap: Record<AccentColor, string> = {
  green: "border-l-4 border-l-accent-green",
  violet: "border-l-4 border-l-accent-violet",
  orange: "border-l-4 border-l-accent-orange",
  rose: "border-l-4 border-l-accent-rose",
  cyan: "border-l-4 border-l-accent-cyan",
  indigo: "border-l-4 border-l-accent-indigo",
  primary: "border-l-4 border-l-primary",
  none: "",
};

const paddingMap: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className,
  hover = false,
  accent = "none",
  padding = "md",
  onClick,
  ...props // Récupère le reste des attributs (ex: style, id, etc.)
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-xl overflow-hidden shadow-card border border-gray-100",
        paddingMap[padding], // Grâce au nouveau cn(), cette classe sera écrasée si doublon dans className
        accentBorderMap[accent],
        hover &&
          "transition duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer",
        onClick && "cursor-pointer",
        className // Ton className personnalisé prend désormais le contrôle absolu
      )}
      {...props} // Transmet proprement les props à la div HTML
    >
      {children}
    </div>
  );
}

// Sous-composants pour une composition propre
export function CardHeader({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-6 pb-6 border-b border-gray-100", className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props}>{children}</div>;
}

export function CardFooter({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-6 pt-6 border-t border-gray-100", className)} {...props}>
      {children}
    </div>
  );
}