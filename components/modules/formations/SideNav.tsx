"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface SideNavItem {
  id: string;
  label: string;
  sublabel?: string;
}

interface SideNavProps {
  title: string;
  items: SideNavItem[];
}

/**
 * Menu latéral d'ancrage avec scroll-spy.
 * Les items pointent vers des sections id={item.id} dans la page.
 */
export function SideNav({ title, items }: SideNavProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const handler = () => {
      const offset = window.innerHeight * 0.25;
      let current = items[0]?.id ?? "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) {
          current = item.id;
        }
      }
      setActiveId(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [items]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-6">
      <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
        {title}
      </p>
      <ul className="space-y-1">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  "block rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                  active
                    ? "bg-primary-50 font-semibold text-primary-700"
                    : "text-gray-500 hover:bg-gray-100 hover:text-secondary"
                )}
              >
                <span className="block leading-snug">{item.label}</span>
                {item.sublabel && (
                  <span className="mt-0.5 block text-xs text-gray-400">
                    {item.sublabel}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
