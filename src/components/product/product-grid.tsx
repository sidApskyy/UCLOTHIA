"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/product-card";
import { StaggerGroup } from "@/components/motion/stagger-group";

interface ProductGridProps {
  products: Product[];
  title: string;
  eyebrow?: string;
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

export function ProductGrid({ products, title, eyebrow }: ProductGridProps) {
  const [sortBy, setSortBy] = useState("featured");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    products.forEach((p) => p.variants.forEach((v) => sizes.add(v.size)));
    return Array.from(sizes);
  }, [products]);

  const allColors = useMemo(() => {
    const colors = new Map<string, string>();
    products.forEach((p) =>
      p.variants.forEach((v) => colors.set(v.color, v.colorHex))
    );
    return Array.from(colors.entries());
  }, [products]);

  const filtered = useMemo(() => {
    let result = [...products];

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
  }, [products, sortBy, selectedSizes, selectedColors]);

  const toggleSize = (size: string) =>
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

  const toggleColor = (color: string) =>
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );

  return (
    <div className="pt-16 md:pt-24">
      {/* Header */}
      <div className="container-luxury pb-12 md:pb-16">
        {eyebrow && <p className="text-eyebrow-accent mb-3">{eyebrow}</p>}
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em]">{title}</h1>
          <p className="text-micro pb-2">{filtered.length} {filtered.length === 1 ? "piece" : "pieces"}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="container-luxury sticky top-[80px] md:top-24 z-10 bg-[var(--color-background)]/95 backdrop-blur-md py-4 border-y border-[var(--color-border)]">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-[0.75rem] font-medium tracking-[0.1em] uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            aria-expanded={showFilters}
            aria-controls="filter-panel"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            Filters
            {(selectedSizes.length > 0 || selectedColors.length > 0) && (
              <span className="w-4 h-4 bg-[var(--color-text)] text-[var(--color-background)] rounded-full text-[0.625rem] flex items-center justify-center">
                {selectedSizes.length + selectedColors.length}
              </span>
            )}
          </button>

          <div className="flex items-center gap-3">
            <label htmlFor="sort-select" className="text-[0.75rem] tracking-[0.1em] uppercase text-[var(--color-muted)] hidden md:block">
              Sort
            </label>
            <select
              id="sort-select"
              name="sort"
              autoComplete="off"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-[0.75rem] font-medium tracking-[0.05em] uppercase bg-transparent border-b border-[var(--color-border)] py-1 pr-6 cursor-pointer focus:outline-none focus:border-[var(--color-text)] transition-colors"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div id="filter-panel" className="mt-6 pt-6 border-t border-[var(--color-border)] grid grid-cols-1 md:grid-cols-2 gap-8 animate-[fade-in_300ms_var(--ease-out)_forwards]">
            <div>
              <h3 className="text-eyebrow mb-4 text-[var(--color-text)]">Size</h3>
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
              <h3 className="text-eyebrow mb-4 text-[var(--color-text)]">Colour</h3>
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
