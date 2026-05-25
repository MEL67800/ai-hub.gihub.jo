import Link from "next/link";
import { getNewsByProductId } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export function Timeline({ productId }: { productId: number }) {
  const news = getNewsByProductId(productId);

  if (!news.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">更新动态</h2>
      <div className="relative border-l-2 border-border pl-6">
        {news.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.id}`}
            className="relative mb-6 last:mb-0 block group"
          >
            <div className="absolute -left-[29px] h-3 w-3 rounded-full bg-foreground ring-4 ring-primary group-hover:bg-[var(--accent)] transition-colors" />
            <time className="text-sm text-foreground-secondary">{formatDate(item.published_at)}</time>
            <h3 className="mt-1 font-medium group-hover:text-[var(--accent)] transition-colors">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
