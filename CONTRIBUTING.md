# Guide de contribution — BusinessCore

Bienvenue dans l'équipe ! Ce guide explique comment contribuer au projet **BusinessCore** sans créer de conflits avec les autres membres.

---

## 1. Structure du projet

```
business-core/
├── app/                    ← Pages Next.js (App Router)
├── components/
│   ├── ui/                 ← Composants partagés ⚠️ NE PAS MODIFIER sans accord
│   ├── layout/             ← Sidebar, Navbar, Footer ⚠️ NE PAS MODIFIER sans accord
│   └── modules/            ← VOS composants spécifiques (un sous-dossier par module)
├── lib/                    ← AuthContext, mock-data, utils
├── data/                   ← Fichiers JSON mockés
├── types/                  ← Interfaces TypeScript partagées
└── tailwind.config.ts      ← Tokens de design ⚠️ NE PAS MODIFIER sans accord
```

---

## 2. Workflow Git — une branche par module

### Nommage des branches
```
feature/<nom-du-module>
```

Exemples :
```bash
git checkout -b feature/formations
git checkout -b feature/decryptages
git checkout -b feature/carrieres
git checkout -b feature/innovation
git checkout -b feature/juniors
git checkout -b feature/pratiques
git checkout -b feature/explorer
git checkout -b feature/dashboard
git checkout -b feature/a-propos
git checkout -b feature/adja
```

### Workflow complet
```bash
# 1. Partir de main à jour
git checkout main
git pull origin main

# 2. Créer votre branche
git checkout -b feature/mon-module

# 3. Développer votre module
# ... coder ...

# 4. Commiter régulièrement
git add .
git commit -m "feat(mon-module): description courte des changements"

# 5. Pousser et créer une Pull Request
git push origin feature/mon-module
```

---

## 3. Où placer votre code

### Pages
```
app/<votre-module>/page.tsx
```
Exemple : `app/formations/page.tsx`

### Composants spécifiques à votre module
```
components/modules/<votre-module>/NomComposant.tsx
```
Exemple : `components/modules/formations/FormationCard.tsx`

### Données supplémentaires
Ajoutez vos données dans les fichiers existants de `/data/` (ne créez pas de nouveaux fichiers JSON sans accord).

---

## 4. Règles de non-modification ⚠️

Les fichiers suivants **NE DOIVENT PAS être modifiés** sans validation de toute l'équipe (via PR + review) :

| Fichier / Dossier | Raison |
|---|---|
| `tailwind.config.ts` | Tokens de couleur partagés — une modification casse tous les modules |
| `components/ui/` | Composants UI utilisés par tout le monde |
| `components/layout/` | Sidebar et Navbar communes |
| `lib/auth-context.tsx` | Authentification partagée |
| `types/index.ts` | Interfaces TypeScript partagées |
| `app/layout.tsx` | Layout racine |
| `app/globals.css` | Styles globaux |

Si vous avez besoin d'un changement sur ces fichiers, **ouvrez une issue ou discutez-en avec le groupe d'abord**.

---

## 5. Utiliser les composants UI partagés

Toujours importer depuis `@/components/ui/` :

```tsx
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
```

### Button
```tsx
// Variantes : primary | outline | ghost | danger
// Tailles   : sm | md | lg
<Button variant="primary" size="md">Cliquer</Button>
<Button variant="outline" href="/formations">Lien</Button>
<Button variant="primary" isLoading>Chargement</Button>
```

### Card
```tsx
// Accent colors : green | violet | orange | rose | cyan | indigo | primary
<Card hover accent="green" padding="md">
  <CardHeader>Titre</CardHeader>
  <CardBody>Contenu</CardBody>
</Card>
```

### Badge
```tsx
// Variantes : primary | green | violet | orange | rose | cyan | indigo | gray
<Badge variant="green">Débutant</Badge>
<Badge variant="violet" size="lg" dot>Nouveau</Badge>
```

---

## 6. Tokens de couleur à utiliser

Toujours utiliser les classes Tailwind issues de `tailwind.config.ts` :

```
text-primary          → Bleu principal (#2563eb)
bg-secondary          → Bleu marine foncé (#0f1e3d)
text-accent-green     → Vert (#10b981) — Formations
text-accent-violet    → Violet (#7c3aed) — Décryptages
text-accent-orange    → Orange (#f59e0b) — Pratiques
text-accent-rose      → Rose (#ec4899) — Juniors
text-accent-cyan      → Cyan (#06b6d4) — Carrières
text-accent-indigo    → Indigo (#6366f1) — Innovation
bg-surface            → Fond clair (#f8fafc)
bg-background         → Fond général (#eef2ff)
```

**Ne jamais hardcoder une couleur inline** (`style={{ color: "#2563eb" }}`). Utilisez toujours les classes Tailwind.

---

## 7. TypeScript — utiliser les types partagés

```tsx
import type { Formation, Article, Metier, User } from "@/types";
```

---

## 8. Accéder aux données mockées

```tsx
import { getAllFormations, getArticleById, formatDate } from "@/lib/mock-data";

const formations = getAllFormations();
const article = getArticleById("a1");
```

---

## 9. Authentification

```tsx
"use client";
import { useAuth } from "@/lib/auth-context";

export function MonComposant() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  // ...
}
```

---

## 10. Conventions de nommage

- **Composants** : `PascalCase.tsx` (ex: `FormationCard.tsx`)
- **Hooks** : `use` + camelCase (ex: `useFormations.ts`)
- **Fichiers page** : toujours `page.tsx` (convention Next.js App Router)
- **Commits** : `feat(module): message` / `fix(module): message` / `style(module): message`

---

## 11. Checklist avant Pull Request

- [ ] Mon code compile sans erreur TypeScript (`npm run build`)
- [ ] Pas de `console.log` non intentionnel
- [ ] J'ai utilisé les composants UI partagés (pas de CSS inline)
- [ ] J'ai utilisé les tokens Tailwind (pas de couleurs hardcodées)
- [ ] J'ai testé sur mobile (responsive)
- [ ] Je n'ai pas modifié les fichiers protégés listés en section 4

---

*Bonne collaboration à toute l'équipe ! 🚀*
