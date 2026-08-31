import Link from "next/link";
import type { Metadata } from "next";
import { stores } from "@/lib/data/content";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Stores",
  description: "Visit UCLOTHIA ateliers in Mumbai, Delhi, and Bangalore.",
  alternates: { canonical: "/stores" },
};

export default function StoresPage() {
  return (
    <div className="pt-24 md:pt-32">
      <div className="container-luxury py-20 md:py-28">
        <div className="flex items-center gap-4 mb-4">
          <span className="h-px w-12 bg-[var(--color-border-strong)]" />
          <p className="text-eyebrow-accent">Visit Us</p>
        </div>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em]">Our Stores</h1>
      </div>

      <div className="container-luxury pb-24 md:pb-40 space-y-24 md:space-y-40">
        {stores.map((store, i) => (
          <Reveal key={store.id}>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center`}>
              <div className={`${i % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
                <p className="text-micro mb-3">{String(i + 1).padStart(2, "0")} — India</p>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light mb-6">
                  {store.name}
                </h2>
                <dl className="space-y-3 text-[0.875rem]">
                  <div>
                    <dt className="text-eyebrow text-[var(--color-text)]">Address</dt>
                    <dd className="text-[var(--color-text-secondary)] mt-1">{store.address}</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow text-[var(--color-text)]">Hours</dt>
                    <dd className="text-[var(--color-text-secondary)] mt-1">{store.hours}</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow text-[var(--color-text)]">Phone</dt>
                    <dd className="text-[var(--color-text-secondary)] mt-1">{store.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow text-[var(--color-text)]">Email</dt>
                    <dd className="text-[var(--color-text-secondary)] mt-1">{store.email}</dd>
                  </div>
                </dl>
                <div className="flex gap-3 mt-8">
                  <Link href={store.appointmentUrl} className="btn-primary">
                    Book Appointment
                  </Link>
                  <Link href={`/stores/${store.slug}`} className="btn-secondary">
                    View Store
                  </Link>
                </div>
              </div>
              <div className={`${i % 2 === 1 ? "md:order-2" : "md:order-1"}`}>
                <div className="border-t border-[var(--color-border)] pt-6">
                  <p className="text-editorial text-[var(--color-muted)] italic">
                    {store.city === "Mumbai" && "Where the house began. Our flagship atelier in Bandra West."}
                    {store.city === "New Delhi" && "In the heart of the capital. A space designed for private appointments."}
                    {store.city === "Bangalore" && "Our southern atelier. Craft conversations in a serene setting."}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
