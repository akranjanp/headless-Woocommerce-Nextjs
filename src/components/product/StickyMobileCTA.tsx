"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

interface StickyMobileCTAProps {
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
}

export default function StickyMobileCTA({
  product,
  selectedColor,
  selectedSize,
}: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA once scrolled down 450px
      setIsVisible(window.scrollY > 450);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const handleAdd = () => {
    addItem({
      id: `${product.id}-${selectedSize || "STD"}-${selectedColor || "DEF"}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0]?.sourceUrl || "",
      quantity: 1,
      selectedColor,
      selectedSize,
    });
  };

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-border p-3 sm:hidden z-40 shadow-2xl animate-slide-up flex items-center justify-between gap-3">
      <div className="flex items-center space-x-3 overflow-hidden">
        {product.images[0] && (
          <div className="relative w-11 h-11 rounded-md overflow-hidden bg-muted shrink-0">
            <Image
              src={product.images[0].sourceUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
        )}
        <div className="truncate">
          <p className="text-xs font-semibold text-foreground truncate max-w-[150px]">
            {product.name}
          </p>
          <div className="flex items-center space-x-1.5 text-xs">
            <span className="font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {selectedSize && (
              <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                Size {selectedSize}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-lg shadow-md hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        <span>Add to Bag</span>
      </button>
    </div>
  );
}
