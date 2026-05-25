import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/db";
import { ProductHeader } from "@/components/product/ProductHeader";
import { CapabilityTags } from "@/components/product/CapabilityTags";
import { PricingCards } from "@/components/product/PricingCards";
import { ProsCons } from "@/components/product/ProsCons";
import { Timeline } from "@/components/product/Timeline";
import { CommentSection } from "@/components/product/CommentSection";
import { Markdown } from "@/components/ui/Markdown";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "未找到" };
  return {
    title: `${product.name} - AI Hub`,
    description: product.summary,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-20 px-6 py-12">
      <ProductHeader product={product} />
      <CapabilityTags category={product.category} />
      {product.pricing_json && <PricingCards pricingJson={product.pricing_json} />}
      {product.description && (
        <section>
          <Markdown content={product.description} />
        </section>
      )}
      <ProsCons pros={product.pros} cons={product.cons} />
      <Timeline productId={product.id} />
      <CommentSection slug={product.slug} />
    </div>
  );
}
