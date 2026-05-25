import { getNewsByProductId } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export function Timeline({ productId }: { productId: number }) {
  const news = getNewsByProductId(productId);

  if (!news.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">更新动态</h2>
      <div className="relative border-l-2 border-neutral-200 pl-6">
        {news.map((item) => (
          <div key={item.id} className="relative mb-6 last:mb-0">
            <div className="absolute -left-[29px] h-3 w-3 rounded-full bg-neutral-900 ring-4 ring-white" />
            <time className="text-sm text-neutral-400">{formatDate(item.published_at)}</time>
            <h3 className="mt-1 font-medium">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
