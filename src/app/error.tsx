"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="pt-8">
      <div className="container-luxury py-32 md:py-40 text-center max-w-md mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="h-px w-8 bg-[var(--color-accent)]" />
          <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
            Error
          </p>
          <span className="h-px w-8 bg-[var(--color-accent)]" />
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-light mb-6">
          Something went <span className="italic text-[var(--color-muted)]">wrong</span>
        </h1>
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-px w-6 bg-[var(--color-border-strong)]" />
          <span className="w-1.5 h-1.5 rotate-45 border border-[var(--color-accent)]/40" />
          <span className="h-px w-6 bg-[var(--color-border-strong)]" />
        </div>
        <p className="text-[0.9375rem] md:text-[1.0625rem] text-[var(--color-text-secondary)] leading-[1.7] font-light mb-10">
          An unexpected error occurred. Please try again, or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-[var(--color-text)] text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-background)] transition-all duration-500"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-[var(--color-border)] text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-[var(--color-text-secondary)] hover:border-[var(--color-text)] hover:text-[var(--color-text)] transition-all duration-500"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
