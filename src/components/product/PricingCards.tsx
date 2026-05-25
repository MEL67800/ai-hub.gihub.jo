"use client";

import { useRef } from "react";
import type { PricingTier } from "@/types";
import { parsePricing } from "@/lib/utils";

export function PricingCards({ pricingJson }: { pricingJson: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tiers: PricingTier[] = parsePricing(pricingJson);

  if (!tiers.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">价格方案</h2>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
      >
        {tiers.map((tier, i) => (
          <div
            key={i}
            className="min-w-[260px] snap-start rounded-2xl border border-neutral-200 p-6 flex-shrink-0"
          >
            <h3 className="font-semibold">{tier.name}</h3>
            <p className="mt-2 text-3xl font-bold">{tier.price}</p>
            <ul className="mt-4 space-y-2">
              {tier.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-neutral-600">
                  <svg className="mt-0.5 h-4 w-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
