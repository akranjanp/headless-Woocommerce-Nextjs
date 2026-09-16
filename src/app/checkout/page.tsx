"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { zelevationConfig } from "@/../zelevation.config";
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  ArrowLeft,
  QrCode,
  Banknote,
  Sparkles
} from "lucide-react";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  // Form State
  const [formData, setFormData] = useState({
    email: "client@zelevation.com",
    firstName: "Aryan",
    lastName: "Sharma",
    address: "Flat 402, Signature Heights, 100 Feet Road",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560038",
    phone: "+91 98765 43210",
  });

  const [shippingMethod, setShippingMethod] = useState("express");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState("");

  const subtotal = getTotalPrice();
  const shippingFee = subtotal >= zelevationConfig.store.freeShippingThreshold ? 0 : 150;
  const grandTotal = subtotal + shippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const randomId = `ZEL-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrderId(randomId);
      setOrderConfirmed(true);
      clearCart();
    }, 1200);
  };

  // If Order is Placed Successfully
  if (orderConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto animate-fade-in">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest uppercase text-secondary">
            ORDER CONFIRMED
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Thank You, {formData.firstName}
          </h1>
          <p className="text-sm text-muted-foreground">
            Your order reference is <strong className="text-primary">{confirmedOrderId}</strong>. A confirmation concierge receipt has been sent to <strong>{formData.email}</strong>.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border text-left space-y-4 shadow-xs">
          <h3 className="font-serif text-base font-bold text-foreground border-b border-border pb-2">
            Delivery Destination
          </h3>
          <div className="text-xs text-muted-foreground leading-relaxed">
            <p className="font-bold text-foreground">{formData.firstName} {formData.lastName}</p>
            <p>{formData.address}</p>
            <p>{formData.city}, {formData.state} - {formData.postalCode}</p>
            <p>Phone: {formData.phone}</p>
          </div>
          <div className="pt-2 flex items-center gap-2 text-xs text-emerald-600 font-semibold">
            <Truck className="w-4 h-4" />
            <span>Estimated Delivery: 2-3 Business Days via Insured Courier</span>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Link
            href="/account?tab=orders"
            className="px-6 py-3 bg-muted text-foreground text-xs font-bold uppercase rounded-lg hover:bg-muted/80 transition-colors"
          >
            Track in My Account
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-primary-foreground text-xs font-bold uppercase rounded-lg hover:bg-primary-hover transition-colors shadow-lg"
          >
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  // If bag is empty and not confirmed
  if (items.length === 0 && !orderConfirmed) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold text-foreground">No Items to Checkout</h1>
        <p className="text-xs text-muted-foreground">Please select fashion pieces from our collection first.</p>
        <Link href="/shop" className="inline-block px-6 py-2.5 bg-primary text-white text-xs font-bold uppercase rounded-lg">
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-8">
        <Link href="/cart" className="inline-flex items-center gap-1 hover:text-foreground">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Bag</span>
        </Link>
        <span>•</span>
        <span className="flex items-center gap-1 text-emerald-600 font-medium">
          <Lock className="w-3.5 h-3.5" />
          Encrypted SSL Checkout
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Checkout Multi-Step Form */}
        <div className="lg:col-span-7 space-y-10">
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            {/* Step 1: Customer Contact */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <h2 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">1</span>
                  <span>Contact Information</span>
                </h2>
                <Link href="/login" className="text-xs text-secondary hover:underline font-semibold">
                  Already have an account? Sign in
                </Link>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/80 mb-1">Email for Order Updates</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-card border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="space-y-4">
              <div className="pb-2 border-b border-border">
                <h2 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">2</span>
                  <span>Shipping Address</span>
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground/80 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-3 bg-card border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/80 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-3 bg-card border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/80 mb-1">Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 bg-card border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground/80 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-3 bg-card border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/80 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-3 bg-card border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground/80 mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full p-3 bg-card border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/80 mb-1">Phone Number (For Courier Tracking)</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 bg-card border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Step 3: Payment Method Selection */}
            <div className="space-y-4">
              <div className="pb-2 border-b border-border">
                <h2 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">3</span>
                  <span>Payment Preference</span>
                </h2>
              </div>

              <div className="space-y-3">
                {/* UPI / QR Code */}
                <label
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "upi"
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-card hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <QrCode className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs font-bold text-foreground">Instant UPI / QR</p>
                      <p className="text-[11px] text-muted-foreground">Google Pay, PhonePe, Paytm, BHIM</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">
                    RECOMMENDED
                  </span>
                </label>

                {/* Credit / Debit Card */}
                <label
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-card hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs font-bold text-foreground">Credit / Debit Card</p>
                      <p className="text-[11px] text-muted-foreground">Visa, Mastercard, RuPay, Amex</p>
                    </div>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-card hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Banknote className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs font-bold text-foreground">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-muted-foreground">Pay upon doorstep receipt</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-primary-hover active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              {isProcessing ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  <span>Place Order • {formatPrice(grandTotal)}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Order Review Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 space-y-6 sticky top-28 shadow-xs">
            <h3 className="font-serif text-lg font-bold text-foreground border-b border-border pb-4">
              Bag Summary ({items.length})
            </h3>

            {/* Compact Items List */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-1 divide-y divide-border/60">
              {items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div className="relative w-14 h-18 rounded-md overflow-hidden bg-muted shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                    <span className="absolute top-0 right-0 w-4 h-4 rounded-bl bg-primary text-white text-[9px] font-bold flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 truncate">
                    <p className="text-xs font-bold text-foreground truncate">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      Size: {item.selectedSize} {item.selectedColor ? `• ${item.selectedColor}` : ""}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs border-t border-border pt-4 text-muted-foreground">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Express Courier</span>
                <span className="font-semibold text-foreground">
                  {shippingFee === 0 ? "COMPLIMENTARY (FREE)" : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Duties & Taxes</span>
                <span className="font-semibold text-foreground">Included</span>
              </div>
              <div className="pt-3 border-t border-border flex justify-between text-base font-bold text-foreground">
                <span>Total Due</span>
                <span className="font-serif text-xl font-black text-primary">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            {/* Concierge Badge */}
            <div className="p-3.5 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center gap-2.5 text-xs text-foreground/80">
              <Sparkles className="w-4 h-4 text-secondary shrink-0" />
              <span>Complimentary insured packaging & tracking by {zelevationConfig.store.name}.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
