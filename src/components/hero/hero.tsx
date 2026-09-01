"use client";

import { useEffect, useState, type ReactNode } from "react";
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
  image = "/og-campaign.jpg",
  images,
  imageAlt = "UCLOTHIA — Campaign",
  label,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  interval = 5500,
}: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides: HeroImage[] =
    images && images.length > 0
      ? images
      : [{ src: image, alt: imageAlt }];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  return (
    <section className="relative h-[90vh] md:h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((slide, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <div className="relative w-full h-full hero-breathe">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60 z-[2] pointer-events-none" />
      <div className="absolute inset-0 bg-black/10 z-[2] pointer-events-none" />

      <div className="relative h-full flex flex-col items-center justify-center text-center z-[3]">
        <div className="container-luxury">
          {label && (
            <div className="overflow-hidden mb-5 md:mb-6">
              <p className="text-eyebrow text-white/70 animate-[fade-in-up_800ms_cubic-bezier(0.16,1,0.3,1)_forwards]">
                {label}
              </p>
            </div>
          )}
          <div className="overflow-hidden">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-light leading-[1.05] tracking-[-0.02em] break-words text-balance animate-[fade-in-up_1000ms_cubic-bezier(0.16,1,0.3,1)_150ms_forwards]">
              {title}
            </h1>
          </div>
          {subtitle && (
            <p className="mt-6 md:mt-8 text-[0.9375rem] md:text-[1.125rem] text-white/80 max-w-md mx-auto leading-relaxed font-light animate-[fade-in_1000ms_cubic-bezier(0.16,1,0.3,1)_300ms_forwards]">
              {subtitle}
            </p>
          )}
          {ctaLabel && ctaHref && (
            <div className="mt-10 md:mt-12">
              <Link
                href={ctaHref}
                className="editorial-link text-white animate-[fade-in_1000ms_cubic-bezier(0.16,1,0.3,1)_450ms_forwards]"
              >
                {ctaLabel}
                <span className="editorial-link-arrow">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {children}
    </section>
  );
}
