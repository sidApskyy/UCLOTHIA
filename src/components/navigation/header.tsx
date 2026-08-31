"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/data/navigation";
import { useCartStore } from "@/lib/stores/cart-store";
import { MegaMenu } from "./mega-menu";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const count = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrolled(currentY > 20);

          if (currentY > lastScrollY && currentY > 100) {
            // scrolling down — hide header
            setHidden(true);
          } else {
            // scrolling up — show header
            setHidden(false);
          }

          lastScrollY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveMenu(null);
    setMobileOpen(false);
  }

  const handleNavEnter = useCallback((label: string) => {
    setActiveMenu(label);
  }, []);

  const handleNavLeave = useCallback(() => {
    setActiveMenu(null);
  }, []);

  const isSolid = scrolled || hovered || activeMenu !== null;
  const heroPaths = [
    "/",
    "/house",
    "/private-client",
    "/weddings",
  ];
  const hasHero = heroPaths.includes(pathname) ||
    /^\/collections\/[^/]+$/.test(pathname) ||
    /^\/stores\/[^/]+$/.test(pathname) ||
    /^\/journal\/[^/]+$/.test(pathname) ||
    /^\/lookbook\/[^/]+$/.test(pathname);
  const isTransparent = hasHero && !isSolid;

  const linkColor = isTransparent
    ? "text-white/80 hover:text-white"
    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]";
  const activeLinkColor = isTransparent
    ? "text-white"
    : "text-[var(--color-text)]";
  const iconColor = isTransparent
    ? "text-white/80 hover:text-white"
    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]";
  const hamburgerColor = isTransparent ? "bg-white" : "bg-[var(--color-text)]";
  const logoFilter = isTransparent ? "brightness-0 invert" : "brightness-0";
  const logoHeight = scrolled ? "h-14 md:h-16" : "h-20 md:h-24";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[var(--z-header)] transition-all duration-[var(--duration-medium)] ${
          hidden && !hovered ? "-translate-y-full" : "translate-y-0"
        } ${
          isSolid
            ? "bg-[var(--color-background)]/95 backdrop-blur-md border-b border-[var(--color-border)]"
            : "bg-transparent"
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          handleNavLeave();
        }}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Mobile menu button */}
            <button
              className={`md:hidden flex flex-col gap-[5px] p-2 -ml-2`}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className={`w-6 h-[1px] ${hamburgerColor}`} />
              <span className={`w-6 h-[1px] ${hamburgerColor}`} />
              <span className={`w-4 h-[1px] ${hamburgerColor}`} />
            </button>

            {/* Desktop nav — left */}
            <nav
              className="hidden md:flex items-center gap-10"
              onMouseLeave={handleNavLeave}
            >
              {navigation.slice(0, 4).map((item) => (
                <div
                  key={item.label}
                  onMouseEnter={() => handleNavEnter(item.label)}
                >
                  <Link
                    href={item.href}
                    aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                    className={`text-[0.8125rem] font-medium tracking-[0.14em] uppercase transition-colors duration-[var(--duration-medium)] link-underline ${
                      pathname.startsWith(item.href)
                        ? activeLinkColor
                        : linkColor
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Logo — center */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 z-10"
              aria-label="UCLOTHIA — Home"
            >
              <Image
                src="/logo.png"
                alt="UCLOTHIA"
                width={120}
                height={48}
                className={`${logoHeight} w-auto transition-all duration-[var(--duration-medium)] ${logoFilter}`}
                priority
              />
            </Link>

            {/* Desktop nav — right */}
            <nav className="hidden md:flex items-center gap-10">
              {navigation.slice(4).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className={`text-[0.8125rem] font-medium tracking-[0.12em] uppercase transition-colors duration-[var(--duration-medium)] link-underline ${
                    pathname.startsWith(item.href)
                      ? activeLinkColor
                      : linkColor
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Utility icons — right */}
            <div className="flex items-center gap-4 md:gap-5">
              <Link
                href="/search"
                className={`${iconColor} transition-colors`}
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </Link>
              <Link
                href="/wishlist"
                className={`hidden md:block ${iconColor} transition-colors`}
                aria-label="Wishlist"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </Link>
              <button
                onClick={openCart}
                className={`relative ${iconColor} transition-colors`}
                aria-label="Shopping bag"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {count > 0 && (
                  <span className={`absolute -top-1.5 -right-1.5 text-[0.625rem] font-medium w-4 h-4 rounded-full flex items-center justify-center ${
                    isTransparent
                      ? "bg-white text-[var(--color-text)]"
                      : "bg-[var(--color-text)] text-[var(--color-background)]"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega menu */}
        {activeMenu && (
          <MegaMenu
            item={navigation.find((n) => n.label === activeMenu)}
            onLeave={handleNavLeave}
          />
        )}
      </header>

      {/* Mobile menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
