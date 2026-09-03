"use client";

import { useEffect, useRef } from "react";

interface LineDrawProps {
  width?: string;
  className?: string;
  delay?: number;
}

export function LineDraw({ width = "4rem", className = "", delay = 0 }: LineDrawProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.setProperty("--line-draw-width", width);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add("is-visible"), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [width, delay]);

  return <span ref={ref} className={`line-draw block h-px bg-[var(--color-border-strong)] ${className}`} />;
}
