"use client";

import { useState, useMemo, useRef } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/product-card";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { LineDraw } from "@/components/motion/line-draw";
import { Reveal } from "@/components/motion/reveal";

interface MenCollectionProps {
  products: Product[];
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

const filterCategories = [
  { value: "all", label: "All" },
  { value: "sherwanis", label: "Sherwanis" },
  { value: "bandhgalas", label: "Bandhgalas" },
  { value: "kurta-sets", label: "Kurta Sets" },
];

export function MenCollection({ products }: MenCollectionProps) {
  const [sortBy, setSortBy] = useState("featured");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const categoryProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    categoryProducts.forEach((p) => p.variants.forEach((v) => sizes.add(v.size)));
    return Array.from(sizes);
  }, [categoryProducts]);

  const allColors = useMemo(() => {
    const colors = new Map<string, string>();
    categoryProducts.forEach((p) =>
      p.variants.forEach((v) => colors.set(v.color, v.colorHex))
    );
    return Array.from(colors.entries());
  }, [categoryProducts]);

  const filtered = useMemo(() => {
    let result = [...categoryProducts];

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.variants.some((v) => selectedSizes.includes(v.size))
      );
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.variants.some((v) => selectedColors.includes(v.color))
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
    }

    return result;
  }, [categoryProducts, sortBy, selectedSizes, selectedColors]);

  const toggleSize = (size: string) =>
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

  const toggleColor = (color: string) =>
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  return (
    <div ref={gridRef} className="scroll-mt-32">
      {/* — Editorial Collection Header — */}
      <section className="relative pt-24 md:pt-36 pb-0 overflow-hidden">
        {/* Decorative top hairline */}
        <div className="absolute top-0 left-0 right-0 h-px bg-[var(--color-border)]" />

        {/* Subtle radial gradient glow behind heading */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] md:w-[800px] md:h-[400px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, var(--color-accent) 0%, transparent 70%)",
            opacity: 0.04,
          }}
        />

        <div className="container-luxury relative z-10">
          {/* Eyebrow — gold lines expand from center */}
          <Reveal variant="fade" delay={0}>
            <div className="flex items-center justify-center gap-4 mb-10 md:mb-12">
              <span
                className="h-px w-6 md:w-12 bg-[var(--color-accent)] origin-center"
                style={{ animation: "goldLineExpand 800ms cubic-bezier(0.16,1,0.3,1) 200ms both" }}
              />
              <p className="text-[0.625rem] md:text-[0.6875rem] uppercase tracking-[0.35em] font-medium text-[var(--color-accent)]">
                Ready-to-Wear &amp; Couture
              </p>
              <span
                className="h-px w-6 md:w-12 bg-[var(--color-accent)] origin-center"
                style={{ animation: "goldLineExpand 800ms cubic-bezier(0.16,1,0.3,1) 200ms both" }}
              />
            </div>
          </Reveal>

          {/* Large display heading — mask reveal + shimmer on italic word */}
          <Reveal variant="mask-sweep" delay={200}>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-[-0.03em] text-center leading-[0.95] mb-8">
              The{" "}
              <span
                className="italic text-[var(--color-muted)] inline-block"
                style={{
                  background: "linear-gradient(110deg, var(--color-muted) 30%, var(--color-accent) 50%, var(--color-muted) 70%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmerSweep 4s ease-in-out 1s both",
                }}
              >
                Collection
              </span>
            </h2>
          </Reveal>

          {/* Decorative diamond ornament */}
          <Reveal variant="fade" delay={400}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="h-px w-8 bg-[var(--color-border-strong)]" />
              <span
                className="w-1.5 h-1.5 bg-[var(--color-accent)]"
                style={{ animation: "diamondPulse 3s ease-in-out infinite" }}
              />
              <span className="h-px w-8 bg-[var(--color-border-strong)]" />
            </div>
          </Reveal>

          {/* Subtitle — blur-in entrance */}
          <Reveal variant="fade" delay={500}>
            <p
              className="text-center text-[0.875rem] md:text-[1rem] text-[var(--color-text-secondary)] font-light leading-[1.7] max-w-lg mx-auto mb-10"
              style={{ animation: "luxuryFadeIn 800ms cubic-bezier(0.16,1,0.3,1) 500ms both" }}
            >
              Explore every piece — from hand-embroidered sherwanis to tailored bandhgalas, each crafted by master artisans.
            </p>
          </Reveal>

          {/* Line draw + piece count */}
          <Reveal variant="fade" delay={700}>
            <div className="flex flex-col items-center gap-4">
              <LineDraw width="3rem" className="mx-auto" />
              <p className="text-[0.625rem] uppercase tracking-[0.3em] font-medium text-[var(--color-muted)]">
                {filtered.length} {filtered.length === 1 ? "Piece" : "Pieces"} Available
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* — Category Filter Bar + Sort — */}
      <div className="mt-12 md:mt-16">
        <div className="container-luxury">
          <div className="relative bg-[var(--color-surface)] rounded-[1.25rem] border border-[var(--color-border)] shadow-[0_2px_20px_-8px_rgba(26,26,26,0.08),0_1px_3px_rgba(26,26,26,0.04)] overflow-hidden">
            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[var(--color-accent)]/30 rounded-tl-[1.25rem] pointer-events-none" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[var(--color-accent)]/30 rounded-tr-[1.25rem] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[var(--color-accent)]/30 rounded-bl-[1.25rem] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[var(--color-accent)]/30 rounded-br-[1.25rem] pointer-events-none" />

            <div className="flex items-center justify-between gap-3 py-5 md:py-6 px-6 md:px-8">
              {/* Category chips — serif luxury design */}
              <div className="flex items-center gap-1.5 md:gap-2 overflow-x-auto scrollbar-hide flex-1 min-w-0">
                {filterCategories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => handleCategoryChange(cat.value)}
                    className={`group relative flex-shrink-0 px-4 md:px-5 py-2.5 rounded-full text-center transition-all duration-500 ease-[var(--ease-out)] ${
                      activeCategory === cat.value
                        ? "bg-[var(--color-surface-alt)] border border-[var(--color-accent)]/40 shadow-sm shadow-black/5"
                        : "border border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    <span className={`font-display text-[1rem] md:text-[1.125rem] font-semibold transition-all duration-500 ${
                      activeCategory === cat.value
                        ? "tracking-normal text-[var(--color-text)]"
                        : "tracking-normal text-[var(--color-text)] group-hover:text-[var(--color-text)]"
                    }`}>
                      {cat.label}
                    </span>
                    {/* Gold serif underline for active */}
                    {activeCategory === cat.value && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-px w-6 bg-[var(--color-accent)]" />
                    )}
                    {/* Subtle gold underline on hover for inactive */}
                    {activeCategory !== cat.value && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-px w-0 bg-[var(--color-accent)]/50 transition-all duration-500 ease-[var(--ease-out)] group-hover:w-4" />
                    )}
                  </button>
                ))}
              </div>

              {/* Vertical separator — decorative */}
              <div className="h-10 w-px bg-gradient-to-b from-transparent via-[var(--color-border-strong)] to-transparent flex-shrink-0 hidden md:block" />

              {/* Controls */}
              <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
                {/* Filter button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-500 ease-[var(--ease-out)] ${
                    showFilters
                      ? "bg-[var(--color-surface-alt)] border border-[var(--color-border-strong)]"
                      : "border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-alt)]"
                  }`}
                  aria-expanded={showFilters}
                  aria-controls="filter-panel-men"
                >
                  <svg className={`transition-colors duration-300 ${showFilters ? "text-[var(--color-accent)]" : "text-[var(--color-muted)] group-hover:text-[var(--color-text)]"}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M4 6h16M7 12h10M10 18h4" />
                  </svg>
                  <span className="font-display text-[1rem] font-semibold text-[var(--color-text)] group-hover:text-[var(--color-text)] transition-colors duration-300 hidden md:inline">
                    Refine
                  </span>
                  {(selectedSizes.length > 0 || selectedColors.length > 0) && (
                    <span className="w-5 h-5 bg-[var(--color-accent)] text-[var(--color-background)] rounded-full text-[0.5625rem] flex items-center justify-center font-semibold">
                      {selectedSizes.length + selectedColors.length}
                    </span>
                  )}
                </button>

                {/* Sort — custom styled */}
                <div className="flex items-center gap-2.5 pl-3 md:pl-5 border-l border-[var(--color-border)]">
                  <span className="font-display text-[1rem] font-semibold text-[var(--color-text)] hidden lg:inline">Sort by</span>
                  <div className="relative">
                    <select
                      id="sort-select-men"
                      name="sort"
                      autoComplete="off"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none font-display text-[1rem] font-semibold bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-full py-2.5 pl-4 pr-9 cursor-pointer focus:outline-none focus:border-[var(--color-text)] transition-all duration-300 hover:border-[var(--color-border-strong)] text-[var(--color-text)] hover:text-[var(--color-text)]"
                    >
                      {sortOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="font-sans not-italic">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-muted)] transition-transform duration-300" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter panel — inside the card */}
            {showFilters && (
              <div id="filter-panel-men" className="px-6 md:px-8 pb-6 pt-1 border-t border-[var(--color-border)] animate-[fade-in_400ms_var(--ease-out)_forwards]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6">
                  {/* Size */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="h-px w-4 bg-[var(--color-accent)]/40" />
                      <h3 className="font-display text-[1.25rem] font-semibold text-[var(--color-text)]">Size</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {allSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={`px-4 py-2 text-[0.75rem] font-medium tracking-[0.05em] rounded-full border transition-all duration-300 ease-[var(--ease-out)] ${
                            selectedSizes.includes(size)
                              ? "border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-background)] shadow-sm shadow-black/15"
                              : "border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)]"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colour */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="h-px w-4 bg-[var(--color-accent)]/40" />
                      <h3 className="font-display text-[1.25rem] font-semibold text-[var(--color-text)]">Colour</h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {allColors.map(([color, hex]) => (
                        <button
                          key={color}
                          onClick={() => toggleColor(color)}
                          className={`group flex items-center gap-2.5 transition-all duration-300 ${selectedColors.includes(color) ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full ring-1 ring-inset ring-black/5 transition-all duration-300 ${selectedColors.includes(color) ? "ring-2 ring-[var(--color-text)] ring-offset-2 ring-offset-[var(--color-surface)]" : "ring-black/5"}`}
                            style={{ backgroundColor: hex }}
                          />
                          <span className="font-display text-[1rem] font-semibold text-[var(--color-text)] group-hover:text-[var(--color-text)] transition-colors">{color}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {(selectedSizes.length > 0 || selectedColors.length > 0) && (
                  <button
                    onClick={() => {
                      setSelectedSizes([]);
                      setSelectedColors([]);
                    }}
                    className="mt-6 flex items-center gap-2 text-[0.6875rem] tracking-[0.2em] uppercase font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-300"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                    Clear All
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container-luxury py-16 md:py-24">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl md:text-3xl font-light text-[var(--color-text)] mb-3">
              No pieces match your selection
            </p>
            <p className="text-body text-[var(--color-muted)] mb-8">
              Try adjusting your filters to discover more.
            </p>
            <button
              onClick={() => {
                setSelectedSizes([]);
                setSelectedColors([]);
              }}
              className="text-[0.75rem] tracking-[0.15em] uppercase text-[var(--color-text)] border-b border-[var(--color-text)] pb-1 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </StaggerGroup>
        )}
      </div>
    </div>
  );
}
