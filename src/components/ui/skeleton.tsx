export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />;
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="aspect-[4/5] w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function LookbookSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex gap-6 md:gap-10 pl-6 md:pl-12 pr-6 md:pr-12 pb-2" style={{ width: "max-content" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex-shrink-0 w-[280px] md:w-[380px]">
          <Skeleton className="aspect-[4/5] w-full" />
          <Skeleton className="h-4 w-2/3 mt-5" />
        </div>
      ))}
    </div>
  );
}

export function StoreCardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="aspect-[4/3] w-full" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  );
}
