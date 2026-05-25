"use client";

import { useState, useEffect } from "react";
import { CompareTable } from "@/components/compare/CompareTable";
import type { ProductWithRating } from "@/types";

export function ComparePageClient() {
  const [allProducts, setAllProducts] = useState<ProductWithRating[]>([]);
  const [selected, setSelected] = useState<ProductWithRating[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/products").then((r) => r.json()).then(setAllProducts);
  }, []);

  const addProduct = (product: ProductWithRating) => {
    if (selected.length >= 4) return;
    if (selected.find((p) => p.id === product.id)) return;
    setSelected([...selected, product]);
  };

  const removeProduct = (slug: string) => {
    setSelected(selected.filter((p) => p.slug !== slug));
  };

  const filtered = allProducts.filter(
    (p) =>
      !selected.find((s) => s.id === p.id) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.company.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mt-10 space-y-8">
      <div className="flex flex-wrap gap-2">
        {selected.map((p) => (
          <button
            key={p.id}
            onClick={() => removeProduct(p.slug)}
            className="inline-flex items-center gap-1 rounded-full bg-neutral-900 px-4 py-2 text-sm text-white"
          >
            {p.name} ×
          </button>
        ))}
        {selected.length < 4 && (
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索添加..."
              className="rounded-full border border-neutral-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
            />
            {search && (
              <div className="absolute top-full mt-1 w-64 rounded-xl border border-neutral-200 bg-white shadow-lg z-10 max-h-60 overflow-auto">
                {filtered.slice(0, 6).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { addProduct(p); setSearch(""); }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-neutral-50"
                  >
                    {p.name} <span className="text-neutral-400">({p.company})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <CompareTable products={selected} onRemove={removeProduct} />
    </div>
  );
}
