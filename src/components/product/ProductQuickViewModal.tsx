"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { 
  X, 
  ShoppingBag, 
  Heart, 
  Check, 
  Truck, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from "lucide-react";

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuickViewModal({
  product,
  isOpen,
  onClose,
}: ProductQuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) =>
    product ? state.isInWishlist(product.id) : false
  );

  // Initialize selected size and color when product opens
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizeOptions?.[0] || "M");
      setSelectedColor(product.colorOptions?.[0]?.name || "Standard");
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const images = product.images.length > 0 ? product.images : [{ id: "def", sourceUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800", altText: product.name }];
  const currentImage = images[activeImageIndex]?.sourceUrl || images[0]?.sourceUrl;
  const discount = calculateDiscount(product.regularPrice, product.price);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: currentImage,
      quantity: quantity,
      selectedSize: selectedSize,
      selectedColor: selectedColor,
    });
    onClose();
    openCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-card rounded-2xl border border-border shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md text-foreground/80 hover:text-foreground z-20 hover:scale-105 transition-all shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="relative bg-neutral-100 p-6 flex flex-col justify-between items-center">
          {/* Main Large Image */}
          <div className="relative aspect-[3/4] w-full max-w-sm rounded-xl overflow-hidden bg-white shadow-xs">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              className="object-contain p-4 object-center"
              sizes="(max-width: 768px) 100vw, 450px"
              priority
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.saleBadge && (
                <span className="text-[10px] font-bold uppercase tracking-widest bg-primary text-white px-2.5 py-1 rounded shadow-xs">
                  {product.saleBadge}
                </span>
              )}
              {discount > 0 && !product.saleBadge && (
                <span className="text-[10px] font-bold uppercase tracking-widest bg-secondary text-primary px-2.5 py-1 rounded shadow-xs">
                  -{discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1 max-w-full">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-14 h-16 rounded-lg overflow-hidden bg-white border-2 transition-all shrink-0 ${
                    idx === activeImageIndex
                      ? "border-primary shadow-xs"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.sourceUrl}
                    alt={`Thumbnail ${idx}`}
                    fill
                    className="object-contain p-1"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Customization Details */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category / Brand Pill */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-secondary">
                {product.category?.name || "ZELEVATION RUNWAY"}
              </span>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>In Stock • Ready to Ship</span>
              </span>
            </div>

            {/* Title & Price */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                {product.name}
              </h2>
              <div className="flex items-baseline space-x-3 mt-2">
                <span className="font-serif text-2xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.regularPrice && product.regularPrice > product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.regularPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-xs text-muted-foreground leading-relaxed">
              {product.shortDescription ||
                "Handcrafted from sustainably sourced luxury fabrics. Architectural silhouette engineered for comfort and sartorial elegance."}
            </p>

            {/* Color Selection */}
            {product.colorOptions && product.colorOptions.length > 0 && (
              <div className="space-y-2 pt-1 border-t border-border">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-foreground">Color Palette:</span>
                  <span className="text-muted-foreground">{selectedColor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {product.colorOptions.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`relative w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColor === c.name
                          ? "border-primary scale-110 shadow-xs"
                          : "border-border hover:border-foreground/60"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={`Select color ${c.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizeOptions && product.sizeOptions.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-foreground">Select Size:</span>
                  <span className="text-secondary font-medium hover:underline cursor-pointer">
                    Bespoke Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizeOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground shadow-xs"
                          : "bg-muted/40 hover:bg-muted text-foreground border border-border"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="flex items-center space-x-4 pt-1">
              <span className="text-xs font-semibold text-foreground">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg bg-muted/20">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-sm font-semibold hover:bg-muted"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-bold text-center min-w-[2.5rem]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-sm font-semibold hover:bg-muted"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-primary-hover active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-xl border transition-colors ${
                  isInWishlist
                    ? "border-red-500 bg-red-50 text-red-500"
                    : "border-border hover:bg-muted text-foreground"
                }`}
                aria-label="Save to Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isInWishlist ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </button>
            </div>

            <Link
              href={`/shop/${product.slug}`}
              onClick={onClose}
              className="w-full py-2.5 text-xs font-semibold text-center text-muted-foreground hover:text-primary flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Full Editorial Look Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
