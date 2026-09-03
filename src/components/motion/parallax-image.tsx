"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  objectPosition?: string;
  speed?: number;
}

export function ParallaxImage({
  src,
  alt,
  priority = false,
  sizes = "100vw",
  className = "",
  objectPosition = "center",
  speed = 0.3,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Only apply parallax when the element is in or near the viewport
        if (rect.bottom > 0 && rect.top < windowHeight) {
          const scrolled = window.scrollY;
          const elementTop = ref.current.offsetTop;
          setOffset((scrolled - elementTop) * speed);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${offset}px, 0) scale(1.15)`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${className}`}
          style={{ objectPosition }}
        />
      </div>
    </div>
  );
}
