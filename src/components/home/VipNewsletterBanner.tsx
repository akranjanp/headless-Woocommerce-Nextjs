"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function VipNewsletterBanner() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#090d16] via-[#161a29] to-[#090d16] border border-amber-500/30 p-8 sm:p-14 text-white shadow-2xl">
        {/* Glowing atmospheric circles */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>EXCLUSIVE ATELIER ACCESS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Unlock <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-amber-200 bg-clip-text text-transparent italic">₹1,000 Off</span> Your Maiden Acquisition
          </h2>

          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
            Join 18,000+ discerning fashion insiders who receive early access to seasonal runway drops, private VIP archive sales, and bespoke styling sessions.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 flex items-center justify-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-xs sm:text-sm font-bold">
                Welcome to the Atelier! Your ₹1,000 voucher code is: <strong className="text-white">ZELEVATION1000</strong>
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                placeholder="Enter your private email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 backdrop-blur-sm"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 flex-shrink-0 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Claim Voucher</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[10px] text-white/50 tracking-wider uppercase">
            Strictly curated. Zero spam. Unsubscribe anytime with 1 click.
          </p>
        </div>
      </div>
    </section>
  );
}
