import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { looks } from "@/lib/data/content";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "UCLOTHIA Lookbook — editorial looks from our collections, styled and shot for the season.",
  alternates: { canonical: "/lookbook" },
};

export default function LookbookPage() {
  return (
    <div className="pt-24 md:pt-32">
      <div className="container-luxury py-20 md:py-28">
        <p className="text-eyebrow-accent mb-4">Lookbook</p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em]">The Looks</h1>
        <p className="text-body-lg mt-8 max-w-xl">
          Each look is a composed story — silhouette, material, and detail in conversation.
        </p>
      </div>

      <div className="container-luxury pb-24 md:pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {looks.map((look, i) => (
            <Reveal key={look.id} delay={(i % 2) * 100}>
              <Link
                href={`/lookbook/${look.slug}`}
                className="group block"
              >
                <div className={`relative overflow-hidden bg-[var(--color-surface-alt)] image-editorial ${
                  i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-[3/4]" : "aspect-[1/1]"
                }`}>
                  <Image
                    src={look.image}
                    alt={look.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-[center_30%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-medium)]" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-all duration-[var(--duration-medium)] translate-y-2 group-hover:translate-y-0">
                    <span className="text-[0.75rem] tracking-[0.15em] uppercase text-white">
                      Shop the Look →
                    </span>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[0.875rem] font-medium">{look.name}</span>
                  <span className="text-micro">{look.collection.replace(/-/g, " ")}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
