"use client";

const MARQUEE_ITEMS = [
  "Hand-Crafted in India",
  "Heritage Zardozi & Silk",
  "Bespoke Atelier Commissions",
  "Contemporary Restraint",
  "Limited Editions",
  "Enduring Craftsmanship",
  "The House of UCLOTHIA",
  "Est. 2024",
];

interface EditorialMarqueeProps {
  className?: string;
}

export function EditorialMarquee({ className = "" }: EditorialMarqueeProps) {
  return (
    <div
      className={`relative w-full overflow-hidden border-y border-[var(--color-border-strong)] py-5 bg-[var(--color-surface)]/40 backdrop-blur-sm select-none ${className}`}
      aria-hidden="true"
    >
      <div className="animate-marquee group">
        {/* Track 1 */}
        <div className="flex items-center shrink-0">
          {MARQUEE_ITEMS.map((item, i) => (
            <div key={`track1-${i}`} className="flex items-center">
              <span className="text-[0.6875rem] font-medium tracking-[0.3em] uppercase text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-300">
                {item}
              </span>
              <span className="mx-6 md:mx-10 text-[0.55rem] text-[var(--color-accent)]">
                ✦
              </span>
            </div>
          ))}
        </div>

        {/* Track 2 (for seamless loop) */}
        <div className="flex items-center shrink-0">
          {MARQUEE_ITEMS.map((item, i) => (
            <div key={`track2-${i}`} className="flex items-center">
              <span className="text-[0.6875rem] font-medium tracking-[0.3em] uppercase text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-300">
                {item}
              </span>
              <span className="mx-6 md:mx-10 text-[0.55rem] text-[var(--color-accent)]">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
