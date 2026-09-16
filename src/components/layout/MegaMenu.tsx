"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavItem } from "@/../zelevation.config";
import { ArrowUpRight } from "lucide-react";

interface MegaMenuProps {
  item: NavItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ item, isOpen, onClose }: MegaMenuProps) {
  if (!isOpen || !item.isMegaMenu) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-border shadow-2xl z-40 transition-all duration-300 ease-out py-8 px-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        {/* Categories Columns */}
        <div className="col-span-8 grid grid-cols-3 gap-8">
          {item.megaCategories?.map((categoryGroup, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-xs font-semibold text-foreground/50 tracking-widest uppercase">
                {categoryGroup.categoryTitle}
              </h4>
              <ul className="space-y-2.5">
                {categoryGroup.items.map((sub, sIdx) => (
                  <li key={sIdx}>
                    <Link
                      href={sub.href}
                      onClick={onClose}
                      className="group inline-flex items-center text-sm font-medium text-foreground/80 hover:text-foreground hover:translate-x-1 transition-all duration-200"
                    >
                      <span>{sub.title}</span>
                      {sub.badge && (
                        <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-secondary/20 text-secondary uppercase tracking-wider">
                          {sub.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Featured Visual Banner Card */}
        {item.featuredBanner && (
          <div className="col-span-4 relative rounded-xl overflow-hidden bg-muted group shadow-md">
            <div className="relative h-64 w-full">
              <Image
                src={item.featuredBanner.imageUrl}
                alt={item.featuredBanner.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1200px) 30vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-1">
                FEATURED EDIT
              </p>
              <h3 className="text-lg font-serif font-bold text-white mb-1">
                {item.featuredBanner.title}
              </h3>
              <p className="text-xs text-white/80 line-clamp-2 mb-3">
                {item.featuredBanner.subtitle}
              </p>
              <Link
                href={item.featuredBanner.href}
                onClick={onClose}
                className="inline-flex items-center gap-1 text-xs font-bold tracking-wider uppercase text-white hover:text-secondary transition-colors"
              >
                <span>{item.featuredBanner.ctaText}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
