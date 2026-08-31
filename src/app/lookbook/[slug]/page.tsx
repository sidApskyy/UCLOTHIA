import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { looks, getLookBySlug } from "@/lib/data/content";
import { products, getProductBySlug } from "@/lib/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/motion/reveal";

export async function generateStaticParams() {
  return looks.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const look = getLookBySlug(slug);
  if (!look) return { title: "Look Not Found" };
  return {
    title: look.name,
    description: `Shop the look — ${look.name} from UCLOTHIA.`,
    alternates: { canonical: `/lookbook/${look.slug}` },
    openGraph: {
      title: `${look.name} — UCLOTHIA`,
      images: [{ url: look.image, alt: look.imageAlt }],
    },
  };
}

export default async function LookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const look = getLookBySlug(slug);
  if (!look) notFound();

  const lookProducts = look.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProductBySlug>>[];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <Image
          src={look.image}
          alt={look.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
        <div className="absolute bottom-0 left-0 right-0 pb-16 md:pb-24">
          <div className="container-luxury">
            <p className="text-eyebrow text-white/70 mb-4 opacity-0 animate-[fadeUp_800ms_var(--ease-out)_0ms_forwards]">
              {look.collection.replace(/-/g, " ")}
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-light leading-[1.0] tracking-[-0.02em] opacity-0 animate-[fadeUp_800ms_var(--ease-out)_100ms_forwards]">
              {look.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Shop the look */}
      <section className="py-24 md:py-32">
        <div className="container-luxury">
          <Reveal className="mb-14 md:mb-16">
            <p className="text-eyebrow-accent mb-3">Shop the Look</p>
            <h2 className="font-display text-3xl md:text-4xl font-light">
              The Pieces
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {lookProducts.map((product, i) => (
              <Reveal key={product.id} delay={i * 80}>
                <ProductCard product={product} priority={i < 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Back to lookbook */}
      <div className="container-luxury pb-20 md:pb-28">
        <Link
          href="/lookbook"
          className="text-[0.75rem] font-medium tracking-[0.15em] uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors link-underline"
        >
          ← Back to Lookbook
        </Link>
      </div>
    </div>
  );
}
