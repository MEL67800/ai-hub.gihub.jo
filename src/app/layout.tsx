import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Hub - AI 产品导航与对比",
  description: "了解、对比、选择最适合你的 AI 助手",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
