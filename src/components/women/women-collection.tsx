"use client";

import { useState, useMemo, useRef } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/product-card";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { LineDraw } from "@/components/motion/line-draw";
import { Reveal } from "@/components/motion/reveal";

interface WomenCollectionProps {
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
  { value: "sarees", label: "Sarees" },
  { value: "lehengas", label: "Lehengas" },
  { value: "gowns", label: "Gowns" },
  { value: "suits", label: "Suits & Sets" },
  { value: "kurtas", label: "Kurtas" },
  { value: "jewellery", label: "Jewellery" },
];

export function WomenCollection({ products }: WomenCollectionProps) {
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

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
              Explore every piece — from handwoven sarees to architectural gowns, each crafted by master artisans.
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
      <div className="sticky top-[64px] md:top-20 z-20 bg-[var(--color-background)] mt-12 md:mt-16 border-y border-[var(--color-border)] shadow-sm shadow-black/5">
        <div className="container-luxury">
          <div className="flex items-center justify-between gap-3 py-3 md:py-4">
            {/* Category chips — pill style */}
            <div className="flex items-center gap-1.5 md:gap-2 overflow-x-auto scrollbar-hide flex-1 min-w-0">
              {filterCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`group relative flex-shrink-0 px-3.5 md:px-5 py-2 rounded-full text-center transition-all duration-300 ${
                    activeCategory === cat.value
                      ? "bg-[var(--color-text)] text-[var(--color-background)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]"
                  }`}
                >
                  <span className={`text-[0.625rem] md:text-[0.6875rem] font-medium uppercase transition-all duration-300 ${
                    activeCategory === cat.value ? "tracking-[0.18em]" : "tracking-[0.12em]"
                  }`}>
                    {cat.label}
                  </span>
                  {/* Gold dot indicator for active */}
                  {activeCategory === cat.value && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                  )}
                </button>
              ))}
            </div>

            {/* Vertical separator */}
            <div className="h-6 w-px bg-[var(--color-border)] flex-shrink-0 hidden md:block" />

            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-[0.6875rem] font-medium tracking-[0.1em] uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                aria-expanded={showFilters}
                aria-controls="filter-panel-women"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 6h16M7 12h10M10 18h4" />
                </svg>
                <span className="hidden md:inline">Filters</span>
                {(selectedSizes.length > 0 || selectedColors.length > 0) && (
                  <span className="w-4 h-4 bg-[var(--color-accent)] text-[var(--color-background)] rounded-full text-[0.625rem] flex items-center justify-center font-medium">
                    {selectedSizes.length + selectedColors.length}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2">
                <select
                  id="sort-select-women"
                  name="sort"
                  autoComplete="off"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-[0.6875rem] font-medium tracking-[0.05em] uppercase bg-transparent border-b border-[var(--color-border)] py-1 pr-6 cursor-pointer focus:outline-none focus:border-[var(--color-text)] transition-colors"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div id="filter-panel-women" className="pb-5 pt-5 border-t border-[var(--color-border)] grid grid-cols-1 md:grid-cols-2 gap-8 animate-[fade-in_300ms_var(--ease-out)_forwards]">
              <div>
                <h3 className="text-[0.625rem] uppercase tracking-[0.2em] font-medium text-[var(--color-muted)] mb-4">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1.5 text-[0.75rem] border transition-colors ${
                        selectedSizes.includes(size)
                          ? "border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-background)]"
                          : "border-[var(--color-border)] hover:border-[var(--color-text)]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[0.625rem] uppercase tracking-[0.2em] font-medium text-[var(--color-muted)] mb-4">Colour</h3>
                <div className="flex flex-wrap gap-3">
                  {allColors.map(([color, hex]) => (
                    <button
                      key={color}
                      onClick={() => toggleColor(color)}
                      className={`flex items-center gap-2 ${selectedColors.includes(color) ? "opacity-100" : "opacity-60 hover:opacity-100"} transition-opacity`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-[var(--color-border)]"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="text-[0.75rem]">{color}</span>
                    </button>
                  ))}
                </div>
              </div>
              {(selectedSizes.length > 0 || selectedColors.length > 0) && (
                <button
                  onClick={() => {
                    setSelectedSizes([]);
                    setSelectedColors([]);
                  }}
                  className="text-[0.75rem] tracking-[0.1em] uppercase text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors md:col-span-2"
                >
                  Clear All
                </button>
              )}
            </div>
          )}
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
                setActiveCategory("all");
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
