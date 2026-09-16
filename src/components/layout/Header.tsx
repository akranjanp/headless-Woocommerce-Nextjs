"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zelevationConfig, NavItem } from "@/../zelevation.config";
import { 
  Menu, 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  X, 
  ChevronDown 
} from "lucide-react";
import TopAnnouncement from "./TopAnnouncement";
import MegaMenu from "./MegaMenu";
import MobileDrawer from "./MobileDrawer";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<NavItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const totalCartItems = useCartStore((state) => state.getTotalItems());
  const openCart = useCartStore((state) => state.openCart);
  const wishlistItems = useWishlistStore((state) => state.items);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Announcement Bar */}
      <TopAnnouncement />

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border/80 py-3.5"
            : "bg-white/80 backdrop-blur-sm border-b border-border/40 py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Hamburger & Desktop Navigation Links */}
          <div className="flex items-center space-x-6">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-foreground/80 hover:text-foreground focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {zelevationConfig.navigation.map((item, index) => {
                const isMega = item.isMegaMenu;

                return (
                  <div
                    key={index}
                    className="relative group py-2"
                    onMouseEnter={() => {
                      if (isMega) setActiveMegaMenu(item);
                      else setActiveMegaMenu(null);
                    }}
                  >
                    <Link
                      href={item.href}
                      className="inline-flex items-center text-xs font-semibold tracking-widest uppercase text-foreground/80 hover:text-foreground transition-colors group-hover:text-primary"
                    >
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="ml-1.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-secondary/20 text-secondary uppercase">
                          {item.badge}
                        </span>
                      )}
                      {isMega && (
                        <ChevronDown className="w-3 h-3 ml-1 text-muted-foreground group-hover:rotate-180 transition-transform duration-200" />
                      )}
                    </Link>

                    {/* Underline indicator */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex-1 lg:flex-initial text-center lg:text-left">
            <Link href="/" className="inline-flex items-baseline space-x-1.5 group">
              <span className="font-serif text-xl sm:text-2xl font-black tracking-tight text-primary group-hover:opacity-90 transition-opacity">
                {zelevationConfig.branding.logoText}
              </span>
              <span className="text-[10px] font-bold tracking-widest text-secondary uppercase bg-secondary/10 px-1.5 py-0.5 rounded">
                {zelevationConfig.branding.logoAccent}
              </span>
            </Link>
          </div>

          {/* Right: Search, Wishlist, User Account, Cart Bag */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-foreground/70 hover:text-foreground hover:bg-muted/60 rounded-full transition-colors"
              aria-label="Search catalog"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/account?tab=wishlist"
              className="relative p-2 text-foreground/70 hover:text-foreground hover:bg-muted/60 rounded-full transition-colors hidden sm:inline-flex"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-secondary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* My Account Link */}
            <Link
              href="/account"
              className="p-2 text-foreground/70 hover:text-foreground hover:bg-muted/60 rounded-full transition-colors hidden sm:inline-flex"
              aria-label="My Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Trigger with live count */}
            <button
              onClick={openCart}
              className="relative p-2 text-foreground/80 hover:text-foreground hover:bg-muted/60 rounded-full transition-colors"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-4 h-4 px-1 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center animate-scale-in">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Mega Menu dropdown */}
      {activeMegaMenu && (
        <MegaMenu
          item={activeMegaMenu}
          isOpen={true}
          onClose={() => setActiveMegaMenu(null)}
        />
      )}

      {/* Mobile-First Full Navigation Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Quick Search Modal Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-border shadow-xl p-4 sm:p-6 animate-slide-down z-30">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-5 h-5 text-muted-foreground absolute left-3" />
              <input
                type="text"
                autoFocus
                placeholder="Search coats, dresses, shirts, silk, accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-12 py-3 bg-muted/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-3 flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="font-semibold">Popular Searches:</span>
              <Link href="/shop?cat=women-dresses" onClick={() => setIsSearchOpen(false)} className="hover:underline">
                Dresses
              </Link>
              <span>•</span>
              <Link href="/shop?cat=men-shirts" onClick={() => setIsSearchOpen(false)} className="hover:underline">
                Silk Shirts
              </Link>
              <span>•</span>
              <Link href="/shop?cat=accessories" onClick={() => setIsSearchOpen(false)} className="hover:underline">
                Leather Bags
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
