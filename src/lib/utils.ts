import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { zelevationConfig } from "@/../zelevation.config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  const symbol = zelevationConfig.store.currencySymbol || "₹";
  return `${symbol}${amount.toLocaleString("en-IN")}`;
}

export function calculateDiscount(regularPrice?: number, salePrice?: number): number {
  if (!regularPrice || !salePrice || regularPrice <= salePrice) return 0;
  return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
}
