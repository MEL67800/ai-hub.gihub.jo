"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { useLenis } from "@/components/layout/LenisProvider";

const titleWords = ["AI", "时代的"];

export function HeroSection() {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbBlueRef = useRef<HTMLDivElement>(null);
  const orbPurpleRef = useRef<HTMLDivElement>(null);
  const { lenis } = useLenis();

  useEffect(() => {
    // 模糊光晕漂浮动画
    if (orbBlueRef.current) {
      gsap.to(orbBlueRef.current, {
        x: 30,
        y: -20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
    if (orbPurpleRef.current) {
      gsap.to(orbPurpleRef.current, {
        x: -25,
        y: 15,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // 副标题和 CTA 淡入
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 1.2 });
    tl.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
  }, []);

  const handleExplore = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const target = document.querySelector("#products");
      if (target && lenis) {
        lenis.scrollTo(target as HTMLElement);
      } else if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis]
  );

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 text-center bg-hero-pattern overflow-hidden">
      {/* 背景模糊光晕 */}
      <div ref={orbBlueRef} className="blur-orb blur-orb--blue -top-40 -left-40" />
      <div ref={orbPurpleRef} className="blur-orb blur-orb--purple top-1/3 -right-60" />

      {/* 标题：逐词动画 */}
      <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white sm:text-7xl md:text-8xl">
        {titleWords.map((word, i) => (
          <motion.span
            key={word}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        ))}
        <motion.span
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-gradient inline-block"
        >
          超级入口
        </motion.span>
      </h1>

      <p
        ref={subtitleRef}
        className="mt-8 max-w-xl text-lg text-neutral-400 sm:text-xl opacity-0"
      >
        了解、对比、选择最适合你的 AI 助手
      </p>

      <div ref={ctaRef} className="mt-12 opacity-0">
        <a
          href="#products"
          onClick={handleExplore}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-8 py-4 text-sm font-medium text-white transition-all hover:bg-white/20 hover:scale-105"
        >
          开始探索
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="h-6 w-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
