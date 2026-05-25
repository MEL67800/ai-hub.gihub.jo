"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ModelSpec } from "@/data/model-specs";

gsap.registerPlugin(ScrollTrigger);

const sectionLabels: Record<string, string> = {
  basic: "基础信息",
  performance: "核心性能",
  prosCons: "优势与不足",
  useCases: "适用场景",
  updates: "更新动态",
};

export function ModelSpecsCard({ spec }: { spec: ModelSpec }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = ref.current?.querySelectorAll(".spec-section");
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
              trigger: ref.current,
              start: "top 80%",
            },
          }
        );
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        模型详情
      </h2>

      {/* 1. 基础信息 */}
      <div className="spec-section rounded-custom-xl bg-primary-secondary p-8">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-3 mb-4">
          基础信息
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <InfoRow label="品牌归属" value={spec.basic.brand} />
          <InfoRow label="最新版本" value={spec.basic.latestVersion} />
          <InfoRow label="发布日期" value={spec.basic.releaseDate} />
          <div className="sm:col-span-2">
            <InfoRow label="模型定位" value={spec.basic.positioning} />
          </div>
        </div>
      </div>

      {/* 2. 核心性能 */}
      <div className="spec-section rounded-custom-xl bg-primary-secondary p-8">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-3 mb-4">
          核心性能
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <InfoRow label="上下文窗口" value={spec.performance.contextWindow} />
          <InfoRow
            label="多模态支持"
            value={spec.performance.multimodal.join(" · ")}
          />
          <InfoRow label="代码能力" value={spec.performance.codeAbility} />
          <InfoRow label="长文本处理" value={spec.performance.longTextAbility} />
          <InfoRow label="推理速度" value={spec.performance.reasoningSpeed} />
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs font-medium text-foreground-secondary mb-2 uppercase tracking-wide">
            关键基准
          </p>
          <ul className="space-y-1.5">
            {spec.performance.benchmarkHighlights.map((b, i) => (
              <li
                key={i}
                className="text-sm text-foreground-secondary flex items-start gap-2"
              >
                <span className="text-accent mt-0.5 shrink-0">◆</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. 优势与不足 */}
      <div className="spec-section rounded-custom-xl bg-primary-secondary p-8">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-3 mb-4">
          优势与不足
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-medium text-green-600 uppercase tracking-wide mb-3">
              优势
            </p>
            <ul className="space-y-2">
              {spec.prosCons.strengths.map((s, i) => (
                <li
                  key={i}
                  className="text-sm text-foreground-secondary flex items-start gap-2"
                >
                  <span className="text-green-500 mt-0.5 shrink-0">+</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium text-red-500 uppercase tracking-wide mb-3">
              不足
            </p>
            <ul className="space-y-2">
              {spec.prosCons.weaknesses.map((w, i) => (
                <li
                  key={i}
                  className="text-sm text-foreground-secondary flex items-start gap-2"
                >
                  <span className="text-red-400 mt-0.5 shrink-0">−</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 4. 适用场景 */}
      <div className="spec-section rounded-custom-xl bg-primary-secondary p-8">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-3 mb-4">
          适用场景
        </h3>
        <div className="flex flex-wrap gap-2">
          {spec.useCases.map((uc, i) => (
            <span
              key={i}
              className="rounded-full bg-[var(--accent)]/10 px-4 py-2 text-sm font-medium text-[var(--accent)]"
            >
              {uc}
            </span>
          ))}
        </div>
      </div>

      {/* 5. 更新动态 */}
      <div className="spec-section rounded-custom-xl bg-primary-secondary p-8">
        <h3 className="text-lg font-semibold text-foreground border-b border-border pb-3 mb-4">
          更新动态
        </h3>
        <p className="text-sm text-foreground-secondary leading-relaxed">
          {spec.updates}
        </p>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-foreground-secondary uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-sm text-foreground">{value}</p>
    </div>
  );
}
