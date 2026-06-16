/**
 * Card — Composant carte réutilisable Business Core
 *
 * Usage :
 *   <Card>...</Card>
 *   <Card hover accent="green" padding="lg">...</Card>
 *
 * ⚠️  Ne pas modifier sans accord de l'équipe.
 */

import React from "react";
import { cn } from "@/lib/utils";

type AccentColor = "green" | "violet" | "orange" | "rose" | "cyan" | "indigo" | "primary" | "none";
type CardPadding = "sm" | "md" | "lg" | "none";

interface CardProps {
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
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-xl overflow-hidden shadow-card border border-gray-100",
        paddingMap[padding],
        accentBorderMap[accent],
        hover &&
          "transition duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

// Sous-composants pour une composition propre
export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 pb-6 border-b border-gray-100", className)}>{children}</div>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("", className)}>{children}</div>;
}

export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-6 pt-6 border-t border-gray-100", className)}>{children}</div>
  );
}
