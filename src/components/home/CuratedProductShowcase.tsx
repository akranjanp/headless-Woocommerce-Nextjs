"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import ProductQuickViewModal from "@/components/product/ProductQuickViewModal";
import { ArrowRight, Sparkles } from "lucide-react";

interface CuratedProductShowcaseProps {
  initialProducts: Product[];
}

export default function CuratedProductShowcase({
  initialProducts,
}: CuratedProductShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"all" | "shoes" | "men" | "women" | "sale">("all");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter products based on active tab
  const filteredProducts = initialProducts.filter((product) => {
    if (activeTab === "all") return true;
    const catSlug = product.category?.slug?.toLowerCase() || "";
    const nameLower = product.name.toLowerCase();

    if (activeTab === "shoes") {
      return nameLower.includes("shoe") || catSlug.includes("shoe") || catSlug.includes("footwear");
    }
    if (activeTab === "men") {
      return nameLower.includes("men") || catSlug.includes("men");
    }
    if (activeTab === "women") {
      return nameLower.includes("women") || catSlug.includes("women");
    }
    if (activeTab === "sale") {
      return (
        Boolean(product.saleBadge) ||
        Boolean(product.regularPrice && product.regularPrice > product.price)
      );
    }
    return true;
  });

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : initialProducts;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border/60 pb-5 gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-secondary flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span>THE SARTORIAL EDIT</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-foreground mt-1 tracking-tight">
            Curated Runway & Best Sellers
          </h2>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.15em] uppercase text-foreground hover:text-secondary transition-colors group"
        >
          <span>Browse Full Catalog</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Interactive Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === "all"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted/40 hover:bg-muted text-foreground border border-border/60"
          }`}
        >
          All Runway Pieces ({initialProducts.length})
        </button>

        <button
          onClick={() => setActiveTab("shoes")}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === "shoes"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted/40 hover:bg-muted text-foreground border border-border/60"
          }`}
        >
          Footwear & Shoes
        </button>

        <button
          onClick={() => setActiveTab("men")}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === "men"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted/40 hover:bg-muted text-foreground border border-border/60"
          }`}
        >
          Men&apos;s Tailoring
        </button>

        <button
          onClick={() => setActiveTab("women")}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === "women"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted/40 hover:bg-muted text-foreground border border-border/60"
          }`}
        >
          Women&apos;s Capsule
        </button>

        <button
          onClick={() => setActiveTab("sale")}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
            activeTab === "sale"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted/40 hover:bg-muted text-foreground border border-border/60"
          }`}
        >
          Archive Sale
        </button>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayProducts.slice(0, 8).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ))}
      </div>

      {/* Quick View Modal Overlay */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
