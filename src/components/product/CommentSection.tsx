"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import type { Rating } from "@/types";

export function CommentSection({ productId }: { productId: number }) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [score, setScore] = useState(5);
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">用户评价</h2>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-neutral-200 p-6 space-y-4">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setScore(s)}
              className={`text-2xl transition-colors ${s <= score ? "text-amber-500" : "text-neutral-200"}`}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="w-full rounded-xl border border-neutral-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-200"
          placeholder="分享你的使用体验..."
        />
        <Button type="submit" disabled={loading || !comment.trim()}>
          {loading ? "提交中..." : "提交评价"}
        </Button>
      </form>

      <div className="space-y-4">
        {ratings.map((r) => (
          <div key={r.id} className="border-b border-neutral-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-500">{"★".repeat(r.score)}</span>
              <span className="text-xs text-neutral-400">{formatDate(r.created_at)}</span>
            </div>
            <p className="mt-1 text-sm text-neutral-600">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
