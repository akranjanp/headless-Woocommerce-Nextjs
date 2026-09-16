import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts, getCategories } from "@/lib/woocommerce";
import ProductCard from "@/components/product/ProductCard";
import { zelevationConfig } from "@/../zelevation.config";
import { ArrowUpRight, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default async function HomePage() {
  const products = await getProducts({ limit: 8 });
  const categories = await getCategories();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION: Editorial Fashion Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-primary overflow-hidden">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=85"
            alt="Editorial runway showcase"
            fill
            priority
            className="object-cover object-top opacity-50 scale-105 animate-fade-in"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-black/30" />
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-6 pt-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-widest uppercase text-secondary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SS&apos;26 Runway Capsule • Zelevation Atelier</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            THE SILHOUETTE <br />
            <span className="italic font-light text-secondary">OF NOW</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-white/80 font-normal leading-relaxed">
            Architectural tailoring, hand-loomed mulberry silk, and relaxed silhouettes engineered for the discerning vanguard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/shop?cat=women"
              className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-secondary hover:text-white transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group"
            >
              <span>Explore Women</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/shop?cat=men"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Discover Men</span>
            </Link>
          </div>

          {/* Headless Badge */}
          <div className="pt-8 flex items-center justify-center gap-6 text-[11px] font-medium tracking-wider text-white/60">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-secondary" />
              Sub-second Headless Speed
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
              WordPress WooCommerce Powered
            </span>
          </div>
        </div>
      </section>

      {/* 2. INFINITE MARQUEE TICKER */}
      <section className="border-y border-border/80 bg-muted/40 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-8 text-xs font-bold tracking-widest uppercase text-foreground/70 mx-4">
              <span>NEW SS&apos;26 DROPS</span>
              <span className="text-secondary">•</span>
              <span>FREE WORLDWIDE SHIPPING OVER ₹1,999</span>
              <span className="text-secondary">•</span>
              <span>ETHICALLY LOOMED SILK & WOOL</span>
              <span className="text-secondary">•</span>
              <span>ZELEVATION COMMERCE ENGINE</span>
              <span className="text-secondary">•</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CURATED COLLECTIONS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-secondary mb-1">
              CURATED SILHOUETTES
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Explore by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold tracking-wider uppercase text-foreground hover:text-secondary flex items-center gap-1 mt-2 sm:mt-0 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?cat=${cat.slug}`}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-muted shadow-xs"
            >
              {cat.image && (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-1">
                <span className="text-[10px] font-bold tracking-widest text-secondary uppercase">
                  {cat.itemCount} Designs
                </span>
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-secondary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-white/70 line-clamp-1">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-secondary mb-1">
              THE SARTORIAL EDIT
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              New Arrivals & Best Sellers
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold tracking-wider uppercase text-foreground hover:text-secondary flex items-center gap-1 mt-2 sm:mt-0 transition-colors"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL LOOKBOOK: "SHOP THE LOOK" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-primary-foreground rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          {/* Editorial Image with Hotspot */}
          <div className="relative h-[420px] lg:h-auto lg:col-span-7 bg-muted overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=85"
              alt="Editorial lookbook style"
              fill
              className="object-cover object-top group-hover:scale-102 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            {/* Interactive Hotspot Tag */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-2xl flex items-center gap-2 text-foreground text-xs font-semibold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span>Look No. 04: The Hourglass Blazer</span>
            </div>
          </div>

          {/* Lookbook Narrative & Items */}
          <div className="p-8 sm:p-12 lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-bold tracking-widest text-secondary uppercase">
                LOOKBOOK SS&apos;26 • EDIT 04
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Sculptural Power in Virgin Wool
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Featuring our iconic double-faced Italian virgin wool blazer paired with high-rise pleated palazzo trousers. Designed for maximum presence with minimal effort.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <p className="text-[11px] font-semibold tracking-wider text-secondary uppercase">
                Complete Ensemble Included:
              </p>
              <ul className="text-xs text-white/80 space-y-1">
                <li>• Sculpted Hourglass Wool Blazer (₹8,490)</li>
                <li>• Pleated Wide-Leg Palazzo Trousers (₹5,200)</li>
                <li>• Architectural Hand-Burnished Totebag (₹11,500)</li>
              </ul>
            </div>

            <div>
              <Link
                href="/shop/sculpted-hourglass-wool-blazer"
                className="w-full py-3.5 bg-secondary text-primary font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-secondary-hover transition-colors flex items-center justify-center gap-2"
              >
                <span>Shop This Entire Look</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ZELEVATION AGENCY VALUE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-muted via-white to-muted border border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-primary text-white px-2 py-0.5 rounded">
              AGENCY BOILERPLATE BY {zelevationConfig.agency.name.toUpperCase()}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
              Ready to deploy this template for your client?
            </h3>
            <p className="text-xs text-muted-foreground max-w-xl">
              Customize colors, logo, navigation and connect your client&apos;s WordPress WooCommerce site via <code className="text-primary font-semibold">zelevation.config.ts</code> in less than 15 minutes.
            </p>
          </div>

          <Link
            href="/shop"
            className="px-6 py-3 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-primary-hover transition-colors shrink-0"
          >
            Explore Catalog Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
