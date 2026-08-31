import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-8">
      <div className="container-luxury py-32 md:py-40 text-center max-w-md mx-auto">
        <p className="text-eyebrow mb-4">404</p>
        <h1 className="font-display text-4xl md:text-6xl font-light mb-6">
          Page Not Found
        </h1>
        <p className="text-body-lg mb-10">
          The page you are looking for may have been moved, removed, or is temporarily
          unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
          <Link href="/collections" className="btn-secondary">
            Browse Collections
          </Link>
        </div>
      </div>
    </div>
  );
}
