"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children?: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "span" | "p" | "h1" | "h2" | "h3";
  variant?: "fade-up" | "fade" | "clip" | "mask" | "line" | "image" | "mask-sweep" | "mask-sweep-up";
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  variant = "fade-up",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.add("is-visible");
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const variantClass = {
    "fade-up": "reveal",
    fade: "reveal-fade",
    clip: "clip-reveal",
    mask: "reveal-mask",
    line: "reveal-line",
    image: "reveal-image",
    "mask-sweep": "reveal-mask-sweep",
    "mask-sweep-up": "reveal-mask-sweep-up",
  }[variant];

  return (
    <Tag ref={ref as never} className={`${variantClass} ${className}`}>
      {variant === "mask" ? (
        <span className="reveal-mask-inner block">{children}</span>
      ) : (
        children
      )}
    </Tag>
  );
}
