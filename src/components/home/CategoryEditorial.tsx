import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { Category } from "@/types";

interface CategoryEditorialProps {
  categories: Category[];
}

export default function CategoryEditorial({ categories }: CategoryEditorialProps) {
  // Curated imagery and descriptions for high-fashion aesthetic
  const curatedCapsules = [
    {
      id: "women",
      title: "Haute Couture Women",
      subtitle: "CAPSULE 01 • SCULPTURAL SILHOUETTES",
      description: "Double-faced virgin wool blazers, raw silk slip dresses, and fluid palazzo trousers.",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&q=85",
      href: "/shop?cat=women",
      count: "17 Pieces",
      aspect: "tall", // Spans 2 rows on desktop
    },
    {
      id: "men",
      title: "Contemporary Menswear",
      subtitle: "CAPSULE 02 • ARCHITECTURAL TAILORING",
      description: "Heavyweight boxy overshirts and relaxed pleated trousers.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=85",
      href: "/shop?cat=men",
      count: "14 Pieces",
      aspect: "standard",
    },
    {
      id: "footwear",
      title: "Bespoke Footwear",
      subtitle: "CAPSULE 03 • ATHLETIC & LEATHER",
      description: "Performance soles meet handcrafted Italian leather detailing.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85",
      href: "/shop?cat=men-shoes",
      count: "8 Styles",
      aspect: "standard",
    },
    {
      id: "accessories",
      title: "Artisanal Accessories",
      subtitle: "CAPSULE 04 • LEATHER & SILK",
      description: "Hand-burnished leather totebags and mulberry silk scarves.",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1000&q=85",
      href: "/shop?cat=accessories",
      count: "12 Items",
      aspect: "wide",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border/60 pb-5 gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-secondary flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span>EDITORIAL CAPSULES</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-foreground mt-1 tracking-tight">
            Explore Seasonal Silhouettes
          </h2>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.15em] uppercase text-foreground hover:text-secondary transition-colors group"
        >
          <span>View All Collections</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Asymmetric Magazine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* 1. Large Tall Hero Card (Spans 6 cols, full height) */}
        <Link
          href={curatedCapsules[0].href}
          className="group relative md:col-span-6 min-h-[480px] lg:min-h-[580px] rounded-2xl overflow-hidden bg-muted shadow-md flex flex-col justify-end p-8 sm:p-10 transition-transform duration-500"
        >
          <Image
            src={curatedCapsules[0].image}
            alt={curatedCapsules[0].title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          {/* Card Meta */}
          <div className="relative z-10 space-y-3 text-white">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.25em] text-secondary uppercase bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                {curatedCapsules[0].count}
              </span>
              <span className="p-2.5 rounded-full bg-white/15 backdrop-blur-md group-hover:bg-secondary group-hover:text-primary transition-colors text-white">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            <div>
              <p className="text-[10px] font-semibold tracking-widest text-white/70 uppercase">
                {curatedCapsules[0].subtitle}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1 group-hover:text-secondary transition-colors">
                {curatedCapsules[0].title}
              </h3>
            </div>

            <p className="text-xs text-white/80 max-w-md leading-relaxed">
              {curatedCapsules[0].description}
            </p>
          </div>
        </Link>

        {/* 2. Right Column (Spans 6 cols, containing 2 stacked cards) */}
        <div className="md:col-span-6 flex flex-col gap-6">
          {/* Top Card: Contemporary Menswear */}
          <Link
            href={curatedCapsules[1].href}
            className="group relative min-h-[260px] lg:min-h-[275px] rounded-2xl overflow-hidden bg-muted shadow-md flex flex-col justify-end p-6 sm:p-8 flex-1"
          >
            <Image
              src={curatedCapsules[1].image}
              alt={curatedCapsules[1].title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

            <div className="relative z-10 space-y-2 text-white">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold tracking-widest text-secondary uppercase bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                  {curatedCapsules[1].count}
                </span>
                <span className="p-2 rounded-full bg-white/15 backdrop-blur-md group-hover:bg-secondary group-hover:text-primary transition-colors text-white">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <p className="text-[9px] font-semibold tracking-wider text-white/70 uppercase">
                  {curatedCapsules[1].subtitle}
                </p>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5 group-hover:text-secondary transition-colors">
                  {curatedCapsules[1].title}
                </h3>
              </div>

              <p className="text-xs text-white/80 line-clamp-1">
                {curatedCapsules[1].description}
              </p>
            </div>
          </Link>

          {/* Bottom Card: Bespoke Footwear */}
          <Link
            href={curatedCapsules[2].href}
            className="group relative min-h-[260px] lg:min-h-[275px] rounded-2xl overflow-hidden bg-muted shadow-md flex flex-col justify-end p-6 sm:p-8 flex-1"
          >
            <Image
              src={curatedCapsules[2].image}
              alt={curatedCapsules[2].title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

            <div className="relative z-10 space-y-2 text-white">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold tracking-widest text-secondary uppercase bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                  {curatedCapsules[2].count}
                </span>
                <span className="p-2 rounded-full bg-white/15 backdrop-blur-md group-hover:bg-secondary group-hover:text-primary transition-colors text-white">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <p className="text-[9px] font-semibold tracking-wider text-white/70 uppercase">
                  {curatedCapsules[2].subtitle}
                </p>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5 group-hover:text-secondary transition-colors">
                  {curatedCapsules[2].title}
                </h3>
              </div>

              <p className="text-xs text-white/80 line-clamp-1">
                {curatedCapsules[2].description}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
