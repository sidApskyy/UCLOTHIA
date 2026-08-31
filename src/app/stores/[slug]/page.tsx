import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stores, getStoreBySlug } from "@/lib/data/content";
import { Reveal } from "@/components/motion/reveal";

export async function generateStaticParams() {
  return stores.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const store = getStoreBySlug(slug);
  if (!store) return { title: "Store Not Found" };
  return {
    title: store.name,
    description: `Visit ${store.name} at ${store.address}.`,
    alternates: { canonical: `/stores/${store.slug}` },
  };
}

export default async function StorePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const store = getStoreBySlug(slug);
  if (!store) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://uclothia.com" },
      { "@type": "ListItem", position: 2, name: "Stores", item: "https://uclothia.com/stores" },
      { "@type": "ListItem", position: 3, name: store.name, item: `https://uclothia.com/stores/${store.slug}` },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Header */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="container-luxury">
          <p className="text-eyebrow text-[var(--color-text-secondary)] mb-4">{store.city}</p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em]">
            {store.name}
          </h1>
        </div>
      </section>

      {/* Details */}
      <section className="py-24 md:py-32">
        <div className="container-luxury max-w-2xl">
          <Reveal>
            <dl className="space-y-8">
              <div className="border-b border-[var(--color-border)] pb-8">
                <dt className="text-eyebrow text-[var(--color-text)] mb-2">Address</dt>
                <dd className="text-body-lg">{store.address}</dd>
              </div>
              <div className="border-b border-[var(--color-border)] pb-8">
                <dt className="text-eyebrow text-[var(--color-text)] mb-2">Opening Hours</dt>
                <dd className="text-body-lg">{store.hours}</dd>
              </div>
              <div className="border-b border-[var(--color-border)] pb-8">
                <dt className="text-eyebrow text-[var(--color-text)] mb-2">Contact</dt>
                <dd className="text-body-lg">
                  <p>{store.phone}</p>
                  <p>{store.email}</p>
                </dd>
              </div>
            </dl>
            <div className="flex gap-3 mt-10">
              <Link href={store.appointmentUrl} className="btn-primary">
                Book an Appointment
              </Link>
              <a
                href={`https://maps.google.com?q=${encodeURIComponent(store.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Get Directions
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Back */}
      <div className="container-luxury pb-20 md:pb-28">
        <Link
          href="/stores"
          className="text-[0.75rem] font-medium tracking-[0.15em] uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors link-underline"
        >
          ← All Stores
        </Link>
      </div>
    </div>
  );
}
