"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MOCK_ORDERS } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  LogOut, 
  CheckCircle2, 
  Truck, 
  Trash2, 
  ShoppingBag,
  ExternalLink
} from "lucide-react";
import { zelevationConfig } from "@/../zelevation.config";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "addresses" | "wishlist">("overview");
  const wishlistItems = useWishlistStore((state) => state.items);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const addItem = useCartStore((state) => state.addItem);

  const handleMoveToBag = (product: any) => {
    addItem({
      id: `${product.id}-M-DEF`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0]?.sourceUrl || "",
      quantity: 1,
      selectedSize: "M",
      selectedColor: product.colorOptions?.[0]?.name || "Standard",
    });
    toggleWishlist(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Welcome Banner */}
      <div className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-10 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-secondary font-serif text-2xl font-bold">
            AS
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-secondary">
              ATELIER PRIVILEGE MEMBER
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Aryan Sharma
            </h1>
            <p className="text-xs text-white/70">
              client@zelevation.com • Member since 2026
            </p>
          </div>
        </div>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </Link>
      </div>

      {/* Main Account Tabs & Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === "overview"
                ? "bg-primary text-white shadow-xs"
                : "text-foreground/70 hover:bg-muted"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === "orders"
                ? "bg-primary text-white shadow-xs"
                : "text-foreground/70 hover:bg-muted"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Package className="w-4 h-4" />
              <span>My Orders</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">
              {MOCK_ORDERS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("wishlist")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === "wishlist"
                ? "bg-primary text-white shadow-xs"
                : "text-foreground/70 hover:bg-muted"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Heart className="w-4 h-4" />
              <span>Saved Wishlist</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">
              {wishlistItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === "addresses"
                ? "bg-primary text-white shadow-xs"
                : "text-foreground/70 hover:bg-muted"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Delivery Addresses</span>
          </button>
        </div>

        {/* Right Tab Content */}
        <div className="lg:col-span-9 bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-xs min-h-[400px]">
          {/* 1. OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Account Overview
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Welcome back to the {zelevationConfig.store.name} client concierge.
                </p>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
                  <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                    TOTAL ORDERS
                  </p>
                  <p className="font-serif text-2xl font-bold text-foreground mt-1">
                    {MOCK_ORDERS.length}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
                  <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                    WISHLIST SAVED
                  </p>
                  <p className="font-serif text-2xl font-bold text-foreground mt-1">
                    {wishlistItems.length}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
                  <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                    MEMBERSHIP STATUS
                  </p>
                  <p className="font-serif text-xl font-bold text-secondary mt-1">
                    VIP Atelier
                  </p>
                </div>
              </div>

              {/* Recent Order Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-bold text-foreground">
                    Most Recent Delivery
                  </h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs text-secondary font-semibold hover:underline"
                  >
                    View all orders →
                  </button>
                </div>

                {MOCK_ORDERS[0] && (
                  <div className="p-4 rounded-xl border border-border bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-14 h-18 rounded-md overflow-hidden bg-muted shrink-0">
                        <Image
                          src={MOCK_ORDERS[0].items[0].image}
                          alt={MOCK_ORDERS[0].items[0].name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">
                          {MOCK_ORDERS[0].status}
                        </span>
                        <p className="text-xs font-bold text-foreground mt-1">
                          {MOCK_ORDERS[0].orderNumber}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {MOCK_ORDERS[0].items.length} items • {formatPrice(MOCK_ORDERS[0].total)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab("orders")}
                      className="px-4 py-2 bg-muted text-xs font-semibold rounded-lg hover:bg-muted/80 text-foreground"
                    >
                      Track Order Details
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="border-b border-border pb-4">
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Order History & Tracking
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  View tracking details and invoices for your past purchases.
                </p>
              </div>

              <div className="space-y-6">
                {MOCK_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="border border-border rounded-xl p-5 sm:p-6 space-y-4 bg-card shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border gap-2">
                      <div>
                        <span className="text-xs font-bold text-foreground">
                          {order.orderNumber}
                        </span>
                        <span className="text-xs text-muted-foreground ml-3">
                          Placed on {order.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600">
                          ✓ {order.status}
                        </span>
                        <span className="font-serif text-sm font-bold text-primary">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="divide-y divide-border/60">
                      {order.items.map((item) => (
                        <div key={item.id} className="py-3 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="relative w-12 h-16 rounded overflow-hidden bg-muted shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-foreground">{item.name}</p>
                              <p className="text-[10px] text-muted-foreground">
                                Qty: {item.quantity} • Size: {item.selectedSize} • {item.selectedColor}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-foreground">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address & Actions */}
                    <div className="pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-foreground gap-2">
                      <p>
                        Delivered to: <strong className="text-foreground">{order.shippingAddress.addressLine}, {order.shippingAddress.city}</strong>
                      </p>
                      <button className="text-secondary font-semibold hover:underline flex items-center gap-1">
                        <span>Download Invoice PDF</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. WISHLIST TAB */}
          {activeTab === "wishlist" && (
            <div className="space-y-6">
              <div className="border-b border-border pb-4">
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Saved Wishlist ({wishlistItems.length})
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Your bookmarked atelier designs for future acquisition.
                </p>
              </div>

              {wishlistItems.length === 0 ? (
                <div className="py-12 text-center">
                  <Heart className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-foreground">No pieces saved yet</p>
                  <p className="text-xs text-muted-foreground mt-1 mb-4">
                    Explore the collection and click the heart icon on any design.
                  </p>
                  <Link
                    href="/shop"
                    className="inline-block px-5 py-2.5 bg-primary text-white text-xs font-bold uppercase rounded-lg"
                  >
                    Explore Designs
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((prod) => (
                    <div
                      key={prod.id}
                      className="border border-border rounded-xl p-3 bg-card space-y-3 shadow-2xs"
                    >
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={prod.images[0]?.sourceUrl || ""}
                          alt={prod.name}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground line-clamp-1">{prod.name}</h4>
                        <p className="text-xs font-bold text-primary mt-1">{formatPrice(prod.price)}</p>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => handleMoveToBag(prod)}
                          className="flex-1 py-2 bg-primary text-white text-[11px] font-bold uppercase tracking-wider rounded-md hover:bg-primary-hover transition-colors flex items-center justify-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>
                        <button
                          onClick={() => toggleWishlist(prod)}
                          className="p-2 border border-border rounded-md hover:bg-muted text-muted-foreground hover:text-red-500 transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. ADDRESSES TAB */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div className="border-b border-border pb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl font-bold text-foreground">
                    Saved Addresses
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Manage your primary shipping and delivery destinations.
                  </p>
                </div>
                <button className="px-3.5 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors">
                  + Add Address
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Default Address */}
                <div className="border-2 border-primary rounded-xl p-5 bg-card relative space-y-2">
                  <span className="absolute top-4 right-4 text-[9px] font-bold uppercase bg-primary text-white px-2 py-0.5 rounded">
                    DEFAULT HOME
                  </span>
                  <p className="font-bold text-xs text-foreground">Aryan Sharma</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Flat 402, Signature Heights<br />
                    100 Feet Road, Indiranagar<br />
                    Bengaluru, Karnataka - 560038
                  </p>
                  <p className="text-xs text-muted-foreground pt-1">Phone: +91 98765 43210</p>
                  <div className="pt-3 flex gap-3 text-xs">
                    <button className="text-secondary font-semibold hover:underline">Edit</button>
                  </div>
                </div>

                {/* Secondary Work Address */}
                <div className="border border-border rounded-xl p-5 bg-muted/20 space-y-2">
                  <span className="text-[9px] font-bold uppercase bg-muted text-foreground px-2 py-0.5 rounded">
                    WORK
                  </span>
                  <p className="font-bold text-xs text-foreground">Aryan Sharma (Zelevation Office)</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    4th Avenue Studio, Tech Corridor<br />
                    Indiranagar, Bengaluru - 560038
                  </p>
                  <p className="text-xs text-muted-foreground pt-1">Phone: +91 98765 43210</p>
                  <div className="pt-3 flex gap-3 text-xs">
                    <button className="text-secondary font-semibold hover:underline">Edit</button>
                    <button className="text-muted-foreground hover:text-foreground">Set as Default</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
