"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticProps {
  children: ReactNode;
  strength?: number; // Distance multiplier (default 0.3)
  className?: string;
  as?: "div" | "span";
}

export function Magnetic({
  children,
  strength = 0.3,
  className = "",
  as: Tag = "div",
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    el.style.transform = `translate3d(${distanceX.toFixed(2)}px, ${distanceY.toFixed(2)}px, 0)`;
    el.style.transition = "transform 120ms cubic-bezier(0.16, 1, 0.3, 1)";
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;

    el.style.transform = "translate3d(0, 0, 0)";
    el.style.transition = "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)";
  };

  return (
    <Tag
      ref={ref as never}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </Tag>
  );
}
