import { ComparePageClient } from "./ComparePageClient";

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">对比 AI 产品</h1>
      <p className="mt-2 text-neutral-500">选择产品，横向比较</p>
      <ComparePageClient />
    </div>
  );
}
