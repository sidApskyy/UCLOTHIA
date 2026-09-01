"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Look } from "@/lib/types";

interface LookbookScrollProps {
  looks: Look[];
}

const AUTO_ADVANCE_MS = 1400;
const DRAG_THRESHOLD = 10;
const MOMENTUM_DECAY = 0.92;
const RESUME_DELAY = 5000;
const FOCUS_RANGE = 2.2;
const MIN_SCALE = 0.78;
const MIN_OPACITY = 0.35;
const MIN_BRIGHTNESS = 0.82;
const GRADIENT_INTENSITY = 0.45;
const BACKGROUND_BLUR = "80px";
const PERSPECTIVE = 1200;

// --- Color helpers ----------------------------------------------------

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s * 100, l * 100];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360; s /= 100; l /= 100;
  let r = l, g = l, b = l;

  if (s !== 0) {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

async function extractColors(src: string): Promise<[string, string]> {
  return new Promise((resolve) => {
    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("no context");
        canvas.width = 2;
        canvas.height = 2;
        ctx.drawImage(img, 0, 0, 2, 2);
        const data = ctx.getImageData(0, 0, 2, 2).data;
        let r = 0, g = 0, b = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }
        r = Math.round(r / 4);
        g = Math.round(g / 4);
        b = Math.round(b / 4);

        const [h, s, l] = rgbToHsl(r, g, b);
        const [r2, g2, b2] = hslToRgb((h + 25) % 360, Math.max(0, s - 5), Math.max(0, l - 15));

        resolve([`${r} ${g} ${b}`, `${r2} ${g2} ${b2}`]);
      } catch {
        resolve(["180 160 140", "140 120 100"]);
      }
    };
    img.onerror = () => resolve(["180 160 140", "140 120 100"]);
    img.src = src;
  });
}

export function LookbookScroll({ looks }: LookbookScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const colorsRef = useRef<[string, string][]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const [nextBgIndex, setNextBgIndex] = useState(0);
  const [bgToggle, setBgToggle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const displayLooks = [...looks, ...looks, ...looks];

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

  const setCardRef = (index: number) => (el: HTMLElement | null) => {
    cardsRef.current[index] = el;
  };

  // Extract colors for every look
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const colors = await Promise.all(looks.map((l) => extractColors(l.image)));
      if (!cancelled) colorsRef.current = colors;
    })();
    return () => { cancelled = true; };
  }, [looks]);

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

  // Apply 3D scale/rotate/brightness directly to cards
  const applyVisuals = useCallback(() => {
    const container = containerRef.current;
    if (!container || strideRef.current === 0) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let nearestReal = 0;
    let nearestDistance = Infinity;

    cardsRef.current.forEach((card) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const pxOffset = cardCenter - containerCenter;
      const strideDistance = Math.abs(pxOffset) / strideRef.current;
      const clamped = Math.min(strideDistance, FOCUS_RANGE) / FOCUS_RANGE;
      const sign = Math.sign(pxOffset);

      const scale = 1 - clamped * (1 - MIN_SCALE);
      const opacity = 1 - clamped * (1 - MIN_OPACITY);
      const brightness = 1 - clamped * (1 - MIN_BRIGHTNESS);
      const rotateY = -sign * clamped * 16;
      const translateZ = (1 - clamped) * 40;
      const zIndex = Math.round(30 - Math.min(strideDistance, 30));

      card.style.transform = `translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.opacity = String(opacity);
      card.style.filter = `brightness(${brightness})`;
      card.style.zIndex = String(zIndex);

      if (strideDistance < nearestDistance) {
        nearestDistance = strideDistance;
        nearestReal = Number(card.dataset.realIndex);
      }
    });

    setActiveIndex(nearestReal);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => applyVisuals();
    container.addEventListener("scroll", onScroll, { passive: true });
    applyVisuals();
    return () => container.removeEventListener("scroll", onScroll);
  }, [applyVisuals]);

  // Cross-fade background gradient when active look changes
  useEffect(() => {
    if (colorsRef.current.length === 0) return;
    setNextBgIndex(activeIndex);
    setBgToggle((prev) => 1 - prev);
    const t = setTimeout(() => setBgIndex(activeIndex), 1200);
    return () => clearTimeout(t);
  }, [activeIndex]);

  // Center the first card on mount
  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setTimeout(() => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track || strideRef.current === 0) return;
      const first = track.children[looks.length] as HTMLElement;
      if (!first) return;
      const containerRect = container.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const offset = firstRect.left - containerRect.left + firstRect.width / 2 - containerRect.width / 2;
      container.scrollTo({ left: container.scrollLeft + offset, behavior: "auto" });
    }, 100);
    return () => clearTimeout(timer);
  }, [looks.length, prefersReducedMotion]);

  // Seamless loop reset
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScrollEnd = () => {
      if (firstSetWidthRef.current === 0 || strideRef.current === 0) return;
      const progress = container.scrollLeft / strideRef.current;
      if (progress >= looks.length * 2) {
        container.scrollLeft -= firstSetWidthRef.current;
      } else if (progress < looks.length) {
        container.scrollLeft += firstSetWidthRef.current;
      }
    };

    container.addEventListener("scrollend", onScrollEnd);
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => onScrollEnd(), 150);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scrollend", onScrollEnd);
      container.removeEventListener("scroll", onScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [looks.length]);

  // Scroll to real index, choosing nearest duplicate
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
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), RESUME_DELAY);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isDragging || isPaused) return;
    const interval = setInterval(() => {
      const next = (activeIndex + 1) % looks.length;
      scrollToRealCard(next, true);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [activeIndex, isDragging, isPaused, looks.length, prefersReducedMotion, scrollToRealCard]);

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

  const getGradient = (idx: number) => {
    const pair = colorsRef.current[idx] || ["180 160 140", "140 120 100"];
    return `radial-gradient(circle at 25% 30%, rgba(${pair[0]}, ${GRADIENT_INTENSITY}) 0%, transparent 45%), radial-gradient(circle at 75% 70%, rgba(${pair[1]}, ${GRADIENT_INTENSITY}) 0%, transparent 45%)`;
  };

  return (
    <div
      className="relative overflow-hidden rounded-3xl"
      role="region"
      aria-label="Lookbook carousel"
      onKeyDown={onKeyDown}
      tabIndex={0}
      style={{ perspective: `${PERSPECTIVE}px` }}
    >
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ filter: `blur(${BACKGROUND_BLUR})` }}>
        <div
          className="absolute inset-[-20%] transition-opacity duration-1000 ease-in-out"
          style={{ backgroundImage: getGradient(bgIndex), opacity: bgToggle === 0 ? 1 : 0, backgroundSize: "140% 140%" }}
        />
        <div
          className="absolute inset-[-20%] transition-opacity duration-1000 ease-in-out"
          style={{ backgroundImage: getGradient(nextBgIndex), opacity: bgToggle === 1 ? 1 : 0, backgroundSize: "140% 140%" }}
        />
      </div>

      {/* Edge fade gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-10 md:w-28 bg-gradient-to-r from-[var(--color-background)] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 md:w-28 bg-gradient-to-l from-[var(--color-background)] to-transparent z-20 pointer-events-none" />

      <div
        ref={containerRef}
        className="horizontal-scroll cursor-grab active:cursor-grabbing select-none focus:outline-none relative z-10"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerLeave}
        style={{ scrollSnapType: isDragging ? "none" : "x mandatory" }}
      >
        <div
          ref={trackRef}
          className="flex gap-4 md:gap-6 pl-6 md:pl-12 pr-6 md:pr-12 py-10 md:py-14"
          style={{ width: "max-content", transformStyle: "preserve-3d" }}
        >
          {displayLooks.map((look, i) => {
            const realIndex = i % looks.length;
            const displayIndex = realIndex;
            return (
              <Link
                key={`${look.id}-${i}`}
                ref={setCardRef(i)}
                href={`/lookbook/${look.slug}`}
                aria-label={`${look.name} — Shop the Look`}
                data-real-index={realIndex}
                className="group relative flex-shrink-0 w-[260px] md:w-[340px] lg:w-[380px] will-change-transform"
                style={{ scrollSnapAlign: "center" }}
                onClick={(e) => {
                  if (dragState.current.hasMoved) {
                    e.preventDefault();
                  }
                }}
              >
                {/* Card frame */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--color-surface)] ring-1 ring-[var(--color-border)] shadow-2xl shadow-black/5">
                  <Image
                    src={look.image}
                    alt={look.imageAlt}
                    fill
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 380px"
                    className="object-cover object-[center_30%] transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
                    draggable={false}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)] group-hover:from-black/85" />

                  {/* Subtle top accent line */}
                  <span className="absolute top-0 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:w-full" />

                  {/* Number */}
                  <div className="absolute top-5 left-5 flex items-center gap-3">
                    <span className="text-[0.625rem] font-medium tracking-[0.2em] text-white/60 transition-colors duration-[var(--duration-medium)] group-hover:text-white/90">
                      {String(displayIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-0 bg-white/50 transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:w-8" />
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
                    <div className="transform transition-transform duration-[var(--duration-medium)] ease-[var(--ease-out)] group-hover:-translate-y-3">
                      <h3 className="font-display text-2xl md:text-3xl text-white font-light leading-[1.1] mb-6">
                        {look.name}
                      </h3>
                    </div>

                    {/* CTA */}
                    <span className="inline-flex items-center gap-3 text-[0.625rem] md:text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-white/60 group-hover:text-white transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)]">
                      <span className="h-px w-6 bg-white/30 transition-all duration-[var(--duration-medium)] group-hover:w-10 group-hover:bg-white/70" />
                      Shop the Look
                      <span className="transition-transform duration-[var(--duration-medium)] group-hover:translate-x-1.5">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
