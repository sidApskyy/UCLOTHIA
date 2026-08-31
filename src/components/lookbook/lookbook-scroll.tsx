"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Look } from "@/lib/types";

interface LookbookScrollProps {
  looks: Look[];
}

const AUTO_ADVANCE_MS = 1200; // ms between card changes
const DRAG_THRESHOLD = 12;
const MOMENTUM_DECAY = 0.92;
const RESUME_DELAY = 5000;
const MAX_VISUAL_DISTANCE = 2.8;
const MIN_SCALE = 0.82;
const MIN_OPACITY = 0.35;

export function LookbookScroll({ looks }: LookbookScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const displayLooks = [...looks, ...looks];

  const dragState = useRef({
    startX: 0,
    startY: 0,
    startScroll: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    hasMoved: false,
    isPointerDown: false,
  });

  const strideRef = useRef(0);
  const firstSetWidthRef = useRef(0);

  const updateStride = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return;
    const first = track.children[0].getBoundingClientRect();
    const second = track.children[1].getBoundingClientRect();
    strideRef.current = second.left - first.left;
    firstSetWidthRef.current = strideRef.current * looks.length;
  }, [looks.length]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    updateStride();
    window.addEventListener("resize", updateStride);
    return () => window.removeEventListener("resize", updateStride);
  }, [updateStride]);

  const updateScrollState = useCallback(() => {
    const container = containerRef.current;
    if (!container || strideRef.current === 0) return;
    const progress = container.scrollLeft / strideRef.current;
    setScrollProgress(progress);
    const realIdx = Math.round(progress) % looks.length;
    setActiveIndex((realIdx + looks.length) % looks.length);
  }, [looks.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => updateScrollState();
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [updateScrollState]);

  // Seamless loop reset
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScrollEnd = () => {
      if (firstSetWidthRef.current === 0 || strideRef.current === 0) return;
      const progress = container.scrollLeft / strideRef.current;
      if (progress >= looks.length) {
        container.scrollLeft -= firstSetWidthRef.current;
      }
    };

    container.addEventListener("scrollend", onScrollEnd);
    return () => container.removeEventListener("scrollend", onScrollEnd);
  }, [looks.length]);

  // Auto-advance
  const scrollToRealCard = useCallback((realIndex: number, smooth = true) => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const candidates = Array.from(track.children).filter((_, idx) => idx % looks.length === realIndex) as HTMLElement[];
    if (!candidates.length) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    let closest = candidates[0];
    let minDistance = Infinity;

    for (const card of candidates) {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closest = card;
      }
    }

    const cardRect = closest.getBoundingClientRect();
    const cardCenter = cardRect.left - containerRect.left + cardRect.width / 2;
    const offset = container.scrollLeft + (cardCenter - containerRect.width / 2);

    container.scrollTo({
      left: offset,
      behavior: smooth && !prefersReducedMotion ? "smooth" : "auto",
    });
  }, [looks.length, prefersReducedMotion]);

  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseAuto = useCallback(() => {
    setIsInteracting(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsInteracting(false), RESUME_DELAY);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isDragging || isInteracting) return;
    const interval = setInterval(() => {
      const next = (activeIndex + 1) % looks.length;
      scrollToRealCard(next, true);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [activeIndex, isDragging, isInteracting, looks.length, prefersReducedMotion, scrollToRealCard]);

  // Pointer handlers
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;
    container.setPointerCapture(e.pointerId);
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      startScroll: container.scrollLeft,
      lastX: e.clientX,
      lastTime: performance.now(),
      velocity: 0,
      hasMoved: false,
      isPointerDown: true,
    };
    setIsDragging(true);
    pauseAuto();
  }, [pauseAuto]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container || !dragState.current.isPointerDown) return;
    const deltaX = e.clientX - dragState.current.startX;
    const deltaY = e.clientY - dragState.current.startY;
    const totalDelta = Math.hypot(deltaX, deltaY);

    if (!dragState.current.hasMoved && totalDelta > DRAG_THRESHOLD) {
      dragState.current.hasMoved = true;
    }

    if (dragState.current.hasMoved) {
      container.scrollLeft = dragState.current.startScroll - deltaX;
      const now = performance.now();
      const dt = now - dragState.current.lastTime || 1;
      const dx = e.clientX - dragState.current.lastX;
      dragState.current.velocity = -dx / dt * 16;
      dragState.current.lastX = e.clientX;
      dragState.current.lastTime = now;
    }
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const { current: drag } = dragState;
    drag.isPointerDown = false;
    if (container.hasPointerCapture(e.pointerId)) {
      container.releasePointerCapture(e.pointerId);
    }

    if (!drag.hasMoved) {
      setIsDragging(false);
      return;
    }

    const applyMomentum = () => {
      if (!container || drag.isPointerDown) return;
      container.scrollLeft += drag.velocity;
      drag.velocity *= MOMENTUM_DECAY;
      if (Math.abs(drag.velocity) > 0.5) {
        requestAnimationFrame(applyMomentum);
      } else {
        setIsDragging(false);
        scrollToRealCard(activeIndex, true);
      }
    };

    applyMomentum();
  }, [activeIndex, scrollToRealCard]);

  const onPointerLeave = useCallback(() => {
    if (dragState.current.isPointerDown) {
      dragState.current.isPointerDown = false;
      setIsDragging(false);
    }
  }, []);

  // Keyboard navigation
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    pauseAuto();
    const next = e.key === "ArrowLeft"
      ? Math.max(activeIndex - 1, 0)
      : Math.min(activeIndex + 1, looks.length - 1);
    scrollToRealCard(next, true);
  }, [activeIndex, looks.length, pauseAuto, scrollToRealCard]);

  // Compute visual scale/opacity based on continuous scroll position
  const getCardStyle = (i: number) => {
    const distance = Math.abs(scrollProgress - i);
    const clamped = Math.min(distance, MAX_VISUAL_DISTANCE) / MAX_VISUAL_DISTANCE;
    const scale = 1 - clamped * (1 - MIN_SCALE);
    const opacity = 1 - clamped * (1 - MIN_OPACITY);
    return {
      transform: `scale(${scale})`,
      opacity,
      scrollSnapAlign: "center" as const,
    };
  };

  return (
    <div className="relative" role="region" aria-label="Lookbook carousel" onKeyDown={onKeyDown} tabIndex={0}>
      {/* Edge fade gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-[var(--color-background)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-[var(--color-background)] to-transparent z-10 pointer-events-none" />

      <div
        ref={containerRef}
        className="horizontal-scroll cursor-grab active:cursor-grabbing select-none focus:outline-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerLeave}
        style={{ scrollSnapType: isDragging ? "none" : "x mandatory" }}
      >
        <div
          ref={trackRef}
          className="flex gap-6 md:gap-8 pl-6 md:pl-12 pr-6 md:pr-12 pb-2"
          style={{ width: "max-content" }}
        >
          {displayLooks.map((look, i) => {
            const realIndex = i % looks.length;
            const displayIndex = i < looks.length ? i : i - looks.length;
            const cardStyle = getCardStyle(i);
            return (
              <Link
                key={`${look.id}-${i}`}
                href={`/lookbook/${look.slug}`}
                aria-label={`${look.name} — Shop the Look`}
                data-real-index={realIndex}
                className="group flex-shrink-0 w-[280px] md:w-[360px] transition-[transform,opacity] duration-[var(--duration-medium)] ease-[var(--ease-out)]"
                style={cardStyle}
                onClick={(e) => {
                  if (dragState.current.hasMoved) {
                    e.preventDefault();
                  }
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src={look.image}
                    alt={look.imageAlt}
                    fill
                    sizes="(max-width: 768px) 80vw, 360px"
                    className="object-cover object-[center_30%] transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)] group-hover:from-black/80 rounded-2xl" />

                  {/* Top accent line on hover */}
                  <span className="absolute top-0 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:w-full rounded-2xl" />

                  {/* Number — top left with decorative line */}
                  <div className="absolute top-5 left-5 flex items-center gap-3">
                    <span className="text-[0.625rem] font-medium tracking-[0.2em] text-white/50 transition-colors duration-[var(--duration-medium)] group-hover:text-white/80">
                      {String(displayIndex + 1).padStart(2, "0")}
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
            );
          })}
        </div>
      </div>

      {/* Slider dots */}
      <div className="flex items-center justify-center gap-2 mt-10">
        {looks.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              pauseAuto();
              scrollToRealCard(i, true);
            }}
            className="group/dot p-2"
            aria-label={`Go to look ${i + 1}`}
            aria-current={i === activeIndex ? "true" : undefined}
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
