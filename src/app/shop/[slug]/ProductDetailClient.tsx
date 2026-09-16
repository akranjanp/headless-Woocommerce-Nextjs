"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { 
  ShoppingBag, 
  Heart, 
  Ruler, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronDown, 
  Zap,
  Star
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import SizeGuideModal from "@/components/product/SizeGuideModal";
import StickyMobileCTA from "@/components/product/StickyMobileCTA";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));

  const [selectedColor, setSelectedColor] = useState(
    product.colorOptions?.[0]?.name || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizeOptions?.[0] || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("fabric");

  const discountPercent = calculateDiscount(product.regularPrice, product.price);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSize || "STD"}-${selectedColor || "DEF"}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0]?.sourceUrl || "",
      quantity,
      selectedColor,
      selectedSize,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <div className="space-y-6">
      {/* Category / Subtitle & Title */}
      <div>
        <span className="text-xs font-bold tracking-widest text-secondary uppercase">
          {product.subtitle || product.category.name}
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mt-1">
          {product.name}
        </h1>

        {/* Rating Stars */}
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating || 5)
                    ? "fill-amber-500"
                    : "fill-none text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-foreground">
            {product.rating || 4.9}
          </span>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount || 24} reviews)
          </span>
        </div>
      </div>

      {/* Pricing & Discount Badge */}
      <div className="flex items-baseline space-x-3 pb-2 border-b border-border">
        <span className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          {formatPrice(product.price)}
        </span>
        {product.regularPrice && product.regularPrice > product.price && (
          <span className="text-base text-muted-foreground line-through">
            {formatPrice(product.regularPrice)}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="px-2 py-0.5 rounded bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider">
            Save {discountPercent}%
          </span>
        )}
        <span className="text-[11px] text-muted-foreground ml-auto">
          Inclusive of all taxes
        </span>
      </div>

      {/* Low Stock Urgency Alert */}
      {product.stockQuantity && product.stockQuantity <= 10 && (
        <div className="flex items-center space-x-2 text-xs text-amber-700 bg-amber-500/10 border border-amber-500/20 px-3.5 py-2.5 rounded-lg">
          <Zap className="w-4 h-4 text-amber-600 fill-amber-600" />
          <span>
            <strong>Rare Atelier Piece:</strong> Only <strong>{product.stockQuantity}</strong> remaining in current production run.
          </span>
        </div>
      )}

      {/* Color Swatches */}
      {product.colorOptions && product.colorOptions.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex justify-between text-xs">
            <span className="font-bold text-foreground uppercase tracking-wider">
              Color:
            </span>
            <span className="font-medium text-foreground/80">{selectedColor}</span>
          </div>
          <div className="flex items-center space-x-3">
            {product.colorOptions.map((color, idx) => {
              const isSelected = selectedColor === color.name;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(color.name)}
                  title={color.name}
                  className={`relative p-0.5 rounded-full transition-all duration-200 ${
                    isSelected
                      ? "ring-2 ring-primary ring-offset-2 scale-110"
                      : "hover:scale-105 opacity-80 hover:opacity-100"
                  }`}
                  aria-label={`Select color ${color.name}`}
                >
                  <span
                    className="block w-6 h-6 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selector & Size Guide */}
      {product.sizeOptions && product.sizeOptions.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-foreground uppercase tracking-wider">
              Select Size:
            </span>
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="inline-flex items-center space-x-1 text-xs font-semibold text-secondary hover:text-primary transition-colors"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Bespoke Size Guide</span>
            </button>
          </div>

          <div className="grid grid-cols-5 gap-2.5">
            {product.sizeOptions.map((size, idx) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 text-xs font-bold rounded-lg border transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-card text-foreground hover:border-foreground/50"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity & CTA Buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex gap-3">
          {/* Add to Bag Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-4 px-6 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-primary-hover active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-xl"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-4 rounded-xl border transition-all ${
              isInWishlist
                ? "border-red-500 bg-red-50 text-red-500"
                : "border-border bg-card hover:bg-muted text-foreground"
            }`}
            aria-label="Toggle Wishlist"
          >
            <Heart
              className={`w-5 h-5 ${isInWishlist ? "fill-red-500" : ""}`}
            />
          </button>
        </div>

        {/* Direct Buy Now Button */}
        <button
          onClick={handleBuyNow}
          className="w-full py-3.5 px-6 bg-secondary text-primary font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-secondary-hover transition-colors shadow-md"
        >
          Express Checkout Now
        </button>
      </div>

      {/* Trust Mini-Grid */}
      <div className="grid grid-cols-3 gap-2 py-4 border-y border-border/80 text-[11px] text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Truck className="w-4 h-4 text-secondary shrink-0" />
          <span>Express 48h Dispatch</span>
        </div>
        <div className="flex items-center space-x-2">
          <RotateCcw className="w-4 h-4 text-secondary shrink-0" />
          <span>7-Day Easy Returns</span>
        </div>
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
          <span>100% Authentic Fabric</span>
        </div>
      </div>

      {/* Collapsible Accordions: Description, Fabric & Care, Delivery */}
      <div className="divide-y divide-border/60 text-xs">
        {/* Description Accordion */}
        <div className="py-3">
          <button
            onClick={() => toggleAccordion("desc")}
            className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-foreground text-left"
          >
            <span>Architectural Silhouette & Details</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                activeAccordion === "desc" ? "rotate-180" : ""
              }`}
            />
          </button>
          {activeAccordion === "desc" && (
            <div className="mt-3 text-muted-foreground leading-relaxed animate-fadeIn">
              <p>{product.description}</p>
              {product.sku && (
                <p className="mt-2 text-[10px] text-muted-foreground">
                  SKU Reference: <strong>{product.sku}</strong>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Fabric & Care Accordion */}
        <div className="py-3">
          <button
            onClick={() => toggleAccordion("fabric")}
            className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-foreground text-left"
          >
            <span>Fabric Composition & Garment Care</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                activeAccordion === "fabric" ? "rotate-180" : ""
              }`}
            />
          </button>
          {activeAccordion === "fabric" && (
            <div className="mt-3 text-muted-foreground leading-relaxed animate-fadeIn">
              <p>{product.fabricCare || "100% Premium Sustainable Blend. Specialist dry clean recommended to preserve fiber integrity."}</p>
            </div>
          )}
        </div>

        {/* Shipping & Returns Accordion */}
        <div className="py-3">
          <button
            onClick={() => toggleAccordion("shipping")}
            className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-foreground text-left"
          >
            <span>Delivery & Concierge Returns</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                activeAccordion === "shipping" ? "rotate-180" : ""
              }`}
            />
          </button>
          {activeAccordion === "shipping" && (
            <div className="mt-3 text-muted-foreground leading-relaxed animate-fadeIn">
              <p>{product.shippingInfo || "Complimentary insured delivery. Doorstep return pickup arranged in 24 hours upon request."}</p>
            </div>
          )}
        </div>
      </div>

      {/* Bespoke Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category.name}
      />

      {/* Mobile-Only Sticky Floating Add-to-Bag Bar */}
      <StickyMobileCTA
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />
    </div>
  );
}
