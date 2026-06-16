/**
 * Button — Composant bouton réutilisable Business Core
 *
 * Variantes : primary | outline | ghost | danger
 * Tailles   : sm | md | lg
 *
 * Usage :
 *   <Button variant="primary" size="md" onClick={...}>Texte</Button>
 *   <Button variant="outline" href="/formations">Voir tout</Button>
 *
 * ⚠️  Ne pas modifier ce composant sans accord de l'équipe.
 */

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-glow focus-visible:ring-primary-400",
  outline:
    "border-1 border-primary text-primary bg-transparent hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-primary-400",
  ghost:
    "bg-transparent text-secondary hover:bg-secondary-50 active:bg-secondary-100 focus-visible:ring-secondary-300",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-400",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-6 py-3 text-sm gap-2",
  lg: "px-7 py-3.5 text-base gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";

  const classes = cn(
    base,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className
  );

  const content = (
    <>
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-1 border-current border-t-transparent" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {content}
    </button>
  );
}
