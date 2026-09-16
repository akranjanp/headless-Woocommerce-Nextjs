"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zelevationConfig } from "@/../zelevation.config";
import { 
  X, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  Heart, 
  User, 
  Package, 
  MessageSquare,
  Instagram,
  Facebook,
  Twitter
} from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const router = useRouter();
  const [expandedNavIndex, setExpandedNavIndex] = useState<number | null>(0); // Default first category open
  const [searchQuery, setSearchQuery] = useState("");
  const wishlistItems = useWishlistStore((state) => state.items);

  if (!isOpen) return null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  const toggleAccordion = (index: number) => {
    setExpandedNavIndex(expandedNavIndex === index ? null : index);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Slide-in Drawer Container */}
      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-sm bg-card shadow-2xl flex flex-col h-full z-10 animate-fade-in">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background">
            <div className="flex items-center space-x-1.5">
              <span className="font-serif text-lg font-bold tracking-tight text-primary">
                {zelevationConfig.branding.logoText}
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-secondary px-1.5 py-0.5 rounded bg-secondary/10">
                {zelevationConfig.branding.logoAccent}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar Input */}
          <div className="px-6 py-3 border-b border-border/60 bg-muted/30">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search collection, dresses, coats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
            </form>
          </div>

          {/* Navigation Accordion List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
            <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase mb-2">
              Browse Categories
            </p>

            {zelevationConfig.navigation.map((item, index) => {
              const hasSubmenu =
                item.isMegaMenu &&
                item.megaCategories &&
                item.megaCategories.length > 0;
              const isExpanded = expandedNavIndex === index;

              return (
                <div key={index} className="border-b border-border/40 pb-2">
                  <div
                    onClick={() => (hasSubmenu ? toggleAccordion(index) : onClose())}
                    className="flex items-center justify-between py-2.5 cursor-pointer select-none group"
                  >
                    <div className="flex items-center space-x-2">
                      {hasSubmenu ? (
                        <span className="text-sm font-semibold tracking-wide text-foreground group-hover:text-primary">
                          {item.title}
                        </span>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="text-sm font-semibold tracking-wide text-foreground group-hover:text-primary"
                        >
                          {item.title}
                        </Link>
                      )}
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-secondary/15 text-secondary uppercase">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {hasSubmenu && (
                      <button className="p-1 text-muted-foreground">
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isExpanded ? "rotate-180 text-primary" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Nested Accordion Submenu */}
                  {hasSubmenu && isExpanded && (
                    <div className="pl-3 pr-1 py-2 space-y-4 bg-muted/20 rounded-lg animate-slide-down">
                      {item.megaCategories?.map((catGroup, cIdx) => (
                        <div key={cIdx} className="space-y-1.5">
                          <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                            {catGroup.categoryTitle}
                          </p>
                          <div className="space-y-1 pl-2 border-l border-border">
                            {catGroup.items.map((sub, sIdx) => (
                              <Link
                                key={sIdx}
                                href={sub.href}
                                onClick={onClose}
                                className="flex items-center justify-between py-1.5 text-xs text-foreground/80 hover:text-foreground font-medium"
                              >
                                <span>{sub.title}</span>
                                {sub.badge && (
                                  <span className="text-[8px] font-bold px-1 rounded bg-muted text-foreground/70">
                                    {sub.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}

                      {item.featuredBanner && (
                        <Link
                          href={item.featuredBanner.href}
                          onClick={onClose}
                          className="block p-3 rounded-md bg-primary text-primary-foreground text-xs mt-2"
                        >
                          <p className="text-[9px] font-bold uppercase tracking-wider text-secondary">
                            Featured
                          </p>
                          <p className="font-semibold">{item.featuredBanner.title}</p>
                          <p className="text-[10px] text-white/80 mt-0.5">
                            {item.featuredBanner.ctaText} →
                          </p>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quick Action Links */}
            <div className="pt-4 space-y-2">
              <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase mb-2">
                My Account & Help
              </p>

              <Link
                href="/account"
                onClick={onClose}
                className="flex items-center space-x-3 py-2 text-xs font-medium text-foreground/80 hover:text-primary"
              >
                <User className="w-4 h-4 text-muted-foreground" />
                <span>My Profile & Orders</span>
              </Link>

              <Link
                href="/account?tab=orders"
                onClick={onClose}
                className="flex items-center space-x-3 py-2 text-xs font-medium text-foreground/80 hover:text-primary"
              >
                <Package className="w-4 h-4 text-muted-foreground" />
                <span>Track My Delivery</span>
              </Link>

              <Link
                href="/account?tab=wishlist"
                onClick={onClose}
                className="flex items-center justify-between py-2 text-xs font-medium text-foreground/80 hover:text-primary"
              >
                <div className="flex items-center space-x-3">
                  <Heart className="w-4 h-4 text-muted-foreground" />
                  <span>My Saved Wishlist</span>
                </div>
                {wishlistItems.length > 0 && (
                  <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <a
                href={`https://wa.me/918009204400?text=Hi%20${encodeURIComponent(
                  zelevationConfig.store.name
                )}%20Concierge`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-3 py-2 text-xs font-medium text-emerald-600 hover:text-emerald-700"
              >
                <MessageSquare className="w-4 h-4" />
                <span>VIP WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          {/* Footer of Drawer: Agency watermark and social icons */}
          <div className="p-4 border-t border-border bg-muted/40 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-muted-foreground">
              <a href={zelevationConfig.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-primary">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={zelevationConfig.socials.facebook} target="_blank" rel="noreferrer" className="hover:text-primary">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={zelevationConfig.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-primary">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <span className="text-[10px] text-muted-foreground">
              Currency: <strong>{zelevationConfig.store.currencyCode} ({zelevationConfig.store.currencySymbol})</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
