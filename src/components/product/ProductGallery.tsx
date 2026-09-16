"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: {
    id: string;
    sourceUrl: string;
    altText?: string;
  }[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[3/4] w-full bg-muted rounded-xl flex items-center justify-center text-muted-foreground text-sm">
        No image available
      </div>
    );
  }

  const activeImage = images[selectedIndex] || images[0];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnail Reel */}
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:w-20 shrink-0 pb-2 lg:pb-0 scrollbar-none">
          {images.map((img, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={img.id || idx}
                onClick={() => setSelectedIndex(idx)}
                className={`relative aspect-[3/4] w-16 lg:w-full rounded-md overflow-hidden bg-muted transition-all duration-200 border-2 ${
                  isSelected
                    ? "border-primary ring-1 ring-primary"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                aria-label={`Select photo ${idx + 1}`}
              >
                <Image
                  src={img.sourceUrl}
                  alt={img.altText || `${productName} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover object-center"
                  sizes="80px"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Main High-Resolution Image Preview */}
      <div className="relative aspect-[3/4] flex-1 rounded-xl overflow-hidden bg-muted group shadow-xs">
        <Image
          src={activeImage.sourceUrl}
          alt={activeImage.altText || productName}
          fill
          priority
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* Floating counter badge */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wider">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
