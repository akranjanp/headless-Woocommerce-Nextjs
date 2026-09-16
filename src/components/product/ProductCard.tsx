"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));

  const mainImage = product.images[0]?.sourceUrl || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600";
  const hoverImage = product.images[1]?.sourceUrl || mainImage;
  const discountPercent = calculateDiscount(product.regularPrice, product.price);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: `${product.id}-${product.sizeOptions?.[0] || "STD"}-${product.colorOptions?.[0]?.name || "DEF"}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: mainImage,
      quantity: 1,
      selectedSize: product.sizeOptions?.[0] || "M",
      selectedColor: product.colorOptions?.[0]?.name,
    });
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="group relative flex flex-col transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted/40 shadow-xs">
        <Link href={`/shop/${product.slug}`} className="block h-full w-full">
          {/* Main & Hover Image Switch */}
          <Image
            src={isHovered ? hoverImage : mainImage}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Badges: Discount or Custom (e.g. LIMITED, BESTSELLER) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.saleBadge && (
            <span className="text-[9px] font-bold uppercase tracking-wider bg-primary text-primary-foreground px-2 py-1 rounded shadow-xs">
              {product.saleBadge}
            </span>
          )}
          {discountPercent > 0 && !product.saleBadge && (
            <span className="text-[9px] font-bold uppercase tracking-wider bg-secondary text-primary px-2 py-1 rounded shadow-xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-xs hover:bg-white text-foreground hover:scale-110 transition-all duration-200 z-10"
          aria-label="Save to wishlist"
        >
          <Heart
            className={`w-4 h-4 ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-foreground/70"
            }`}
          />
        </button>

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute bottom-3 inset-x-3 hidden sm:flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 px-3 bg-primary/95 backdrop-blur-sm text-primary-foreground rounded-md text-xs font-semibold tracking-wider uppercase hover:bg-primary transition-colors flex items-center justify-center gap-1.5 shadow-lg"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Bag</span>
          </button>
          <Link
            href={`/shop/${product.slug}`}
            className="p-2.5 bg-white/90 backdrop-blur-sm text-foreground rounded-md hover:bg-white transition-colors flex items-center justify-center shadow-lg"
            aria-label="View product details"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        {/* Category / Subtitle */}
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          {product.subtitle || product.category.name}
        </p>

        {/* Title */}
        <h3 className="text-sm font-semibold text-foreground tracking-tight mt-1 line-clamp-1 group-hover:text-secondary transition-colors">
          <Link href={`/shop/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Price & Discount */}
        <div className="mt-1.5 flex items-center space-x-2">
          <span className="text-sm font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.regularPrice && product.regularPrice > product.price && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.regularPrice)}
            </span>
          )}
        </div>

        {/* Color Swatch Dots */}
        {product.colorOptions && product.colorOptions.length > 0 && (
          <div className="mt-2.5 flex items-center space-x-1.5">
            {product.colorOptions.map((c, i) => (
              <span
                key={i}
                title={c.name}
                className="w-2.5 h-2.5 rounded-full border border-black/20"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            <span className="text-[10px] text-muted-foreground ml-1">
              +{product.colorOptions.length} colors
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
