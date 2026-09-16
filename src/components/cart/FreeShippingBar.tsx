"use client";

import React from "react";
import { zelevationConfig } from "@/../zelevation.config";
import { formatPrice } from "@/lib/utils";
import { Sparkles, Truck } from "lucide-react";

interface FreeShippingBarProps {
  currentTotal: number;
}

export default function FreeShippingBar({ currentTotal }: FreeShippingBarProps) {
  const threshold = zelevationConfig.store.freeShippingThreshold;
  const remaining = Math.max(0, threshold - currentTotal);
  const progressPercent = Math.min(100, Math.round((currentTotal / threshold) * 100));
  const isUnlocked = currentTotal >= threshold;

  return (
    <div className="bg-muted/40 p-3 rounded-xl border border-border/60">
      <div className="flex items-center justify-between text-xs mb-1.5">
        <div className="flex items-center space-x-1.5">
          {isUnlocked ? (
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Truck className="w-3.5 h-3.5 text-secondary" />
          )}
          <span className="font-semibold text-foreground">
            {isUnlocked ? (
              <span className="text-emerald-600">
                You&apos;ve unlocked Free Express Shipping!
              </span>
            ) : (
              <span>
                Add <strong className="text-primary">{formatPrice(remaining)}</strong> more for Free Shipping
              </span>
            )}
          </span>
        </div>
        <span className="text-[10px] font-bold text-muted-foreground">
          {progressPercent}%
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            isUnlocked ? "bg-emerald-500" : "bg-secondary"
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
