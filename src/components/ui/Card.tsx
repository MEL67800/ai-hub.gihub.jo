import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ children, className, hover = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300",
        hover && "hover:shadow-lg hover:shadow-neutral-200/50 hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
