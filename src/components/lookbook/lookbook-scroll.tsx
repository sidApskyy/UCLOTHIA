"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Look } from "@/lib/types";

interface LookbookScrollProps {
  looks: Look[];
}

const SCROLL_SPEED = 28; // pixels per second
const DRAG_THRESHOLD = 12; // px before treating as drag vs click
const MOMENTUM_DECAY = 0.92; // friction for inertia
const RESUME_DELAY = 5000; // ms before auto-scroll resumes after interaction

export function LookbookScroll({ looks }: LookbookScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Duplicate looks for seamless infinite loop
  const displayLooks = [...looks, ...looks];

  // Drag / swipe physics
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

  // Auto-scroll animation state
  const autoScrollState = useRef({
    lastTimestamp: 0,
    rafId: 0,
  });

  // Detect reduced motion preference
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // Measure first-set width for seamless loop
  const firstSetWidthRef = useRef(0);
  const updateFirstSetWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const childCount = track.children.length;
    if (childCount === 0) return;
    const firstChild = track.children[0] as HTMLElement;
    const marginRight = parseFloat(getComputedStyle(firstChild).marginRight || "0");
    const cardWidth = firstChild.getBoundingClientRect().width + marginRight;
    firstSetWidthRef.current = cardWidth * looks.length;
  }, [looks.length]);

  useEffect(() => {
    updateFirstSetWidth();
    window.addEventListener("resize", updateFirstSetWidth);
    return () => window.removeEventListener("resize", updateFirstSetWidth);
  }, [updateFirstSetWidth]);

  // Track active (real) index based on scroll position
  const updateActiveIndex = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const cards = Array.from(track.children);
    if (!cards.length) return;

    const cardRect = cards[0].getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const cardWidth = cardRect.width + parseFloat(getComputedStyle(cards[0]).marginRight || "0");
    const center = container.scrollLeft + containerRect.width / 2 - containerRect.left;
    const realIdx = Math.round(center / cardWidth) % looks.length;
    setActiveIndex((realIdx + looks.length) % looks.length);
  }, [looks.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => updateActiveIndex();
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [updateActiveIndex]);

  // Scroll to a real index (0..looks.length-1), choosing the closest duplicate
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

  // Auto-scroll loop (time-based, forward infinite)
  const tick = useCallback((timestamp: number) => {
    const { current: auto } = autoScrollState;
    const container = containerRef.current;
    if (!container) {
      auto.rafId = requestAnimationFrame(tick);
      return;
    }

    if (!isDragging && !prefersReducedMotion) {
      const deltaTime = auto.lastTimestamp ? (timestamp - auto.lastTimestamp) / 1000 : 0;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const firstSetWidth = firstSetWidthRef.current;

      if (maxScroll > 0) {
        container.scrollLeft += SCROLL_SPEED * deltaTime;

        // Seamless loop: reset to first set when reaching second set
        if (firstSetWidth > 0 && container.scrollLeft >= firstSetWidth) {
          container.scrollLeft -= firstSetWidth;
        }
      }
    }

    auto.lastTimestamp = timestamp;
    auto.rafId = requestAnimationFrame(tick);
  }, [isDragging, prefersReducedMotion]);

  useEffect(() => {
    autoScrollState.current.rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(autoScrollState.current.rafId);
  }, [tick]);

  // Resume auto-scroll after manual interaction
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeAuto = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      // no-op: auto-scroll always runs except while dragging
    }, RESUME_DELAY);
  }, []);

  // Pointer / touch handlers
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
  }, []);

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
      dragState.current.velocity = -dx / dt * 16; // scale to per-frame velocity
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
      // Treat as click — navigation will happen through Link
      setIsDragging(false);
      return;
    }

    // Apply momentum and snap to nearest real card
    const applyMomentum = () => {
      if (!container || drag.isPointerDown) return;

      container.scrollLeft += drag.velocity;

      // Handle seamless loop wrap during momentum
      const firstSetWidth = firstSetWidthRef.current;
      if (firstSetWidth > 0 && container.scrollLeft >= firstSetWidth) {
        container.scrollLeft -= firstSetWidth;
      } else if (container.scrollLeft < 0) {
        container.scrollLeft += firstSetWidth;
      }

      drag.velocity *= MOMENTUM_DECAY;

      const threshold = 0.5;
      if (Math.abs(drag.velocity) > threshold) {
        requestAnimationFrame(applyMomentum);
      } else {
        snapToNearest();
      }
    };

    const snapToNearest = () => {
      setIsDragging(false);
      updateActiveIndex();
      scrollToRealCard(activeIndex, true);
      resumeAuto();
    };

    applyMomentum();
  }, [activeIndex, resumeAuto, scrollToRealCard, updateActiveIndex]);

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
    const next = e.key === "ArrowLeft"
      ? Math.max(activeIndex - 1, 0)
      : Math.min(activeIndex + 1, looks.length - 1);
    scrollToRealCard(next, true);
  }, [activeIndex, looks.length, scrollToRealCard]);

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
            return (
              <Link
                key={`${look.id}-${i}`}
                href={`/lookbook/${look.slug}`}
                aria-label={`${look.name} — Shop the Look`}
                data-real-index={realIndex}
                className="group flex-shrink-0 w-[280px] md:w-[360px] transition-[transform,opacity] duration-[var(--duration-medium)] ease-[var(--ease-out)]"
                style={{
                  opacity: Math.abs(realIndex - activeIndex) > 2 ? 0.35 : 1,
                  transform: `scale(${realIndex === activeIndex ? 1 : 0.96})`,
                  scrollSnapAlign: "center",
                }}
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
            onClick={() => scrollToRealCard(i, true)}
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
