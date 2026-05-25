import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}

export function Badge({ children, variant = "default", className, ...props }: BadgeProps) {
  const variants = {
    default: "bg-neutral-100 text-neutral-700",
    outline: "border border-border text-foreground-secondary",
  };

  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
