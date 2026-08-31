"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Look } from "@/lib/types";

interface LookbookScrollProps {
  looks: Look[];
}

export function LookbookScroll({ looks }: LookbookScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let direction = 1;

    const animate = () => {
      if (!isHovered && container) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        container.scrollLeft += direction * 0.5;

        if (container.scrollLeft >= maxScroll) {
          direction = -1;
        } else if (container.scrollLeft <= 0) {
          direction = 1;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  return (
    <div
      ref={scrollRef}
      className="horizontal-scroll"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-6 md:gap-8 pl-6 md:pl-12 pr-6 md:pr-12 pb-2" style={{ width: "max-content" }}>
        {looks.map((look, i) => (
          <Link
            key={look.id}
            href={`/lookbook/${look.slug}`}
            className="group flex-shrink-0 w-[280px] md:w-[360px]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={look.image}
                alt={look.imageAlt}
                fill
                sizes="360px"
                className="object-cover object-[center_30%] transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
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
  );
}
