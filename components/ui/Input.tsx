/**
 * Input — Composant champ de saisie Business Core
 *
 * Usage :
 *   <Input label="Email" type="email" placeholder="ex: contact@businesscore.com" />
 *   <Input label="Mot de passe" type="password" error="Champ requis" />
 *
 * ⚠️  Ne pas modifier sans accord de l'équipe.
 */

import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  fullWidth?: boolean;
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightElement,
  fullWidth = true,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={cn("flex flex-col gap-2", fullWidth && "w-full")}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-[15px] font-bold text-[#1e293b] mb-1.5 ml-2"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3.5 text-gray-400 pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            "w-full rounded-full border bg-white px-6 py-4 text-[15px] text-secondary outline-none shadow-sm",
            "placeholder:text-gray-400 transition-all duration-200",
            "focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20",
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-100"
              : "border-gray-200 hover:border-gray-300",
            !!leftIcon && "pl-10",
            !!rightElement && "pr-10",
            className
          )}
          {...props}
        />
        {rightElement && (
          <span className="absolute right-3.5 text-gray-400">{rightElement}</span>
        )}
      </div>

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
