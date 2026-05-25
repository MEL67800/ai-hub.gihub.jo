"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "首页" },
  { href: "/compare", label: "对比" },
  { href: "/news", label: "资讯" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "glass border-b border-neutral-200/50 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground"
        >
          AI Hub
        </Link>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-sm font-medium transition-colors duration-200",
                isActive(link.href)
                  ? "text-foreground"
                  : "text-foreground-secondary hover:text-foreground"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[var(--accent)]" />
              )}
            </Link>
          ))}
          <Link
            href="/search"
            className="ml-2 rounded-full p-2 text-foreground-secondary hover:text-foreground hover:bg-neutral-100 transition-colors"
            aria-label="搜索"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
