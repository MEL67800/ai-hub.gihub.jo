import type { ProductWithRating, PricingTier } from "@/types";
import { parsePricing } from "@/lib/utils";

interface Props {
  products: ProductWithRating[];
  onRemove: (slug: string) => void;
}

export function CompareTable({ products, onRemove }: Props) {
  if (products.length === 0) {
    return <p className="text-center text-foreground-secondary py-20">请添加产品开始对比</p>;
  }

  const capabilityKeys = ["chat", "code", "image", "voice", "video"];
  const capLabels: Record<string, string> = {
    chat: "文本对话", code: "代码能力", image: "图像生成", voice: "语音交互", video: "视频处理",
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="py-4 pr-6 text-left text-sm font-medium text-foreground-secondary w-32">对比项</th>
            {products.map((p) => (
              <th key={p.id} className="py-4 px-4 text-left min-w-[200px]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{p.name}</span>
                  <button onClick={() => onRemove(p.slug)} className="text-neutral-300 hover:text-red-500 transition-colors">×</button>
                </div>
                <p className="text-xs text-foreground-secondary">{p.company}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {[
            { label: "评分", key: "rating" },
            { label: "发布时间", key: "release_date" },
            { label: "免费额度", key: "free" },
            { label: "最低价格", key: "price" },
          ].map((row) => (
            <tr key={row.key}>
              <td className="py-3 pr-6 text-sm text-foreground-secondary">{row.label}</td>
              {products.map((p) => {
                let value = "";
                if (row.key === "rating") value = `${p.avg_rating.toFixed(1)} (${p.rating_count})`;
                else if (row.key === "release_date") value = p.release_date;
                else if (row.key === "free") {
                  const tiers = parsePricing(p.pricing_json);
                  value = tiers.find((t: PricingTier) => t.price === "免费")?.name || "无";
                } else if (row.key === "price") {
                  const tiers = parsePricing(p.pricing_json);
                  const paid = tiers.find((t: PricingTier) => t.price !== "免费");
                  value = paid?.price || "免费";
                }
                return <td key={p.id} className="py-3 px-4 text-sm">{value}</td>;
              })}
            </tr>
          ))}
          <tr>
            <td className="py-3 pr-6 text-sm font-medium text-foreground-secondary pt-6">能力对比</td>
            {products.map((p) => (
              <td key={p.id} className="py-3 px-4 pt-6" />
            ))}
          </tr>
          {capabilityKeys.map((key) => (
            <tr key={key}>
              <td className="py-2 pr-6 text-sm text-foreground-secondary pl-4">{capLabels[key]}</td>
              {products.map((p) => (
                <td key={p.id} className="py-2 px-4">
                  {p.category.includes(key) ? (
                    <span className="text-green-500">✓</span>
                  ) : (
                    <span className="text-neutral-300">✗</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
