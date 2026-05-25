import { cn } from "@/lib/utils";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: "primary" | "secondary" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-[transform,colors,shadow] duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-foreground text-primary hover:bg-neutral-800 focus-visible:ring-neutral-900 shadow-custom-sm",
    secondary: "bg-neutral-100 text-foreground hover:bg-neutral-200 focus-visible:ring-neutral-300",
    ghost: "text-foreground-secondary hover:bg-neutral-100 focus-visible:ring-neutral-200",
    accent: "bg-[var(--accent)] text-white hover:opacity-90 focus-visible:ring-[var(--accent)] shadow-custom-sm",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}
