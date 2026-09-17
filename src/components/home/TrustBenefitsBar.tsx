"use client";

import React from "react";
import { Truck, ShieldCheck, RefreshCw, MessageSquare } from "lucide-react";

const BENEFITS = [
  {
    icon: Truck,
    title: "Complimentary Express Delivery",
    description: "Insured 48H doorstep dispatch on orders over ₹1,999 across India.",
    accent: "from-amber-500 to-orange-500",
  },
  {
    icon: ShieldCheck,
    title: "100% Certified Authentic",
    description: "Individually inspected and hallmarked from master Italian & Indian looms.",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    icon: RefreshCw,
    title: "30-Day Doorstep Exchange",
    description: "Hassle-free size swaps & returns with complimentary home pickup.",
    accent: "from-blue-500 to-indigo-500",
  },
  {
    icon: MessageSquare,
    title: "24/7 WhatsApp VIP Concierge",
    description: "One-on-one styling advice & size guidance from our Bangalore atelier.",
    accent: "from-rose-500 to-amber-500",
  },
];

export default function TrustBenefitsBar() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-stone-900 via-neutral-900 to-stone-950 text-white rounded-3xl p-8 sm:p-12 border border-amber-500/20 shadow-2xl relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {BENEFITS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col space-y-3 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-400/40 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-white/75 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
