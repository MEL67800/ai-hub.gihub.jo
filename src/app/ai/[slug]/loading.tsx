import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductDetailLoading() {
  return (
    <div className="mx-auto max-w-4xl space-y-16 px-6 py-12">
      {/* Header skeleton */}
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-20 w-20 rounded-2xl" />
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-5 w-96" />
        <div className="flex gap-3 mt-4">
          <Skeleton className="h-10 w-28 rounded-xl" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>

      {/* Tags skeleton */}
      <div className="flex justify-center gap-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>

      {/* Content skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Pros/cons skeleton */}
      <div className="grid gap-8 sm:grid-cols-2">
        <Skeleton className="h-40 rounded-custom-lg" />
        <Skeleton className="h-40 rounded-custom-lg" />
      </div>
    </div>
  );
}
