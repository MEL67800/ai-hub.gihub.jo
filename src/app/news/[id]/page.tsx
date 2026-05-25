import { notFound } from "next/navigation";
import Link from "next/link";
import { getNewsById, getAllProducts } from "@/lib/db";
import { Markdown } from "@/components/ui/Markdown";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const newsId = parseInt(id, 10);
  if (isNaN(newsId)) notFound();

  const item = getNewsById(newsId);
  if (!item) notFound();

  const products = getAllProducts();
  const product = item.product_id ? products.find((p) => p.id === item.product_id) : null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href="/news"
        className="inline-flex items-center gap-1 text-sm text-foreground-secondary hover:text-foreground mb-6 transition-colors"
      >
        ← 返回资讯列表
      </Link>

      {product && (
        <Link
          href={`/ai/${product.slug}`}
          className="inline-block mb-4 text-sm font-medium text-[var(--accent)] hover:underline"
        >
          {product.name} · {product.company}
        </Link>
      )}

      <h1 className="text-3xl font-bold tracking-tight text-foreground">{item.title}</h1>
      <time className="mt-2 inline-block text-sm text-foreground-secondary">
        {formatDate(item.published_at)}
      </time>

      {item.content && (
        <div className="mt-8 prose prose-neutral max-w-none">
          <Markdown content={item.content} />
        </div>
      )}

      {item.source_url && (
        <a
          href={item.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-1 text-sm text-[var(--accent)] hover:underline"
        >
          查看原文 →
        </a>
      )}
    </div>
  );
}
