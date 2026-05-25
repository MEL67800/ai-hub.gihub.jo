"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { SearchBox } from "@/components/ui/SearchBox";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import type { ProductWithRating } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export function ProductCardGrid({ categoryFilter }: { categoryFilter?: string }) {
  const [products, setProducts] = useState<ProductWithRating[]>([]);
  const [filtered, setFiltered] = useState<ProductWithRating[]>([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 父级 GSAP ScrollTrigger 编排，替代每个卡片独立注册
  useEffect(() => {
    if (loading || filtered.length === 0) return;

    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".product-card-item");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, gridRef);

    return () => ctx.revert();
  }, [loading, filtered.length]);

  const applyFilters = (query: string, category?: string) => {
    let result = [...products];
    const q = query.toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.company.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q)
      );
    }
    if (category) {
      result = result.filter((p) => p.category.includes(category));
    }
    setFiltered(result);
  };

  const handleSearch = (query: string) => {
    applyFilters(query, categoryFilter);
  };

  // categoryFilter 变化时重新筛选
  useEffect(() => {
    applyFilters("", categoryFilter);
  }, [categoryFilter, products]);

  return (
    <section id="products" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">探索 AI 产品</h2>
          <p className="mt-2 text-foreground-secondary">发现最适合你的 AI 助手</p>
        </div>
        <SearchBox onSearch={handleSearch} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-custom-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-foreground-secondary py-20">
          没有找到匹配的产品
        </p>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="product-card-item"
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
