"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroProps {
  children?: ReactNode;
  image?: string;
  images?: HeroImage[];
  imageAlt?: string;
  label?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  interval?: number;
}

export function Hero({
  children,
  image,
  images,
  imageAlt,
  label,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  interval = 5000,
}: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const endX = useRef(0);
  const isDragging = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides: HeroImage[] =
    images && images.length > 0
      ? images
      : image
        ? [{ src: image, alt: imageAlt || "Hero image" }]
        : [];

  const goToSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    endX.current = e.clientX;
    isDragging.current = true;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    endX.current = e.clientX;
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = startX.current - endX.current;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) {
      goToSlide(activeIndex + 1);
    } else {
      goToSlide(activeIndex - 1);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToSlide(activeIndex - 1);
    if (e.key === "ArrowRight") goToSlide(activeIndex + 1);
  };

  return (
    <section
      ref={ref}
      className="relative h-[90vh] md:h-screen w-full overflow-hidden cursor-grab active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[600ms] ease-[var(--ease-out)] ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60" />
      <div className="absolute inset-0 bg-black/10" />

      {/* Slider dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-[2px] rounded-full transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)] ${
                i === activeIndex
                  ? "w-10 bg-white/90"
                  : "w-4 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      <div
        className={`relative h-full flex flex-col items-center justify-center text-center transition-opacity duration-[600ms] ease-[var(--ease-out)] ${
          activeIndex === 0 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="container-luxury">
          {label && (
            <p className="text-eyebrow text-white/70 mb-5 md:mb-6">
              {label}
            </p>
          )}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-light leading-[1.05] tracking-[-0.02em]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 md:mt-8 text-[0.9375rem] md:text-[1.125rem] text-white/80 max-w-md mx-auto leading-relaxed font-light">
              {subtitle}
            </p>
          )}
          {ctaLabel && ctaHref && (
            <Link
              href={ctaHref}
              className="editorial-link mt-10 md:mt-12 text-white"
            >
              {ctaLabel}
              <span className="editorial-link-arrow">→</span>
            </Link>
          )}
        </div>
      </div>

      {children}
    </section>
  );
}
