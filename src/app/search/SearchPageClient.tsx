"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SearchBox } from "@/components/ui/SearchBox";
import { ProductCard } from "@/components/home/ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import type { ProductWithRating } from "@/types";

export function SearchPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [allProducts, setAllProducts] = useState<ProductWithRating[]>([]);
  const [results, setResults] = useState<ProductWithRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: ProductWithRating[]) => {
        setAllProducts(data);
        setLoading(false);
        if (initialQuery) {
          applySearch(data, initialQuery);
        }
      })
      .catch(() => setLoading(false));
  }, []);

  const applySearch = (products: ProductWithRating[], q: string) => {
    const lower = q.toLowerCase();
    if (!lower) {
      setResults([]);
      return;
    }
    setResults(
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.company.toLowerCase().includes(lower) ||
          p.summary.toLowerCase().includes(lower)
      )
    );
  };

  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleSearch = useCallback(
    (q: string) => {
      setQuery(q);
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        router.replace(`/search${q ? `?q=${encodeURIComponent(q)}` : ""}`, {
          scroll: false,
        });
      }, 300);
      applySearch(allProducts, q);
    },
    [allProducts, router]
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          搜索 AI 产品
        </h1>
        <p className="text-foreground-secondary">
          按名称、公司或功能搜索
        </p>
        <SearchBox
          onSearch={handleSearch}
          placeholder="输入关键词搜索..."
          autoFocus
          className="max-w-xl"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-custom-lg" />
          ))}
        </div>
      ) : query && results.length === 0 ? (
        <p className="text-center text-foreground-secondary py-20">
          未找到与 &ldquo;{query}&rdquo; 相关的产品
        </p>
      ) : !query ? (
        <p className="text-center text-foreground-secondary py-20">
          输入关键词开始搜索
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
