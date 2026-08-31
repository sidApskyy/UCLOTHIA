import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { collections } from "@/lib/data/content";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore UCLOTHIA collections — couture, ready-to-wear, and seasonal campaigns from the house archive.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <div className="pt-24 md:pt-32">
      {/* Header */}
      <div className="container-luxury py-20 md:py-28">
        <p className="text-eyebrow-accent mb-4">The Collections</p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em]">
          A World of Craft
        </h1>
      </div>

      {/* Collections */}
      <div className="container-luxury pb-24 md:pb-40 space-y-24 md:space-y-40">
        {collections.map((collection, i) => (
          <Reveal key={collection.id}>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center`}>
              <Link
                href={`/collections/${collection.slug}`}
                className={`group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-[var(--color-surface-alt)] image-editorial ${i % 2 === 1 ? "md:order-2" : "md:order-1"}`}
              >
                <Image
                  src={collection.heroImage}
                  alt={collection.heroImageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-[center_30%]"
                />
              </Link>
              <div className={`md:px-8 lg:px-12 ${i % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
                <p className="text-eyebrow-accent mb-3">{collection.season}</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] mb-6">
                  {collection.name}
                </h2>
                <p className="text-body-lg mb-8 max-w-md">
                  {collection.concept}
                </p>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="editorial-link text-[var(--color-text)]"
                >
                  Explore Collection <span className="editorial-link-arrow">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
