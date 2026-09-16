"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { Sparkles, ShoppingBag, ArrowRight, Check } from "lucide-react";

interface LookItem {
  id: string;
  name: string;
  price: number;
  size: string;
  image: string;
  pinTop: string; // e.g. "32%"
  pinLeft: string; // e.g. "50%"
}

interface RunwayLook {
  id: string;
  lookNumber: string;
  title: string;
  season: string;
  description: string;
  mainImage: string;
  items: LookItem[];
}

const RUNWAY_LOOKS: RunwayLook[] = [
  {
    id: "look-01",
    lookNumber: "LOOK NO. 01",
    season: "SS'26 RUNWAY CAPSULE",
    title: "Sculptural Power in Virgin Wool",
    description:
      "Featuring our iconic double-faced Italian virgin wool blazer paired with high-rise pleated palazzo trousers and hand-burnished leather footwear.",
    mainImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=85",
    items: [
      {
        id: "zel-blazer-01",
        name: "Sculpted Hourglass Wool Blazer",
        price: 8490,
        size: "M",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80",
        pinTop: "30%",
        pinLeft: "52%",
      },
      {
        id: "zel-trousers-01",
        name: "Pleated Wide-Leg Palazzo Trousers",
        price: 5200,
        size: "M",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",
        pinTop: "68%",
        pinLeft: "48%",
      },
      {
        id: "zel-bag-01",
        name: "Architectural Hand-Burnished Totebag",
        price: 11500,
        size: "STD",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
        pinTop: "50%",
        pinLeft: "25%",
      },
    ],
  },
  {
    id: "look-02",
    lookNumber: "LOOK NO. 02",
    season: "SS'26 PARIS SHOW",
    title: "Fluid Silk & Architectural Trench",
    description:
      "An effortless dialogue between lightweight mulberry silk and structured trench tailoring for evening vernissages.",
    mainImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=85",
    items: [
      {
        id: "zel-trench-02",
        name: "Architectural Raw Silk Trench",
        price: 14500,
        size: "L",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80",
        pinTop: "38%",
        pinLeft: "45%",
      },
      {
        id: "zel-boots-02",
        name: "Hand-Crafted Italian Ankle Boot",
        price: 9200,
        size: "UK 8",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
        pinTop: "85%",
        pinLeft: "55%",
      },
    ],
  },
];

export default function InteractiveLookbook() {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [activePinIndex, setActivePinIndex] = useState<number | null>(0);
  const [addedAll, setAddedAll] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const look = RUNWAY_LOOKS[activeLookIndex];
  const activeItem = activePinIndex !== null ? look.items[activePinIndex] : null;

  const totalLookPrice = look.items.reduce((sum, item) => sum + item.price, 0);

  const handleAddEnsemble = () => {
    look.items.forEach((item) => {
      addItem({
        id: `${item.id}-${item.size}`,
        productId: item.id,
        name: item.name,
        slug: item.name.toLowerCase().replace(/\s+/g, "-"),
        price: item.price,
        image: item.image,
        quantity: 1,
        selectedSize: item.size,
        selectedColor: "Atelier Standard",
      });
    });
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 2500);
    openCart();
  };

  const handleAddSingleItem = (item: LookItem) => {
    addItem({
      id: `${item.id}-${item.size}`,
      productId: item.id,
      name: item.name,
      slug: item.name.toLowerCase().replace(/\s+/g, "-"),
      price: item.price,
      image: item.image,
      quantity: 1,
      selectedSize: item.size,
      selectedColor: "Atelier Standard",
    });
    openCart();
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border/60 pb-5 gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-secondary flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span>EDITORIAL ATELIER</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-foreground mt-1 tracking-tight">
            Interactive Runway Lookbook
          </h2>
        </div>

        {/* Look Switcher Pills */}
        <div className="flex items-center space-x-2">
          {RUNWAY_LOOKS.map((l, idx) => (
            <button
              key={l.id}
              onClick={() => {
                setActiveLookIndex(idx);
                setActivePinIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                idx === activeLookIndex
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/40 hover:bg-muted text-foreground border border-border"
              }`}
            >
              {l.lookNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Canvas Grid */}
      <div className="bg-primary text-primary-foreground rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 border border-white/10">
        {/* Left: Model Imagery with Pulsating Hotspots */}
        <div className="relative min-h-[460px] lg:min-h-[580px] lg:col-span-7 bg-muted overflow-hidden select-none">
          <Image
            src={look.mainImage}
            alt={look.title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-black/20" />

          {/* Interactive Radar Hotspots */}
          {look.items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActivePinIndex(idx)}
              style={{ top: item.pinTop, left: item.pinLeft }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group/pin z-20 focus:outline-none"
              aria-label={`View ${item.name}`}
            >
              {/* Radar pulse ring */}
              <span className="absolute -inset-2 rounded-full bg-secondary/30 animate-ping" />
              <div
                className={`relative w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-xl transition-all duration-300 ${
                  activePinIndex === idx
                    ? "bg-secondary text-primary scale-125 ring-4 ring-white/50"
                    : "bg-white/90 text-primary hover:bg-secondary hover:text-white"
                }`}
              >
                0{idx + 1}
              </div>

              {/* Tooltip on hover */}
              <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/80 backdrop-blur-md text-white text-[11px] font-semibold whitespace-nowrap rounded-md opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {item.name} • {formatPrice(item.price)}
              </span>
            </button>
          ))}

          {/* Bottom Overlay Info on Canvas */}
          <div className="absolute bottom-6 left-6 right-6 z-10 hidden sm:flex items-center justify-between text-xs text-white/80">
            <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
              Click numbered pins to inspect individual runway garments
            </span>
          </div>
        </div>

        {/* Right: Lookbook Narrative & Focused Garments */}
        <div className="p-8 sm:p-12 lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.25em] text-secondary uppercase bg-white/10 px-3 py-1 rounded-full">
                {look.season} • {look.lookNumber}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              {look.title}
            </h3>

            <p className="text-xs text-white/75 leading-relaxed">
              {look.description}
            </p>

            {/* List of Garments with Active Selection Highlight */}
            <div className="space-y-2.5 pt-2">
              <p className="text-[10px] font-bold tracking-widest text-secondary uppercase">
                Ensemble Pieces Included:
              </p>

              <div className="space-y-2">
                {look.items.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setActivePinIndex(idx)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      activePinIndex === idx
                        ? "bg-white/15 border-secondary shadow-sm"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-bold font-mono text-secondary">
                        0{idx + 1}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-white">{item.name}</p>
                        <p className="text-[10px] text-white/60">
                          Pre-selected Size: {item.size}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-bold text-secondary">
                        {formatPrice(item.price)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddSingleItem(item);
                        }}
                        className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="Add only this item to bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={handleAddEnsemble}
              className="w-full py-4 bg-secondary text-primary font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-secondary-hover transition-all flex items-center justify-center gap-2 shadow-xl active:scale-[0.99]"
            >
              {addedAll ? (
                <>
                  <Check className="w-4 h-4 text-emerald-800" />
                  <span>Ensemble Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire Entire Look • {formatPrice(totalLookPrice)}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-[11px] text-white/60 px-1">
              <span>Includes 3 Pieces</span>
              <span>Complimentary Insured Courier</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
