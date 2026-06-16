import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { ShieldAlert, ShieldCheck, PenTool, User } from 'lucide-react';
import type { UserRole } from '@/types';

interface RoleBadgeProps {
  role: UserRole;
  isBanned?: boolean;
}

export function RoleBadge({ role, isBanned }: RoleBadgeProps) {
  if (isBanned) {
    return (
      <Badge variant="gray" className="bg-red-50 text-red-600 border-red-100 font-bold flex items-center gap-1">
        <ShieldAlert className="h-3 w-3" />
        Banni
      </Badge>
    );
  }

  switch (role) {
    case 'administrateur':
      return (
        <Badge variant="violet" className="font-bold flex items-center gap-1 shadow-sm">
          <ShieldCheck className="h-3 w-3" />
          Admin
        </Badge>
      );
    case 'blogueur':
      return (
        <Badge variant="primary" className="font-bold flex items-center gap-1 shadow-sm">
          <PenTool className="h-3 w-3" />
          Blogueur
        </Badge>
      );
    case 'utilisateur':
    case 'visiteur':
    default:
      return (
        <Badge variant="gray" className="font-semibold flex items-center gap-1">
          <User className="h-3 w-3" />
          Utilisateur
        </Badge>
      );
  }
}
