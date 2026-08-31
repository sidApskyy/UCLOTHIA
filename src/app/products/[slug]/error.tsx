"use client";

import Link from "next/link";

export default function ProductError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="pt-8">
      <div className="container-luxury py-32 md:py-40 text-center max-w-md mx-auto">
        <p className="text-eyebrow mb-4">Error</p>
        <h1 className="font-display text-4xl md:text-6xl font-light mb-6">
          Unable to load product
        </h1>
        <p className="text-body-lg mb-10">
          We couldn&apos;t display this product. Please try again, or browse our collections.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="btn-primary">
            Try Again
          </button>
          <Link href="/new" className="btn-secondary">
            Browse New Arrivals
          </Link>
        </div>
      </div>
    </div>
  );
}
