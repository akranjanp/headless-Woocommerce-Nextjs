import React from "react";
import { getProducts, getCategories } from "@/lib/woocommerce";
import HeroCarousel from "@/components/home/HeroCarousel";
import CategoryEditorial from "@/components/home/CategoryEditorial";
import CuratedProductShowcase from "@/components/home/CuratedProductShowcase";
import InteractiveLookbook from "@/components/home/InteractiveLookbook";
import BrandStoryPillars from "@/components/home/BrandStoryPillars";
import FloatingThemeCustomizer from "@/components/common/FloatingThemeCustomizer";

export default async function HomePage() {
  const products = await getProducts({ limit: 12 });
  const categories = await getCategories();

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. HERO SECTION: Interactive Haute-Couture Runway Slider */}
      <HeroCarousel />

      {/* 2. LUXURY RUNWAY TICKER */}
      <section className="border-y border-border/80 bg-muted/40 py-3.5 overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex items-center space-x-8 text-[11px] font-bold tracking-[0.22em] uppercase text-foreground/75 mx-4"
            >
              <span>SS&apos;26 HAUTE RUNWAY CAPSULE</span>
              <span className="text-secondary">✦</span>
              <span>COMPLIMENTARY INSURED EXPRESS SHIPPING</span>
              <span className="text-secondary">✦</span>
              <span>ETHICALLY LOOMED MULBERRY SILK</span>
              <span className="text-secondary">✦</span>
              <span>BESPOKE CONCIERGE VIA WHATSAPP</span>
              <span className="text-secondary">✦</span>
              <span>SUB-SECOND HEADLESS SPEED</span>
              <span className="text-secondary">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ASYMMETRIC EDITORIAL CATEGORY SHOWCASE */}
      <CategoryEditorial categories={categories} />

      {/* 4. CURATED PRODUCT SHOWCASE (With Filter Tabs & Quick-View Modal) */}
      <CuratedProductShowcase initialProducts={products} />

      {/* 5. INTERACTIVE LOOKBOOK (Vogue-Style Runway Canvas with Hotspots) */}
      <InteractiveLookbook />

      {/* 6. BRAND STORY, CRAFTSMANSHIP PILLARS & PRESS SHOWCASE */}
      <BrandStoryPillars />

      {/* 7. DISCREET FLOATING THEME CUSTOMIZER FOR AGENCY DEMO */}
      <FloatingThemeCustomizer />
    </div>
  );
}
