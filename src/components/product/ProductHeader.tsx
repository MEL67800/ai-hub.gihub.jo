"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { Button } from "@/components/ui/Button";
import type { ProductWithRating } from "@/types";

export function ProductHeader({ product }: { product: ProductWithRating }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(ref.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <Image
        src={product.logo_url || "/placeholder.png"}
        alt={product.name}
        width={80}
        height={80}
        className="rounded-2xl shadow-lg"
      />
      <h1 className="mt-6 text-4xl font-bold">{product.name}</h1>
      <p className="mt-2 text-lg text-foreground-secondary">{product.company}</p>
      <p className="mt-4 max-w-xl text-foreground-secondary">{product.summary}</p>
      {product.rating_count > 0 && (
        <div className="mt-3 flex items-center gap-1 text-amber-500">
          <span className="text-lg">{"★".repeat(Math.round(product.avg_rating))}</span>
          <span className="text-sm text-neutral-400">
            {product.avg_rating.toFixed(1)} ({product.rating_count} 评价)
          </span>
        </div>
      )}
      <div className="mt-8 flex gap-3">
        <a href={product.website_url} target="_blank" rel="noopener noreferrer">
          <Button>访问官网</Button>
        </a>
        <Link href={`/compare?add=${product.slug}`}>
          <Button variant="secondary">加入对比</Button>
        </Link>
      </div>
    </div>
  );
}
