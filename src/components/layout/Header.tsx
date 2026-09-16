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
import { useAuthStore } from "@/store/useAuthStore";

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<NavItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);

  const totalCartItems = useCartStore((state) => state.getTotalItems());
  const openCart = useCartStore((state) => state.openCart);
  const wishlistItems = useWishlistStore((state) => state.items);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    setIsClient(true);
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

      {/* Main Navbar with Glassmorphism */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-border/80 py-3"
            : "bg-white/90 backdrop-blur-sm border-b border-border/40 py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Grid Layout: 3-Column Balanced System */}
          <div className="hidden lg:grid lg:grid-cols-12 items-center">
            {/* Left Column (5 cols): High-Fashion Navigation */}
            <div className="col-span-5 flex items-center space-x-6 xl:space-x-8">
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
                      className="inline-flex items-center text-[11px] font-semibold tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground transition-colors group-hover:text-primary"
                    >
                      <span>{item.title}</span>
                      {isMega && (
                        <ChevronDown className="w-3 h-3 ml-1 text-muted-foreground/80 group-hover:rotate-180 transition-transform duration-200" />
                      )}
                    </Link>

                    {/* Minimal Luxury Hairline indicator */}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full" />
                  </div>
                );
              })}
            </div>

            {/* Center Column (2 cols): Majestic Centered Haute-Couture Brand Logo */}
            <div className="col-span-2 flex flex-col items-center justify-center text-center">
              <Link href="/" className="inline-flex flex-col items-center group py-0.5">
                <span className="font-serif text-2xl xl:text-3xl font-black tracking-[0.26em] text-foreground group-hover:opacity-85 transition-opacity uppercase">
                  {zelevationConfig.branding.logoText}
                </span>
                <span className="text-[8px] font-sans font-bold tracking-[0.45em] text-secondary uppercase -mt-0.5">
                  HAUTE ATELIER
                </span>
              </Link>
            </div>

            {/* Right Column (5 cols): Utility Cluster */}
            <div className="col-span-5 flex items-center justify-end space-x-3 xl:space-x-4">
              {/* Currency Badge */}
              <div className="hidden xl:flex items-center text-[10px] font-bold tracking-widest text-muted-foreground uppercase border border-border px-2 py-1 rounded">
                <span>INR ₹</span>
              </div>

              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-foreground/70 hover:text-foreground hover:bg-muted/60 rounded-full transition-colors"
                aria-label="Search catalog"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/account?tab=wishlist"
                className="relative p-2 text-foreground/70 hover:text-foreground hover:bg-muted/60 rounded-full transition-colors inline-flex"
                aria-label="Wishlist"
              >
                <Heart className="w-4.5 h-4.5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-secondary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* My Account Link */}
              <Link
                href="/account"
                className="p-1.5 text-foreground/70 hover:text-foreground hover:bg-muted/60 rounded-full transition-colors inline-flex items-center"
                aria-label="My Account"
              >
                {isClient && user ? (
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center border border-border shadow-xs">
                    {user.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()
                      : "CL"}
                  </span>
                ) : (
                  <User className="w-4.5 h-4.5" />
                )}
              </Link>

              {/* Cart Trigger with live count */}
              <button
                onClick={openCart}
                className="relative p-2 text-foreground/80 hover:text-foreground hover:bg-muted/60 rounded-full transition-colors"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                {totalCartItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-4 h-4 px-1 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center animate-scale-in">
                    {totalCartItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile & Tablet Header (Balanced 3-Section Flex) */}
          <div className="flex lg:hidden items-center justify-between">
            {/* Left: Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center space-x-1.5 p-2 -ml-2 text-foreground/80 hover:text-foreground focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
              <span className="text-[10px] font-bold tracking-widest uppercase">MENU</span>
            </button>

            {/* Center: Brand Logo */}
            <div className="text-center">
              <Link href="/" className="inline-flex flex-col items-center">
                <span className="font-serif text-lg sm:text-xl font-black tracking-[0.2em] text-foreground uppercase">
                  {zelevationConfig.branding.logoText}
                </span>
                <span className="text-[7px] font-sans font-bold tracking-[0.35em] text-secondary uppercase -mt-0.5">
                  ATELIER
                </span>
              </Link>
            </div>

            {/* Right: Search, Wishlist & Cart */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-1.5 text-foreground/70 hover:text-foreground"
                aria-label="Search catalog"
              >
                <Search className="w-4 h-4" />
              </button>

              <Link
                href="/account?tab=wishlist"
                className="relative p-1.5 text-foreground/70 hover:text-foreground"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-secondary text-primary-foreground text-[8px] font-bold flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button
                onClick={openCart}
                className="relative p-1.5 text-foreground/80 hover:text-foreground"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalCartItems > 0 && (
                  <span className="absolute top-0 right-0 min-w-3.5 h-3.5 px-0.5 rounded-full bg-primary text-white text-[8px] font-bold flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </button>
            </div>
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
