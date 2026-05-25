"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { label: "对话聊天", key: "chat" },
  { label: "代码编程", key: "code" },
  { label: "图像生成", key: "image" },
  { label: "语音交互", key: "voice" },
  { label: "视频生成", key: "video" },
];

interface BentoGridProps {
  onCategorySelect?: (key: string | null) => void;
  activeCategory?: string | null;
}

export function BentoGrid({ onCategorySelect, activeCategory }: BentoGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".bento-item");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, gridRef);

    return () => ctx.revert();
  }, []);

  const handleCategoryClick = (key: string) => {
    if (onCategorySelect) {
      onCategorySelect(activeCategory === key ? null : key);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="mb-10 text-3xl font-bold tracking-tight text-foreground">热门速览</h2>
      <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/news"
          className="bento-item group row-span-2 rounded-custom-xl bg-primary-secondary p-8 transition-colors hover:bg-neutral-100 lg:col-span-2"
        >
          <h3 className="text-xl font-semibold text-foreground">最新动态</h3>
          <p className="mt-3 text-foreground-secondary">追踪 AI 行业最新发布与更新</p>
          <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:gap-2 transition-all">
            查看资讯 <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </span>
        </Link>

        <Link
          href="/compare"
          className="bento-item group rounded-custom-xl bg-primary-secondary p-8 transition-colors hover:bg-neutral-100 lg:col-span-2"
        >
          <h3 className="text-xl font-semibold text-foreground">热门对比</h3>
          <p className="mt-3 text-foreground-secondary">横向对比多个 AI 产品的差异</p>
          <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:gap-2 transition-all">
            开始对比 <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </span>
        </Link>

        <div className="bento-item rounded-custom-xl bg-primary-secondary p-8 lg:col-span-2">
          <h3 className="text-xl font-semibold text-foreground">分类导航</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.key}
                onClick={() => handleCategoryClick(cat.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat.key
                    ? "bg-foreground text-primary shadow-custom-sm"
                    : "bg-primary text-foreground-secondary shadow-custom-sm hover:bg-neutral-100"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>

        <Link
          href="/news"
          className="bento-item group rounded-custom-xl bg-primary-secondary p-8 lg:col-span-2 transition-colors hover:bg-neutral-100"
        >
          <h3 className="text-xl font-semibold text-foreground">趋势观察</h3>
          <div className="mt-4 space-y-2 text-sm text-foreground-secondary">
            <p className="group-hover:text-foreground transition-colors">多模态融合 — 文本+视觉+语音一体化</p>
            <p className="group-hover:text-foreground transition-colors">Agent 自动化 — 终端操作与自主任务</p>
            <p className="group-hover:text-foreground transition-colors">开源浪潮 — MIT/Apache 2.0 模型追赶闭源</p>
          </div>
          <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:gap-2 transition-all">
            查看行业动态 <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
