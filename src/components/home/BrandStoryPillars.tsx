import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Scissors, MessageSquare, Star } from "lucide-react";
import { zelevationConfig } from "@/../zelevation.config";

export default function BrandStoryPillars() {
  const pressOutlets = [
    "VOGUE",
    "GQ EDITORIAL",
    "HARPER'S BAZAAR",
    "ELLE INTERNATIONAL",
    "MONOCLE",
    "THE BUSINESS OF FASHION",
  ];

  const pillars = [
    {
      icon: Sparkles,
      title: "Ethically Sourced Materials",
      description:
        "Every garment utilizes hand-loomed mulberry silk, GOTS-certified organic cotton, and double-faced Italian virgin wool from centuries-old family mills.",
    },
    {
      icon: Scissors,
      title: "Architectural Precision",
      description:
        "Zero-waste pattern engineering that balances dramatic silhouettes with fluid comfort, sculpted to drape naturally across all modern body forms.",
    },
    {
      icon: MessageSquare,
      title: "White-Glove VIP Concierge",
      description:
        "Direct access to your dedicated personal atelier stylist on WhatsApp for bespoke sizing, lookbook pairings, and private runway reservations.",
    },
  ];

  return (
    <section className="space-y-16 py-10">
      {/* 1. High-Fashion Press Bar */}
      <div className="border-y border-border/80 bg-muted/20 py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground">
            AS FEATURED ACROSS GLOBAL COUTURE EDITORIALS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70">
            {pressOutlets.map((outlet, idx) => (
              <span
                key={idx}
                className="font-serif text-sm sm:text-base md:text-lg font-black tracking-[0.25em] text-foreground/80 uppercase hover:text-foreground transition-colors cursor-default"
              >
                {outlet}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Craftsmanship Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-card border border-border/80 rounded-2xl p-8 space-y-4 shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground">
                  {p.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. VIP Client Concierge CTA Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-primary text-primary-foreground p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1 text-secondary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
              ))}
              <span className="text-xs font-bold text-white ml-2">4.9 / 5 Client Satisfaction</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Need Personal Sizing or Runway Guidance?
            </h3>
            <p className="text-xs text-white/70 max-w-xl leading-relaxed">
              Connect instantly with our master tailors and atelier consultants on WhatsApp for complimentary bespoke fitting support.
            </p>
          </div>

          <a
            href={`https://wa.me/918009204400?text=Hi%20${encodeURIComponent(
              zelevationConfig.store.name
            )}%20Concierge,%20I%20would%20like%20styling%20advice.`}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 bg-secondary text-primary font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-secondary-hover transition-all flex items-center gap-2 shrink-0 shadow-lg active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat With VIP Stylist</span>
          </a>
        </div>
      </div>
    </section>
  );
}
