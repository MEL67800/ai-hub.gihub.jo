import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  pressable?: boolean;
  accentVariant?: "blue" | "green" | "purple" | "amber";
}

const accentClasses: Record<string, string> = {
  blue: "card-gradient-accent",
  green: "card-gradient-accent-green",
  purple: "card-gradient-accent-purple",
  amber: "card-gradient-accent-amber",
};

export function Card({
  children,
  className,
  hover = true,
  pressable = false,
  accentVariant,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-custom-lg border border-border bg-primary p-6 transition-[transform,box-shadow] duration-200 ease-out",
        hover && "hover:shadow-custom-md hover:-translate-y-0.5",
        pressable && "active:scale-[0.985] active:shadow-custom-sm",
        accentVariant && accentClasses[accentVariant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
