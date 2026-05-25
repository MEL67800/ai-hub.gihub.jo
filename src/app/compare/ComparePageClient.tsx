"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CompareTable } from "@/components/compare/CompareTable";
import type { ProductWithRating } from "@/types";

export function ComparePageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<ProductWithRating[]>([]);
  const [selected, setSelected] = useState<ProductWithRating[]>([]);
  const [search, setSearch] = useState("");

  // 加载所有产品
  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setAllProducts)
      .catch(() => {});
  }, []);

  // 处理 ?add=slug 参数：自动添加产品到对比列表
  useEffect(() => {
    const addSlug = searchParams.get("add");
    if (addSlug && allProducts.length > 0) {
      const product = allProducts.find((p) => p.slug === addSlug);
      if (product && !selected.find((s) => s.id === product.id)) {
        setSelected((prev) => {
          if (prev.length >= 4 || prev.find((s) => s.id === product.id)) return prev;
          return [...prev, product];
        });
      }
      // 清除 URL 参数
      router.replace("/compare", { scroll: false });
    }
  }, [searchParams, allProducts]);

  const addProduct = useCallback((product: ProductWithRating) => {
    setSelected((prev) => {
      if (prev.length >= 4) return prev;
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeProduct = useCallback((slug: string) => {
    setSelected((prev) => prev.filter((p) => p.slug !== slug));
  }, []);

  const filtered = allProducts.filter(
    (p) =>
      !selected.find((s) => s.id === p.id) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.company.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mt-10 space-y-8">
      {/* 已选产品标签 */}
      <div className="flex flex-wrap gap-2">
        {selected.map((p) => (
          <button
            key={p.id}
            onClick={() => removeProduct(p.slug)}
            className="inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-sm text-primary transition-all hover:opacity-80 active:scale-95"
          >
            {p.name}
            <svg className="h-3.5 w-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ))}
        {selected.length < 4 && (
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={selected.length === 0 ? "搜索添加产品..." : "继续添加..."}
              className="rounded-full border border-border bg-primary px-4 py-2 text-sm text-foreground placeholder:text-foreground-secondary focus:outline-none focus:ring-2 focus:ring-neutral-200"
            />
            {search && (
              <div className="absolute top-full mt-1 w-64 rounded-custom-md border border-border bg-primary shadow-custom-lg z-10 max-h-60 overflow-auto">
                {filtered.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-foreground-secondary">无匹配产品</p>
                ) : (
                  filtered.slice(0, 6).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        addProduct(p);
                        setSearch("");
                      }}
                      className="flex w-full items-center gap-2 px-4 py-3 text-sm text-foreground hover:bg-neutral-50 transition-colors"
                    >
                      {p.name}
                      <span className="text-foreground-secondary">({p.company})</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 对比表格 */}
      <CompareTable products={selected} onRemove={removeProduct} />

      {/* 空状态提示 */}
      {selected.length === 0 && (
        <p className="text-center text-sm text-foreground-secondary">
          最多可对比 4 个产品。在搜索框中输入产品名称添加。
        </p>
      )}
    </div>
  );
}
