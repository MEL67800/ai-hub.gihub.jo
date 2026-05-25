"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Badge } from "@/components/ui/Badge";

const labels: Record<string, string> = {
  chat: "对话", code: "代码", image: "图像", voice: "语音", video: "视频",
};

export function CapabilityTags({ category }: { category: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const cats = category.split(",").filter(Boolean);

  useEffect(() => {
    gsap.fromTo(
      ref.current?.children || [],
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, stagger: 0.08, ease: "back.out(1.7)" }
    );
  }, []);

  return (
    <div ref={ref} className="flex flex-wrap justify-center gap-2">
      {cats.map((c) => (
        <Badge key={c} className="px-4 py-2 text-sm">{labels[c] || c}</Badge>
      ))}
    </div>
  );
}
