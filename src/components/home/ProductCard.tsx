"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { ProductWithRating } from "@/types";

const categoryLabels: Record<string, string> = {
  chat: "对话",
  code: "代码",
  image: "图像",
  voice: "语音",
  video: "视频",
};

export function ProductCard({ product }: { product: ProductWithRating; index: number }) {
  const categories = product.category.split(",").filter(Boolean);

  return (
    <Link href={`/ai/${product.slug}`}>
      <Card className="h-full" hover pressable>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {product.logo_url && (
              <Image
                src={product.logo_url}
                alt={product.name}
                width={40}
                height={40}
                className="rounded-lg"
              />
            )}
            <div>
              <h3 className="font-semibold text-foreground">{product.name}</h3>
              <p className="text-sm text-foreground-secondary">{product.company}</p>
            </div>
          </div>
          <p className="text-sm text-foreground-secondary line-clamp-2">{product.summary}</p>
          <div className="flex flex-wrap gap-1.5">
            {categories.slice(0, 4).map((cat) => (
              <Badge key={cat} variant="outline">
                {categoryLabels[cat] || cat}
              </Badge>
            ))}
          </div>
          {product.rating_count > 0 && (
            <div className="mt-auto flex items-center gap-1 text-sm text-amber-500">
              <span>{"★".repeat(Math.round(product.avg_rating))}</span>
              <span className="text-foreground-secondary">
                {product.avg_rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
