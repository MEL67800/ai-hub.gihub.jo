import { Suspense } from "react";
import { ComparePageClient } from "./ComparePageClient";

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">对比 AI 产品</h1>
      <p className="mt-2 text-foreground-secondary">选择产品，横向比较</p>
      <Suspense fallback={<p className="text-center text-foreground-secondary py-20">加载中...</p>}>
        <ComparePageClient />
      </Suspense>
    </div>
  );
}
