import { Building2, Landmark, TrendingUp, ShieldCheck, GraduationCap, type LucideIcon } from "lucide-react";

const ICONS: Record<number, LucideIcon> = {
  1: Building2,
  2: Landmark,
  3: TrendingUp,
  4: ShieldCheck,
};

interface FiliereIconProps {
  numero: number;
  className?: string;
}

export function FiliereIcon({ numero, className }: FiliereIconProps) {
  const Icon = ICONS[numero] ?? GraduationCap;
  return <Icon className={className} />;
}
