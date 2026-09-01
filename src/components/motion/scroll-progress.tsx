"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let rafId: number | null = null;

    const update = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

      bar.style.transform = `scaleX(${progress})`;
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[1.5px] z-[9998] pointer-events-none bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-[var(--color-accent)] via-[#e2c882] to-[var(--color-accent)] origin-left will-change-transform scale-x-0 transition-transform duration-75 ease-out"
      />
    </div>
  );
}
