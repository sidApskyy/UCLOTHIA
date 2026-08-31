"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { navigation } from "@/lib/data/navigation";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-[var(--color-overlay)] z-[var(--z-mobile-menu)] transition-opacity duration-[var(--duration-medium)] md:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-full max-w-sm bg-[var(--color-surface)] z-[var(--z-mobile-menu)] overflow-y-auto transition-transform duration-[var(--duration-medium)] md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ transitionTimingFunction: "var(--ease-out)" }}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-[var(--color-border)]">
          <Image src="/logo.png" alt="UCLOTHIA" width={100} height={40} className="h-10 w-auto brightness-0" />
          <button
            onClick={onClose}
            className="p-2.5 -mr-2.5 text-[var(--color-text)] hover:text-[var(--color-muted)] transition-colors"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="px-5 py-6">
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full border-b border-[var(--color-border)] py-3 text-[0.9375rem] bg-transparent focus:border-[var(--color-text)] outline-none transition-colors"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                aria-label="Submit search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </div>
          </form>
          <ul className="space-y-1">
            <li className={open ? "animate-[fadeUp_400ms_var(--ease-out)_0ms_forwards] opacity-0" : ""}>
              <Link
                href="/new"
                className="block py-3.5 text-[0.9375rem] font-medium tracking-[0.05em] uppercase text-[var(--color-text)]"
                onClick={onClose}
              >
                New
              </Link>
            </li>
            {navigation.map((item, idx) => (
              <li key={item.label} className={open ? `animate-[fadeUp_400ms_var(--ease-out)_${60 + idx * 60}ms_forwards] opacity-0` : ""}>
                {item.megaMenu ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full py-3.5 text-[0.9375rem] font-medium tracking-[0.05em] uppercase text-[var(--color-text)]"
                      onClick={() =>
                        setExpanded(expanded === item.label ? null : item.label)
                      }
                      aria-expanded={expanded === item.label}
                    >
                      {item.label}
                      <svg
                        className={`transition-transform duration-[var(--duration-fast)] ${
                          expanded === item.label ? "rotate-180" : ""
                        }`}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    {expanded === item.label && (
                      <ul className="pl-4 pb-3 space-y-2 animate-[fadeUp_400ms_var(--ease-out)_forwards]">
                        {item.megaMenu.columns.map((col) => (
                          <li key={col.title}>
                            <p className="text-eyebrow mt-3 mb-2">{col.title}</p>
                            <ul className="space-y-2">
                              {col.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className="block py-1 text-[0.875rem] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                                    onClick={onClose}
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-3.5 text-[0.9375rem] font-medium tracking-[0.05em] uppercase text-[var(--color-text)]"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-[var(--color-border)] space-y-4">
            <Link
              href="/lookbook"
              className="block text-[0.8125rem] tracking-[0.1em] uppercase text-[var(--color-text-secondary)]"
              onClick={onClose}
            >
              Lookbook
            </Link>
            <Link
              href="/journal"
              className="block text-[0.8125rem] tracking-[0.1em] uppercase text-[var(--color-text-secondary)]"
              onClick={onClose}
            >
              Journal
            </Link>
            <Link
              href="/house"
              className="block text-[0.8125rem] tracking-[0.1em] uppercase text-[var(--color-text-secondary)]"
              onClick={onClose}
            >
              The House
            </Link>
            <Link
              href="/search"
              className="block text-[0.8125rem] tracking-[0.1em] uppercase text-[var(--color-text-secondary)]"
              onClick={onClose}
            >
              Search
            </Link>
            <Link
              href="/wishlist"
              className="block text-[0.8125rem] tracking-[0.1em] uppercase text-[var(--color-text-secondary)]"
              onClick={onClose}
            >
              Wishlist
            </Link>
            <Link
              href="/cart"
              className="block text-[0.8125rem] tracking-[0.1em] uppercase text-[var(--color-text-secondary)]"
              onClick={onClose}
            >
              Shopping Bag
            </Link>
            <Link
              href="/private-client"
              className="block text-[0.8125rem] tracking-[0.1em] uppercase text-[var(--color-accent)]"
              onClick={onClose}
            >
              Private Client
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
