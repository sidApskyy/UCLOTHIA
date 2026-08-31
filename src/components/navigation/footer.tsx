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
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.0] tracking-[-0.02em] text-white">
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
                    className="text-[0.8125rem] text-white/70 hover:text-white transition-colors duration-[var(--duration-fast)]"
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
                    className="text-[0.8125rem] text-white/70 hover:text-white transition-colors duration-[var(--duration-fast)]"
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
                    className="text-[0.8125rem] text-white/70 hover:text-white transition-colors duration-[var(--duration-fast)]"
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
                    className="text-[0.8125rem] text-white/70 hover:text-white transition-colors duration-[var(--duration-fast)]"
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
                  className="text-[0.8125rem] text-white/70 hover:text-white transition-colors duration-[var(--duration-fast)]"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.8125rem] text-white/70 hover:text-white transition-colors duration-[var(--duration-fast)]"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@uclothia.com"
                  className="text-[0.8125rem] text-white/70 hover:text-white transition-colors duration-[var(--duration-fast)]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-luxury py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[0.75rem] text-white/60 tracking-[0.05em]">
            © {new Date().getFullYear()} UCLOTHIA. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
