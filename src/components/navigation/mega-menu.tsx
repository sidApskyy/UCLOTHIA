"use client";

import Link from "next/link";
import Image from "next/image";
import type { NavItem } from "@/lib/types";

interface MegaMenuProps {
  item: NavItem | undefined;
  onLeave: () => void;
}

export function MegaMenu({ item, onLeave }: MegaMenuProps) {
  if (!item?.megaMenu) return null;

  const { columns, featured } = item.megaMenu;

  return (
    <div
      className="absolute top-full left-0 right-0 bg-[var(--color-surface)] border-b border-[var(--color-border)] z-[var(--z-mega-menu)] animate-mega-menu"
      onMouseEnter={() => {}}
      onMouseLeave={onLeave}
    >
      <div className="container-luxury py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1.2fr] gap-8 md:gap-12">
          {columns.map((col) => (
            <div key={col.title} className="mega-menu-col">
              <h3 className="text-eyebrow mb-5 text-[var(--color-text)]">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.875rem] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-[var(--duration-fast)] link-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {featured && (
            <Link href={featured.href} className="group block mega-menu-col">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-surface-alt)] image-hover">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[0.8125rem] font-medium tracking-[0.05em] text-[var(--color-text)]">
                  {featured.title}
                </span>
                <span className="text-eyebrow group-hover:text-[var(--color-text)] transition-colors">
                  Explore
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
