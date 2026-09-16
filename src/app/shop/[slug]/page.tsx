import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getProducts } from "@/lib/woocommerce";
import ProductGallery from "@/components/product/ProductGallery";
import ProductDetailClient from "./ProductDetailClient";
import ProductCard from "@/components/product/ProductCard";
import { ChevronRight } from "lucide-react";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = (await getProducts({ categorySlug: product.category.slug }))
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
        <Link href="/shop" className="hover:text-foreground">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
        <Link href={`/shop?cat=${product.category.slug}`} className="hover:text-foreground">
          {product.category.name}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
        <span className="text-foreground font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column: Details, Variant Selector, Actions, Accordions */}
        <div className="lg:col-span-5">
          <ProductDetailClient product={product} />
        </div>
      </div>

      {/* Related Sartorial Pieces */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-12 border-t border-border">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl font-bold text-foreground">
              Complete the Aesthetic
            </h3>
            <Link
              href={`/shop?cat=${product.category.slug}`}
              className="text-xs font-bold tracking-wider uppercase text-foreground hover:text-secondary"
            >
              View More in {product.category.name} →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
