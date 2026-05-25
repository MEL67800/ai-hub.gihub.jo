"use client";

import { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

export function SearchBox({
  onSearch,
  placeholder = "搜索 AI 产品...",
  autoFocus = false,
  className,
}: SearchBoxProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onSearch(e.target.value);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    setValue("");
    onSearch("");
    inputRef.current?.focus();
  }, [onSearch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        handleClear();
      }
    },
    [handleClear]
  );

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <svg
        className={cn(
          "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-200",
          isFocused ? "text-[var(--accent)]" : "text-foreground-secondary"
        )}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label={placeholder}
        className="w-full rounded-2xl border border-border bg-primary py-3 pl-12 pr-10 text-sm text-foreground placeholder:text-foreground-secondary shadow-custom-sm transition-all duration-200 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-200"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-foreground-secondary hover:text-foreground transition-colors"
          aria-label="清除搜索"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
