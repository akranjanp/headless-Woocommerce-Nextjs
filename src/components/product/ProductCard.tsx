"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { Heart, ShoppingBag, Eye, Sparkles, Star, Zap } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));

  const mainImage =
    product.images[0]?.sourceUrl ||
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600";
  const hoverImage = product.images[1]?.sourceUrl || mainImage;
  const discountPercent = calculateDiscount(product.regularPrice, product.price);

  const handleQuickAddSize = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: `${product.id}-${size}-${product.colorOptions?.[0]?.name || "DEF"}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: mainImage,
      quantity: 1,
      selectedSize: size,
      selectedColor: product.colorOptions?.[0]?.name || "Standard",
    });
    openCart();
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-card border border-stone-200/90 hover:border-amber-400/80 transition-all duration-300 rounded-2xl p-3 shadow-xs hover:shadow-xl hover:shadow-amber-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gradient-to-b from-stone-50 to-amber-50/20">
        <Link href={`/shop/${product.slug}`} className="block h-full w-full">
          <Image
            src={isHovered ? hoverImage : mainImage}
            alt={product.name}
            fill
            className="object-contain p-4 object-center transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Badges: Radiant Discount or Runway Tag */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discountPercent > 0 ? (
            <span className="text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 text-white px-2.5 py-1 rounded-full shadow-md shadow-rose-500/20">
              -{discountPercent}% OFF
            </span>
          ) : product.saleBadge ? (
            <span className="text-[9px] font-bold uppercase tracking-wider bg-gradient-to-r from-rose-600 to-amber-600 text-white px-2.5 py-1 rounded-full shadow-xs">
              {product.saleBadge}
            </span>
          ) : null}

          {product.isFeatured && (
            <span className="text-[9px] font-bold uppercase tracking-wider bg-black/75 text-amber-300 border border-amber-400/30 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              <span>RUNWAY EDIT</span>
            </span>
          )}
        </div>

        {/* Floating Actions: Wishlist & Quick View */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={handleWishlistClick}
            className="p-2 rounded-full bg-white/90 shadow-xs hover:bg-white text-foreground hover:scale-110 active:scale-95 transition-all duration-200"
            aria-label="Save to wishlist"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isInWishlist ? "fill-rose-500 text-rose-500" : "text-foreground/80 hover:text-rose-500"
              }`}
            />
          </button>

          {onQuickView && (
            <button
              onClick={handleQuickViewClick}
              className="p-2 rounded-full bg-white/90 shadow-xs hover:bg-white text-foreground hover:scale-110 active:scale-95 transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Quick View product"
              title="Quick View"
            >
              <Eye className="w-3.5 h-3.5 text-foreground/80 hover:text-amber-600" />
            </button>
          )}
        </div>

        {/* Hover Action Bar: Inline Size Selector & Quick Add */}
        <div className="absolute bottom-3 inset-x-3 hidden sm:flex flex-col gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          {product.sizeOptions && product.sizeOptions.length > 0 ? (
            <div className="bg-white/95 backdrop-blur-md p-2 rounded-xl border border-stone-200 shadow-xl flex flex-col gap-1.5 animate-fade-in">
              <p className="text-[9px] font-bold uppercase tracking-widest text-amber-700 text-center">
                Select Size to Add:
              </p>
              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                {product.sizeOptions.slice(0, 5).map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleQuickAddSize(e, size)}
                    className="px-2.5 py-1 bg-stone-100 hover:bg-gradient-to-r hover:from-amber-500 hover:to-rose-500 hover:text-white rounded-md text-[10px] font-bold uppercase transition-all shadow-xs"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={(e) => handleQuickAddSize(e, "STD")}
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:from-amber-600 hover:to-rose-600 shadow-md shadow-rose-500/20 flex items-center justify-center gap-1.5 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Quick Bag Add</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-1 px-1 flex flex-col flex-1 justify-between space-y-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-amber-700">
              {product.category?.name || "HAUTE EDIT"}
            </span>
            {product.inStock && (
              <span className="flex items-center gap-1 text-[9px] font-semibold text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                In Stock
              </span>
            )}
          </div>

          <Link href={`/shop/${product.slug}`} className="block group-hover:text-amber-700 transition-colors">
            <h3 className="font-serif text-xs sm:text-sm font-bold text-foreground line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1.5 text-[10px]">
          <div className="flex items-center text-amber-400">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          </div>
          <span className="font-bold text-foreground">4.9</span>
          <span className="text-muted-foreground text-[9px]">(120+)</span>
        </div>

        {/* Price & Color Swatches */}
        <div className="flex items-center justify-between pt-1 border-t border-stone-100">
          <div className="flex items-baseline space-x-2">
            <span className="font-serif text-sm sm:text-base font-black text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.regularPrice && product.regularPrice > product.price && (
              <span className="text-[11px] text-muted-foreground line-through">
                {formatPrice(product.regularPrice)}
              </span>
            )}
          </div>

          {/* Color Indicators */}
          {product.colorOptions && product.colorOptions.length > 0 && (
            <div className="flex items-center space-x-1">
              {product.colorOptions.slice(0, 3).map((c) => (
                <span
                  key={c.name}
                  className="w-2.5 h-2.5 rounded-full border border-border"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colorOptions.length > 3 && (
                <span className="text-[9px] text-muted-foreground">
                  +{product.colorOptions.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
