export default function Loading() {
  return (
    <div className="pt-20 md:pt-24">
      <div className="container-luxury py-32 md:py-48 max-w-4xl mx-auto text-center">
        {/* Gold accent eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="skeleton h-px w-8" aria-hidden="true" />
          <div className="skeleton h-3 w-20" aria-hidden="true" />
          <span className="skeleton h-px w-8" aria-hidden="true" />
        </div>
        <div className="skeleton h-12 md:h-16 w-full max-w-2xl mx-auto mb-6" aria-hidden="true" />
        {/* Decorative ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="skeleton h-px w-6" aria-hidden="true" />
          <span className="skeleton w-1.5 h-1.5 rotate-45" aria-hidden="true" />
          <span className="skeleton h-px w-6" aria-hidden="true" />
        </div>
      </div>
      <div className="container-luxury py-16">
        <div className="skeleton h-8 w-48 mb-12 mx-auto" aria-hidden="true" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="skeleton aspect-[4/5] w-full rounded-2xl" aria-hidden="true" />
              <div className="skeleton h-4 w-3/4" aria-hidden="true" />
              <div className="skeleton h-3 w-1/2" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
