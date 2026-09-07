"use client";

/**
 * AmbientBackground — a fixed, full-viewport layer that sits behind all content.
 * Renders a slow-shifting silk-like gradient mesh (CSS only).
 * Respects prefers-reduced-motion.
 */
export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Silk-like gradient mesh — slow shifting */}
      <div className="absolute inset-0 silk-mesh" />

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
