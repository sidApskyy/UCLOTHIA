import { ProductGridSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="pt-20 md:pt-24">
      <div className="container-luxury py-16 md:py-20 text-center">
        <div className="skeleton h-4 w-24 mx-auto mb-3" aria-hidden="true" />
        <div className="skeleton h-12 md:h-16 w-48 mx-auto" aria-hidden="true" />
      </div>
      <div className="container-luxury py-16 md:py-20">
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
