"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import FreeShippingBar from "@/components/cart/FreeShippingBar";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  ShieldCheck, 
  Lock 
} from "lucide-react";
import { zelevationConfig } from "@/../zelevation.config";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderNote, setOrderNote] = useState("");

  const subtotal = getTotalPrice();
  const discount = couponApplied ? Math.round(subtotal * 0.15) : 0;
  const shipping = subtotal >= zelevationConfig.store.freeShippingThreshold ? 0 : 150;
  const finalTotal = Math.max(0, subtotal - discount + shipping);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "ZELEVATION15") {
      setCouponApplied(true);
    } else {
      alert("Invalid code. Use ZELEVATION15 for 15% off!");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground mb-6">
          <ShoppingBag className="w-10 h-10 opacity-40" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2 mb-8">
          Explore our modern fashion catalog and add your chosen pieces to the bag.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-primary-hover transition-colors shadow-lg"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-border pb-6 mb-8 gap-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
          Shopping Bag
        </h1>
        <span className="text-xs text-muted-foreground">
          {items.length} unique {items.length === 1 ? "design" : "designs"} in bag
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Items Table */}
        <div className="lg:col-span-8 space-y-6">
          {/* Free Shipping Progress Bar */}
          <FreeShippingBar currentTotal={subtotal} />

          {/* Table of Items */}
          <div className="divide-y divide-border border-y border-border">
            {items.map((item) => (
              <div
                key={item.id}
                className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-24 h-32 rounded-lg overflow-hidden bg-muted shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-center"
                      sizes="96px"
                    />
                  </div>

                  <div className="space-y-1">
                    <Link
                      href={`/shop/${item.slug}`}
                      className="font-serif text-base font-bold text-foreground hover:text-secondary transition-colors"
                    >
                      {item.name}
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {item.selectedSize && (
                        <span>Size: <strong>{item.selectedSize}</strong></span>
                      )}
                      {item.selectedColor && (
                        <span>• Color: <strong>{item.selectedColor}</strong></span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-primary sm:hidden">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>

                {/* Stepper, Subtotal & Remove */}
                <div className="flex items-center justify-between sm:space-x-8">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-border rounded-lg bg-card">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Total item price */}
                  <div className="text-right hidden sm:block">
                    <span className="font-serif text-base font-bold text-foreground">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      {formatPrice(item.price)} each
                    </p>
                  </div>

                  {/* Trash button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={clearCart}
              className="text-xs text-muted-foreground hover:text-red-500 transition-colors"
            >
              Clear entire bag
            </button>
            <Link
              href="/shop"
              className="text-xs font-bold uppercase tracking-wider text-secondary hover:text-primary transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Special Delivery Note */}
          <div className="pt-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
              Order Instructions & Concierge Packaging Note:
            </label>
            <textarea
              rows={2}
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="e.g. Gift box packaging, deliver after 6 PM, leave with reception..."
              className="w-full p-3 bg-muted/20 border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4">
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 space-y-6 shadow-xs sticky top-28">
            <h3 className="font-serif text-xl font-bold text-foreground">
              Order Summary
            </h3>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Coupon (ZELEVATION15)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-muted/20 border border-border rounded-lg uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  disabled={couponApplied}
                  className={`px-4 py-2 text-xs font-bold uppercase rounded-lg transition-colors ${
                    couponApplied
                      ? "bg-emerald-600 text-white"
                      : "bg-primary text-primary-foreground hover:bg-primary-hover"
                  }`}
                >
                  {couponApplied ? "Applied" : "Apply"}
                </button>
              </div>
              {couponApplied && (
                <p className="text-[11px] text-emerald-600 font-semibold">
                  ✓ 15% Atelier Privilege Discount applied!
                </p>
              )}
            </form>

            {/* Line Items Calculation */}
            <div className="space-y-3 text-xs border-y border-border/80 py-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {couponApplied && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount (15%)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Express Delivery</span>
                <span className="font-semibold text-foreground">
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Taxes</span>
                <span className="font-semibold text-foreground">
                  Included
                </span>
              </div>

              <div className="pt-3 border-t border-border flex justify-between text-base font-bold text-foreground">
                <span>Total Amount</span>
                <span className="font-serif text-xl text-primary font-black">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="w-full py-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 shadow-xl"
            >
              <Lock className="w-4 h-4 text-secondary" />
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Link>

            {/* Security Guarantee */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>256-Bit Encrypted Secure Headless Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
