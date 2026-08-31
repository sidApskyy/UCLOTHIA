"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Look } from "@/lib/types";

interface LookbookScrollProps {
  looks: Look[];
}

export function LookbookScroll({ looks }: LookbookScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const animationRef = useRef<number>(0);
  const directionRef = useRef(1);

  // Auto-scroll animation
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const animate = () => {
      if (!isHovered && !isDragging && container) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        container.scrollLeft += directionRef.current * 0.4;

        if (container.scrollLeft >= maxScroll - 1) {
          directionRef.current = -1;
        } else if (container.scrollLeft <= 1) {
          directionRef.current = 1;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isHovered, isDragging]);

  // Track active card based on scroll position
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = container.clientWidth > 768 ? 360 + 32 : 280 + 24;
      const idx = Math.round(container.scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(idx, 0), looks.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [looks.length]);

  // Pointer drag / swipe handlers
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, scrollLeft: container.scrollLeft };
    container.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const container = scrollRef.current;
    if (!container || !isDragging) return;
    const delta = e.clientX - dragStart.current.x;
    container.scrollLeft = dragStart.current.scrollLeft - delta;
  }, [isDragging]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    setIsDragging(false);
    if (container.hasPointerCapture(e.pointerId)) {
      container.releasePointerCapture(e.pointerId);
    }
  }, []);

  const scrollToCard = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.clientWidth > 768 ? 360 + 32 : 280 + 24;
    container.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  }, []);

  return (
    <div className="relative">
      {/* Edge fade gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[var(--color-background)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[var(--color-background)] to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        className="horizontal-scroll cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="flex gap-6 md:gap-8 pl-6 md:pl-12 pr-6 md:pr-12 pb-2" style={{ width: "max-content" }}>
          {looks.map((look, i) => (
            <Link
              key={look.id}
              href={`/lookbook/${look.slug}`}
              className="group flex-shrink-0 w-[280px] md:w-[360px] transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)]"
              style={{
                opacity: Math.abs(i - activeIndex) > 2 ? 0.4 : 1,
                transform: `scale(${i === activeIndex ? 1 : 0.95})`,
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={look.image}
                  alt={look.imageAlt}
                  fill
                  sizes="360px"
                  className="object-cover object-[center_30%] transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)] group-hover:from-black/80 rounded-2xl" />

                {/* Top accent line on hover */}
                <span className="absolute top-0 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:w-full rounded-2xl" />

                {/* Number — top left with decorative line */}
                <div className="absolute top-5 left-5 flex items-center gap-3">
                  <span className="text-[0.625rem] font-medium tracking-[0.2em] text-white/50 transition-colors duration-[var(--duration-medium)] group-hover:text-white/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-0 bg-white/40 transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:w-6" />
                </div>

                {/* Overlay content — bottom centered */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 text-center">
                  <div className="transition-transform duration-[var(--duration-medium)] ease-[var(--ease-out)] group-hover:-translate-y-2">
                    <h3 className="font-display text-xl md:text-2xl text-white font-light leading-[1.1] mb-4">
                      {look.name}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-3 text-[0.625rem] font-medium tracking-[0.25em] uppercase text-white/50 group-hover:text-white transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)]">
                    <span className="h-px w-6 bg-white/30 transition-all duration-[var(--duration-medium)] group-hover:w-10 group-hover:bg-white/70" />
                    Shop the Look
                    <span className="transition-transform duration-[var(--duration-medium)] group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Slider dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {looks.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            className="group/dot p-2"
            aria-label={`Go to look ${i + 1}`}
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)] ${
                i === activeIndex
                  ? "w-8 bg-[var(--color-text)]"
                  : "w-1.5 bg-[var(--color-border-strong)] group-hover/dot:bg-[var(--color-muted)]"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
