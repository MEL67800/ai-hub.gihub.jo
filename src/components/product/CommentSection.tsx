"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import type { Rating } from "@/types";

export function CommentSection({ productId }: { productId: number }) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [score, setScore] = useState(5);
  const [hoverScore, setHoverScore] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/ratings?product_id=${productId}`)
      .then((r) => r.json())
      .then(setRatings)
      .catch(() => {});
  }, [productId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId, score, comment }),
    });
    if (res.ok) {
      setComment("");
      const updated = await fetch(`/api/ratings?product_id=${productId}`).then((r) => r.json());
      setRatings(updated);
    }
    setLoading(false);
  }

  const displayScore = hoverScore ?? score;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">用户评价</h2>

      <form onSubmit={handleSubmit} className="rounded-custom-lg border border-border bg-primary p-6 space-y-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setScore(s)}
              onMouseEnter={() => setHoverScore(s)}
              onMouseLeave={() => setHoverScore(null)}
              className={`text-2xl transition-all duration-100 hover:scale-110 ${
                s <= displayScore ? "text-amber-500" : "text-neutral-200"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="w-full rounded-xl border border-border bg-primary p-3 text-sm text-foreground placeholder:text-foreground-secondary focus:outline-none focus:ring-2 focus:ring-neutral-200 resize-none"
          placeholder="分享你的使用体验..."
        />
        <Button type="submit" isLoading={loading} disabled={!comment.trim()}>
          提交评价
        </Button>
      </form>

      <div className="space-y-4">
        {ratings.length === 0 ? (
          <p className="text-sm text-foreground-secondary py-4 text-center">
            暂无评价，成为第一个评价的人
          </p>
        ) : (
          ratings.map((r) => (
            <div key={r.id} className="border-b border-[var(--border)] pb-4 last:border-0">
              <div className="flex items-center gap-2">
                <span className="text-amber-500">{"★".repeat(r.score)}</span>
                <span className="text-xs text-foreground-secondary">{formatDate(r.created_at)}</span>
              </div>
              <p className="mt-1 text-sm text-foreground-secondary">{r.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
