"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  apiPath: string;
  label?: string;
}

export function DeleteButton({ apiPath, label = "删除" }: Props) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    setDeleting(true);
    const res = await fetch(apiPath, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    }
    setDeleting(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className={confirming ? "text-red-600 font-semibold hover:underline" : "text-red-500 hover:underline"}
    >
      {deleting ? "删除中..." : confirming ? "确认删除" : label}
    </button>
  );
}
