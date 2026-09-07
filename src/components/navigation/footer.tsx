import Link from "next/link";
import { footerNav } from "@/lib/data/navigation";
import { NewsletterForm } from "@/components/layout/newsletter-form";

export function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] text-[var(--color-background)] overflow-hidden">
      {/* Subtle gold glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[20rem] bg-[var(--color-accent)] rounded-full blur-[200px] pointer-events-none opacity-[0.04]" />

      {/* Large brand statement */}
      <div className="relative border-b border-white/[0.06]">
        <div className="container-luxury py-24 md:py-36 text-center">
          {/* Gold accent eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="h-px w-8 bg-[var(--color-accent)]/40" />
            <p className="text-[0.625rem] uppercase tracking-[0.35em] font-medium text-[var(--color-accent)]/60">
              UCLOTHIA / India
            </p>
            <span className="h-px w-8 bg-[var(--color-accent)]/40" />
          </div>

          <h2 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light leading-[0.95] tracking-[-0.03em] text-white break-words">
            UCLOTHIA
          </h2>

          <p className="font-display text-xl md:text-2xl font-light italic leading-[1.4] max-w-xl mx-auto text-white/40 mt-8">
            Modern Indian elegance,
            <span className="block">rooted in craft.</span>
          </p>

          {/* Decorative diamond ornament */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <span className="h-px w-6 bg-white/10" />
            <span className="w-1.5 h-1.5 rotate-45 border border-[var(--color-accent)]/30" />
            <span className="h-px w-6 bg-white/10" />
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="relative border-b border-white/[0.06]">
        <div className="container-luxury py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center max-w-4xl mx-auto">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-6 bg-[var(--color-accent)]/40" />
                <p className="text-[0.625rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]/60">
                  Join the House
                </p>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-light leading-tight text-white">
                Receive collection stories
                <span className="block italic text-white/40">and private invitations.</span>
              </h3>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="relative container-luxury py-20 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-14">
          {[
            { title: "Shop", links: footerNav.shop },
            { title: "The House", links: footerNav.house },
            { title: "Service", links: footerNav.service },
            { title: "Customer Care", links: footerNav.care },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="text-[0.625rem] uppercase tracking-[0.25em] font-medium text-[var(--color-accent)]/50 mb-6">
                {col.title}
              </h3>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 py-1 text-[0.8125rem] text-white/50 hover:text-white transition-colors duration-[var(--duration-fast)]"
                    >
                      <span className="h-px w-0 bg-[var(--color-accent)] transition-all duration-300 ease-[var(--ease-out)] group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social column */}
          <div>
            <h3 className="text-[0.625rem] uppercase tracking-[0.25em] font-medium text-[var(--color-accent)]/50 mb-6">
              Social
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Instagram", href: "https://instagram.com", external: true },
                { label: "YouTube", href: "https://youtube.com", external: true },
                { label: "Contact", href: "mailto:contact@uclothia.com", external: false },
              ].map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 py-1 text-[0.8125rem] text-white/50 hover:text-white transition-colors duration-[var(--duration-fast)]"
                    >
                      <span className="h-px w-0 bg-[var(--color-accent)] transition-all duration-300 ease-[var(--ease-out)] group-hover:w-3" />
                      {link.label}
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 py-1 text-[0.8125rem] text-white/50 hover:text-white transition-colors duration-[var(--duration-fast)]"
                    >
                      <span className="h-px w-0 bg-[var(--color-accent)] transition-all duration-300 ease-[var(--ease-out)] group-hover:w-3" />
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Trust signals */}
      <div className="relative border-t border-white/[0.06]">
        <div className="container-luxury py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10", label: "White-Glove Delivery", sub: "Worldwide shipping" },
              { icon: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8", label: "Secure Payments", sub: "Encrypted checkout" },
              { icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", label: "Handcrafted", sub: "By master artisans" },
              { icon: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8 M3 3v5h5 M12 7v5l3 3", label: "7-Day Returns", sub: "On ready-to-ship" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 md:gap-4">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-[var(--color-accent)]/60 shrink-0"
                >
                  <path d={item.icon} />
                </svg>
                <div>
                  <p className="text-[0.75rem] font-medium tracking-[0.05em] text-white/80">{item.label}</p>
                  <p className="text-[0.625rem] tracking-[0.1em] uppercase text-white/30 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/[0.06]">
        <div className="container-luxury py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[0.75rem] text-white/40 tracking-[0.05em] font-light">
            © {new Date().getFullYear()} UCLOTHIA. All rights reserved.
          </span>

          {/* Decorative center ornament */}
          <div className="hidden md:flex items-center gap-3">
            <span className="h-px w-4 bg-white/10" />
            <span className="w-1 h-1 rotate-45 border border-[var(--color-accent)]/20" />
            <span className="h-px w-4 bg-white/10" />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[0.625rem] uppercase tracking-[0.15em] text-white/25">We Accept</span>
            <div className="flex items-center gap-2">
              {["VISA", "MC", "AMEX", "UPI"].map((p) => (
                <span key={p} className="text-[0.625rem] font-medium tracking-[0.1em] text-white/40 border border-white/10 px-2 py-1 rounded text-center min-w-[2.5rem]">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
