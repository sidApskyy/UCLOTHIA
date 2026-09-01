"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // e.g. -0.15 to 0.2 (negative moves up on scroll down, positive moves down)
  className?: string;
  as?: "div" | "span" | "section";
}

export function Parallax({
  children,
  speed = 0.1,
  className = "",
  as: Tag = "div",
}: ParallaxProps) {
  const containerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let rafId: number | null = null;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Only calculate if visible on screen
      if (rect.bottom >= 0 && rect.top <= viewportHeight) {
        const centerDistance = rect.top + rect.height / 2 - viewportHeight / 2;
        const translateY = centerDistance * speed;
        inner.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
      }
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <Tag ref={containerRef as never} className={`relative overflow-hidden ${className}`}>
      <div
        ref={innerRef}
        className="relative w-full h-full will-change-transform transition-transform duration-75 ease-out"
      >
        {children}
      </div>
    </Tag>
  );
}
