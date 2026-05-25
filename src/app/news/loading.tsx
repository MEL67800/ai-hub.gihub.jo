import { Skeleton } from "@/components/ui/Skeleton";

export default function NewsLoading() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Skeleton className="h-10 w-40 mb-2" />
      <Skeleton className="h-5 w-32 mb-10" />

      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-custom-lg border border-border p-6 space-y-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
