import { Suspense } from "react";
import { SearchPageClient } from "./SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-6 py-12 text-center text-foreground-secondary">
          加载中...
        </div>
      }
    >
      <SearchPageClient />
    </Suspense>
  );
}
