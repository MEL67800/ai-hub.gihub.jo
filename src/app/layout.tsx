import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { PageTransition } from "@/components/layout/PageTransition";
import { RouteProgress } from "@/components/layout/RouteProgress";
import { ToastProvider } from "@/components/ui/ToastProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`min-h-screen ${inter.className} antialiased`}>
        <ToastProvider>
          <RouteProgress />
          <LenisProvider>
            <Navbar />
            <main className="pt-20">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </LenisProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
