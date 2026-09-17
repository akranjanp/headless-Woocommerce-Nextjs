import React from "react";
import Link from "next/link";
import Image from "next/image";
import { zelevationConfig } from "@/../zelevation.config";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-lg bg-white/5 text-secondary">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">
                Complimentary Express Shipping
              </h4>
              <p className="text-xs text-white/60 mt-1">
                On all qualifying orders over {zelevationConfig.store.currencySymbol}
                {zelevationConfig.store.freeShippingThreshold.toLocaleString("en-IN")}.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-lg bg-white/5 text-secondary">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">
                7-Day Concierge Returns
              </h4>
              <p className="text-xs text-white/60 mt-1">
                Effortless doorstep pickups and swift instant refunds.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-lg bg-white/5 text-secondary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">
                100% Certified Authentic
              </h4>
              <p className="text-xs text-white/60 mt-1">
                Handcrafted from sustainably sourced luxury fabrics.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-lg bg-white/5 text-secondary">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">
                VIP Stylist Assistance
              </h4>
              <p className="text-xs text-white/60 mt-1">
                Personal bespoke fitting via WhatsApp & direct phone.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-500/40 bg-white p-0.5">
                <Image
                  src="/logo.jpg"
                  alt="Zelevation"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-black tracking-[0.2em] text-white uppercase leading-none">
                  {zelevationConfig.branding.logoText}
                </span>
                <span className="text-[7.5px] font-sans font-bold tracking-[0.4em] text-amber-400 uppercase mt-1">
                  HAUTE ATELIER
                </span>
              </div>
            </Link>
            <p className="text-xs text-white/70 max-w-sm leading-relaxed">
              {zelevationConfig.store.tagline}. Redefining luxury through architectural silhouettes, ethical slow-fashion tailoring, and sensory materials.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary mb-2">
                JOIN THE ATELIER PRIVILEGE
              </p>
              <p className="text-xs text-white/60 mb-3">
                Subscribe for private runway previews and 15% off your maiden order.
              </p>
              <form className="flex max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-3.5 py-2.5 bg-white/5 border border-white/20 rounded-l-md text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-secondary"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-secondary text-primary font-bold text-xs rounded-r-md hover:bg-secondary-hover transition-colors flex items-center gap-1"
                >
                  <span>JOIN</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links: Women */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-white uppercase mb-4">
              WOMEN
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><Link href="/shop?cat=women-dresses" className="hover:text-secondary transition-colors">Dresses & Gowns</Link></li>
              <li><Link href="/shop?cat=women-blazers" className="hover:text-secondary transition-colors">Tailored Blazers</Link></li>
              <li><Link href="/shop?cat=women-trousers" className="hover:text-secondary transition-colors">Palazzo Trousers</Link></li>
              <li><Link href="/shop?cat=women-knitwear" className="hover:text-secondary transition-colors">Cashmere Knitwear</Link></li>
              <li><Link href="/shop?cat=accessories" className="hover:text-secondary transition-colors">Handcrafted Bags</Link></li>
            </ul>
          </div>

          {/* Quick Links: Men */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-white uppercase mb-4">
              MEN
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><Link href="/shop?cat=men-tees" className="hover:text-secondary transition-colors">Heavyweight Boxy Tees</Link></li>
              <li><Link href="/shop?cat=men-shirts" className="hover:text-secondary transition-colors">Raw Silk Shirts</Link></li>
              <li><Link href="/shop?cat=men-trousers" className="hover:text-secondary transition-colors">Pleated Wide Pants</Link></li>
              <li><Link href="/shop?cat=men-jackets" className="hover:text-secondary transition-colors">Bombers & Trench</Link></li>
              <li><Link href="/shop?cat=men-shoes" className="hover:text-secondary transition-colors">Leather Loafers</Link></li>
            </ul>
          </div>

          {/* Customer Care & Concierge */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-white uppercase mb-4">
              CONCIERGE
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><Link href="/account?tab=orders" className="hover:text-secondary transition-colors">Track Order Status</Link></li>
              <li><Link href="/account" className="hover:text-secondary transition-colors">My Profile & Addresses</Link></li>
              <li><Link href="/shop" className="hover:text-secondary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/shop" className="hover:text-secondary transition-colors">Bespoke Fitting Guide</Link></li>
              <li>
                <a href={`mailto:${zelevationConfig.store.supportEmail}`} className="hover:text-secondary transition-colors">
                  {zelevationConfig.store.supportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Agency Credit, Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            <p>
              © {new Date().getFullYear()} {zelevationConfig.store.name}. All rights reserved.
            </p>
            <p className="text-[11px] text-white/40 mt-1">
              {zelevationConfig.agency.credit} —{" "}
              <a
                href={zelevationConfig.agency.url}
                target="_blank"
                rel="noreferrer"
                className="text-secondary hover:underline font-semibold"
              >
                {zelevationConfig.agency.name}
              </a>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a href={zelevationConfig.socials.instagram} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href={zelevationConfig.socials.facebook} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href={zelevationConfig.socials.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
