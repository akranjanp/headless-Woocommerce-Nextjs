"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, Sparkles, Zap, ShieldCheck, Star } from "lucide-react";

interface Slide {
  id: number;
  badge: string;
  titlePart1: string;
  titleAccent: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  image: string;
  lookTag: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    badge: "✨ SS'26 HAUTE RUNWAY • EXCLUSIVE DROP",
    titlePart1: "ELEVATE YOUR",
    titleAccent: "EVERYDAY LUXURY",
    description:
      "Sculptural tailoring, pure Italian mulberry silk, and architectural precision designed to make every entrance unforgettable.",
    primaryCtaText: "Shop New Arrivals",
    primaryCtaHref: "/shop?cat=women",
    secondaryCtaText: "View Interactive Lookbook",
    secondaryCtaHref: "/shop?lookbook=true",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=85",
    lookTag: "✦ Milan Runway • Sculptural Mulberry Silk",
  },
  {
    id: 2,
    badge: "🌟 CONTEMPORARY SARTORIAL MENSWEAR",
    titlePart1: "MODERN ELEGANCE",
    titleAccent: "IN RAW SILK & CASHMERE",
    description:
      "Sharp tailored overcoats, relaxed pleated trousers, and bespoke handcrafted leather sneakers for the modern vanguard.",
    primaryCtaText: "Explore Menswear",
    primaryCtaHref: "/shop?cat=men",
    secondaryCtaText: "Discover Footwear",
    secondaryCtaHref: "/shop?cat=men-shoes",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=85",
    lookTag: "✦ Paris Preview • Artisanal Footwear",
  },
  {
    id: 3,
    badge: "🔥 SUNLIT RIVIERA RESORT CAPSULE • UP TO 40% OFF",
    titlePart1: "THE GOLDEN HOUR",
    titleAccent: "RESORT COLLECTION",
    description:
      "Effortless silk linen dresses, lightweight resortwear, and limited-edition handcrafted leather accessories for sun-drenched days.",
    primaryCtaText: "Shop Summer Sale",
    primaryCtaHref: "/shop?filter=sale",
    secondaryCtaText: "Browse Entire Edit",
    secondaryCtaHref: "/shop",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=85",
    lookTag: "✦ Saint-Tropez Resort • Limited Edition",
  },
];

export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const slide = HERO_SLIDES[activeSlide];

  return (
    <section
      className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center bg-primary overflow-hidden select-none"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Images with Cross-fade */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === activeSlide ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={s.image}
            alt={s.badge}
            fill
            priority={idx === 0}
            className="object-cover object-top opacity-55 scale-105 transition-transform duration-10000"
            sizes="100vw"
          />
          {/* Radial & Gradient Overlays for High-Fashion Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/55 to-black/35" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60" />
        </div>
      ))}

      {/* Floating Runway Tag */}
      <div className="absolute top-8 right-8 z-10 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white/90">
        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
        <span>{slide.lookTag}</span>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-6 sm:space-y-8 pt-10 pb-16">
        {/* Editorial Sub-badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/20 backdrop-blur-md border border-amber-400/40 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-amber-200 animate-fade-in shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{slide.badge}</span>
        </div>

        {/* Majestic Haute-Couture Typography */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] drop-shadow-md">
          {slide.titlePart1} <br />
          <span className="italic font-light bg-gradient-to-r from-amber-300 via-rose-300 to-amber-200 bg-clip-text text-transparent drop-shadow-md">
            {slide.titleAccent}
          </span>
        </h1>

        {/* Narrative */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-white/90 font-normal leading-relaxed tracking-wide">
          {slide.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href={slide.primaryCtaHref}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-xl shadow-rose-500/25 flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{slide.primaryCtaText}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <Link
            href={slide.secondaryCtaHref}
            className="w-full sm:w-auto px-8 py-4 bg-white/15 backdrop-blur-md border border-white/40 hover:border-amber-300 text-white hover:text-amber-200 font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-white/25 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <span>{slide.secondaryCtaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Client Trust & Assurance Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] font-medium tracking-widest uppercase text-white/85">
          <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-xs">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            4.9/5 Rating (2,400+ VIP Clients)
          </span>
          <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Express 48H Insured Delivery
          </span>
          <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            100% Certified Authentic
          </span>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <div className="absolute bottom-6 inset-x-0 z-20 max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Numbered Indicators */}
        <div className="flex items-center space-x-3">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`transition-all duration-300 flex items-center gap-1.5 ${
                idx === activeSlide
                  ? "text-white font-bold"
                  : "text-white/40 hover:text-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <span className="text-[11px] tracking-widest font-mono">
                0{idx + 1}
              </span>
              <span
                className={`h-0.5 transition-all duration-500 rounded-full ${
                  idx === activeSlide ? "w-8 bg-secondary" : "w-3 bg-white/30"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Chevrons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={prevSlide}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-105"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-105"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
