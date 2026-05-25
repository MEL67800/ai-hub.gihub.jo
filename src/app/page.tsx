"use client";

import { useState, useCallback, useEffect } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductCardGrid } from "@/components/home/ProductCardGrid";
import { BentoGrid } from "@/components/home/BentoGrid";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categoryKeyMap: Record<string, string> = {
    chat: "chat",
    code: "code",
    image: "image",
    voice: "voice",
    video: "video",
  };

  const handleCategorySelect = useCallback((key: string | null) => {
    setActiveCategory(key);
  }, []);

  // 等 React 提交筛选后的 DOM 变更再滚动，避免布局位移导致滚动偏移
  useEffect(() => {
    if (activeCategory) {
      requestAnimationFrame(() => {
        const target = document.querySelector("#products");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  }, [activeCategory]);

  return (
    <>
      <HeroSection />
      <ProductCardGrid
        categoryFilter={activeCategory ? categoryKeyMap[activeCategory] : undefined}
      />
      <BentoGrid
        onCategorySelect={handleCategorySelect}
        activeCategory={activeCategory}
      />
    </>
  );
}
