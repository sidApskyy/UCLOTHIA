import Link from "next/link";
import { footerNav } from "@/lib/data/navigation";
import { NewsletterForm } from "@/components/layout/newsletter-form";

export function Footer() {
  return (
    <footer className="bg-[var(--color-text)] text-[var(--color-background)]">
      {/* Large brand statement */}
      <div className="border-b border-white/10">
        <div className="container-luxury py-24 md:py-36 text-center">
          <p className="text-micro text-white/40 mb-12">UCLOTHIA / India</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[1.0] tracking-[-0.02em] text-white break-words">
            UCLOTHIA
          </h2>
          <p className="font-display text-xl md:text-2xl font-light italic leading-[1.4] max-w-xl mx-auto text-white/60 mt-8">
            Modern Indian elegance,
            <span className="block">rooted in craft.</span>
          </p>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container-luxury py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center max-w-4xl mx-auto">
            <div>
              <p className="text-eyebrow text-white/60 mb-4">Join the House</p>
              <h3 className="font-display text-2xl md:text-3xl font-light leading-tight">
                Receive collection stories
                <span className="block italic text-white/60">and private invitations.</span>
              </h3>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="container-luxury py-20 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-14">
          <div>
            <h3 className="text-eyebrow text-white/60 mb-6">Shop</h3>
            <ul className="space-y-5">
              {footerNav.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-[0.8125rem] text-white/70 hover:text-white transition-colors duration-[var(--duration-fast)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-eyebrow text-white/60 mb-6">The House</h3>
            <ul className="space-y-5">
              {footerNav.house.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-[0.8125rem] text-white/70 hover:text-white transition-colors duration-[var(--duration-fast)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-eyebrow text-white/60 mb-6">Service</h3>
            <ul className="space-y-5">
              {footerNav.service.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-[0.8125rem] text-white/70 hover:text-white transition-colors duration-[var(--duration-fast)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-eyebrow text-white/60 mb-6">Customer Care</h3>
            <ul className="space-y-5">
              {footerNav.care.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-[0.8125rem] text-white/70 hover:text-white transition-colors duration-[var(--duration-fast)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-eyebrow text-white/60 mb-6">Social</h3>
            <ul className="space-y-5">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 text-[0.8125rem] text-white/70 hover:text-white transition-colors duration-[var(--duration-fast)]"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 text-[0.8125rem] text-white/70 hover:text-white transition-colors duration-[var(--duration-fast)]"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@uclothia.com"
                  className="inline-block py-1 text-[0.8125rem] text-white/70 hover:text-white transition-colors duration-[var(--duration-fast)]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trust signals */}
      <div className="border-t border-white/10">
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
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-[var(--color-accent)] shrink-0"
                >
                  <path d={item.icon} />
                </svg>
                <div>
                  <p className="text-[0.75rem] font-medium tracking-[0.05em] text-white/90">{item.label}</p>
                  <p className="text-[0.625rem] tracking-[0.1em] uppercase text-white/40 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-luxury py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[0.75rem] text-white/60 tracking-[0.05em]">
            © {new Date().getFullYear()} UCLOTHIA. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <span className="text-[0.625rem] uppercase tracking-[0.15em] text-white/30">We Accept</span>
            <div className="flex items-center gap-3">
              {["VISA", "MC", "AMEX", "UPI"].map((p) => (
                <span key={p} className="text-[0.625rem] font-medium tracking-[0.1em] text-white/50 border border-white/15 px-2 py-1 rounded">
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
