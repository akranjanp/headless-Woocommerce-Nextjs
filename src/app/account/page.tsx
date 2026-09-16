"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
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
  ExternalLink,
  Search,
  ArrowRight,
  ShieldCheck,
  Clock,
  Plus,
  Sparkles,
  Lock
} from "lucide-react";
import { zelevationConfig } from "@/../zelevation.config";

export default function AccountPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "addresses" | "wishlist">("overview");

  // Auth Store
  const user = useAuthStore((state) => state.user);
  const orders = useAuthStore((state) => state.orders);
  const logout = useAuthStore((state) => state.logout);
  const login = useAuthStore((state) => state.login);
  const addAddress = useAuthStore((state) => state.addAddress);

  // Guest Order Tracking State
  const [trackQuery, setTrackQuery] = useState("");
  const [trackResult, setTrackResult] = useState<any>(null);
  const [trackSearched, setTrackSearched] = useState(false);

  // New Address Form State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: "Home",
    fullName: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  // Wishlist & Cart
  const wishlistItems = useWishlistStore((state) => state.items);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "orders" || tabParam === "wishlist" || tabParam === "addresses") {
        setActiveTab(tabParam);
      }
    }
  }, []);

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

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackSearched(true);
    const cleaned = trackQuery.trim().replace(/^#/, "").toLowerCase();
    const found = orders.find(
      (o) =>
        o.orderNumber.replace(/^#/, "").toLowerCase() === cleaned ||
        o.id.toLowerCase() === cleaned
    );
    setTrackResult(found || null);
  };

  const handleDemoLogin = () => {
    login({
      id: "demo-client",
      name: "Aryan Sharma",
      email: "client@zelevation.com",
      phone: "+91 98765 43210",
      addresses: [
        {
          id: "addr-1",
          title: "Default Residence",
          isDefault: true,
          fullName: "Aryan Sharma",
          addressLine1: "Flat 402, Signature Heights, 100 Feet Road",
          city: "Bengaluru",
          state: "Karnataka",
          postalCode: "560038",
          phone: "+91 98765 43210",
        },
      ],
    });
  };

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.addressLine1 || !newAddress.city) return;
    addAddress({
      id: `addr-${Date.now()}`,
      title: newAddress.title,
      isDefault: (user?.addresses?.length || 0) === 0,
      fullName: newAddress.fullName || user?.name || "Valued Client",
      addressLine1: newAddress.addressLine1,
      city: newAddress.city,
      state: newAddress.state,
      postalCode: newAddress.postalCode,
      phone: newAddress.phone || user?.phone || "",
    });
    setShowAddressForm(false);
    setNewAddress({
      title: "Home",
      fullName: "",
      addressLine1: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
    });
  };

  // SSR Loading State
  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="animate-pulse space-y-4 max-w-md mx-auto">
          <div className="h-8 bg-muted rounded-md w-3/4 mx-auto" />
          <div className="h-4 bg-muted rounded-md w-1/2 mx-auto" />
        </div>
      </div>
    );
  }

  // ==========================================
  // GUEST STATE: User is NOT Logged In
  // ==========================================
  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Guest Portal Header */}
        <div className="text-center space-y-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-secondary">
            CLIENT CONCIERGE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Atelier Client Portal
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            Sign in to access your bespoke orders and saved addresses, or track a guest shipment below.
          </p>
        </div>

        {/* Two-Column Guest Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Account Access */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-xl font-bold text-foreground">
                Client Sign In
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Log in to view past order history, download tax invoices, and manage saved delivery destinations.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <Link
                href="/login"
                className="w-full py-3 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/register"
                className="w-full py-3 bg-muted text-foreground text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-muted/80 transition-colors flex items-center justify-center gap-2 border border-border"
              >
                <span>Create an Account</span>
              </Link>

              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2 text-[11px] text-muted-foreground hover:text-secondary flex items-center justify-center gap-1 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-secondary" />
                <span>Quick Demo Client Login</span>
              </button>
            </div>
          </div>

          {/* Card 2: Quick Guest Order Tracking */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-xl font-bold text-foreground">
                Track Guest Order
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Placed an order as a guest? Enter your Order Number (e.g. #1234 or ZEL-123456) to check courier status.
              </p>
            </div>

            <form onSubmit={handleTrackOrder} className="space-y-3 pt-2">
              <div className="relative">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Enter Order ID (e.g. 1042)"
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 bg-muted/20 border border-border rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-foreground text-background text-xs font-bold uppercase tracking-wider rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>Track Shipment</span>
              </button>
            </form>
          </div>
        </div>

        {/* Track Result Display (If Searched) */}
        {trackSearched && (
          <div className="border border-border rounded-2xl p-6 sm:p-8 bg-card shadow-sm animate-fade-in space-y-4">
            {trackResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div>
                    <span className="text-xs font-bold text-foreground">
                      {trackResult.orderNumber}
                    </span>
                    <span className="text-xs text-muted-foreground ml-3">
                      Placed on {trackResult.date}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600">
                    ✓ {trackResult.status}
                  </span>
                </div>

                <div className="divide-y divide-border/60">
                  {trackResult.items.map((item: any) => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-14 rounded overflow-hidden bg-muted shrink-0">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-foreground">{item.name}</p>
                          <p className="text-[10px] text-muted-foreground">
                            Qty: {item.quantity} • {item.selectedSize}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <p>
                    Delivery Destination:{" "}
                    <strong className="text-foreground">
                      {trackResult.shippingAddress.addressLine},{" "}
                      {trackResult.shippingAddress.city}
                    </strong>
                  </p>
                  <span className="font-serif text-sm font-bold text-primary">
                    Total: {formatPrice(trackResult.total)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-2">
                <p className="text-xs font-bold text-foreground">
                  No active shipment found matching &ldquo;{trackQuery}&rdquo;
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Please verify the order ID from your confirmation receipt, or contact VIP concierge support.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Guest Wishlist Preview if Items Saved */}
        {wishlistItems.length > 0 && (
          <div className="border-t border-border pt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-foreground">
                Your Saved Wishlist ({wishlistItems.length})
              </h3>
              <Link href="/shop" className="text-xs text-secondary hover:underline font-semibold">
                Explore More Pieces →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {wishlistItems.map((prod) => (
                <div key={prod.id} className="border border-border rounded-xl p-3 bg-card space-y-2">
                  <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-muted">
                    <Image
                      src={prod.images[0]?.sourceUrl || ""}
                      alt={prod.name}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-foreground line-clamp-1">{prod.name}</h4>
                  <p className="text-xs font-bold text-primary">{formatPrice(prod.price)}</p>
                  <button
                    onClick={() => handleMoveToBag(prod)}
                    className="w-full py-1.5 bg-primary text-white text-[10px] font-bold uppercase rounded hover:bg-primary-hover transition-colors"
                  >
                    Move to Bag
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED STATE: Real Customer Profile
  // ==========================================
  const userInitials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "CL";

  // Real user addresses (from profile or fallback to order address)
  const savedAddresses = user.addresses || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Welcome Banner */}
      <div className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-10 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-secondary font-serif text-2xl font-bold">
            {userInitials}
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-secondary">
              ATELIER PRIVILEGE MEMBER
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {user.name}
            </h1>
            <p className="text-xs text-white/70">
              {user.email} • Atelier Client
            </p>
          </div>
        </div>

        <button
          onClick={() => logout()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
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
              {orders.length}
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
                  Welcome to your {zelevationConfig.store.name} atelier concierge dashboard.
                </p>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-muted/40 border border-border/80">
                  <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                    TOTAL ORDERS
                  </p>
                  <p className="font-serif text-2xl font-bold text-foreground mt-1">
                    {orders.length}
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
                  {orders.length > 0 && (
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-xs text-secondary font-semibold hover:underline"
                    >
                      View all orders ({orders.length}) →
                    </button>
                  )}
                </div>

                {orders.length > 0 ? (
                  <div className="p-4 rounded-xl border border-border bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-14 h-18 rounded-md overflow-hidden bg-muted shrink-0">
                        {orders[0].items[0]?.image ? (
                          <Image
                            src={orders[0].items[0].image}
                            alt={orders[0].items[0].name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        ) : (
                          <Package className="w-6 h-6 m-auto text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">
                          {orders[0].status}
                        </span>
                        <p className="text-xs font-bold text-foreground mt-1">
                          {orders[0].orderNumber}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {orders[0].items.length} item{orders[0].items.length > 1 ? "s" : ""} • {formatPrice(orders[0].total)}
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
                ) : (
                  <div className="p-6 rounded-xl border border-border/80 bg-muted/20 text-center space-y-3">
                    <Package className="w-8 h-8 text-muted-foreground/50 mx-auto" />
                    <p className="text-xs font-semibold text-foreground">No orders placed yet</p>
                    <p className="text-[11px] text-muted-foreground">
                      Explore our couture fashion collection and place your first order.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-block px-4 py-2 bg-primary text-white text-xs font-bold uppercase rounded-lg hover:bg-primary-hover transition-colors"
                    >
                      Discover Collection
                    </Link>
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
                  View real-time courier statuses and past acquisitions.
                </p>
              </div>

              {orders.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
                    <Package className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-foreground">No Orders in Your History</h3>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                      Any orders you place at checkout will appear here with live courier tracking.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    className="inline-block px-5 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary-hover transition-colors shadow-md"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
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
                                {item.image ? (
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                  />
                                ) : (
                                  <Package className="w-5 h-5 m-auto text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-foreground">{item.name}</p>
                                <p className="text-[10px] text-muted-foreground">
                                  Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ""} {item.selectedColor ? `• ${item.selectedColor}` : ""}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-foreground">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Shipping Address */}
                      <div className="pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-foreground gap-2">
                        <p>
                          Delivered to:{" "}
                          <strong className="text-foreground">
                            {order.shippingAddress.addressLine}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
                          </strong>
                        </p>
                        <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                          <Truck className="w-3.5 h-3.5" />
                          <span>Insured Express Delivery</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="px-3.5 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Address</span>
                </button>
              </div>

              {/* Add Address Form Modal / Inline */}
              {showAddressForm && (
                <form
                  onSubmit={handleAddAddressSubmit}
                  className="p-5 border border-border rounded-xl bg-muted/20 space-y-4 animate-fade-in"
                >
                  <h3 className="font-serif text-sm font-bold text-foreground">
                    New Delivery Destination
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-foreground/80 mb-1">
                        Address Label
                      </label>
                      <input
                        type="text"
                        value={newAddress.title}
                        onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                        placeholder="Home / Studio"
                        className="w-full p-2.5 bg-card border border-border rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-foreground/80 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={newAddress.fullName}
                        onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                        placeholder={user.name}
                        className="w-full p-2.5 bg-card border border-border rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-foreground/80 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddress.addressLine1}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                      placeholder="Street, apartment, landmark"
                      className="w-full p-2.5 bg-card border border-border rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-foreground/80 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        placeholder="Bengaluru"
                        className="w-full p-2.5 bg-card border border-border rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-foreground/80 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        placeholder="Karnataka"
                        className="w-full p-2.5 bg-card border border-border rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-foreground/80 mb-1">
                        PIN / Postal Code
                      </label>
                      <input
                        type="text"
                        value={newAddress.postalCode}
                        onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                        placeholder="560038"
                        className="w-full p-2.5 bg-card border border-border rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddressForm(false)}
                      className="px-4 py-2 text-xs font-semibold rounded-lg hover:bg-muted text-muted-foreground"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white text-xs font-bold uppercase rounded-lg hover:bg-primary-hover"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              {/* Saved Addresses List */}
              {savedAddresses.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <MapPin className="w-8 h-8 text-muted-foreground/40 mx-auto" />
                  <p className="text-xs font-semibold text-foreground">No saved addresses</p>
                  <p className="text-[11px] text-muted-foreground">
                    Add a primary delivery destination or complete a checkout to automatically save your destination.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="border border-border rounded-xl p-5 bg-card space-y-2 shadow-2xs relative"
                    >
                      {addr.isDefault && (
                        <span className="absolute top-4 right-4 text-[9px] font-bold uppercase bg-primary text-white px-2 py-0.5 rounded">
                          DEFAULT
                        </span>
                      )}
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {addr.title || "Shipping Destination"}
                      </p>
                      <p className="font-bold text-xs text-foreground">{addr.fullName}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {addr.addressLine1}
                        {addr.addressLine2 ? `, ${addr.addressLine2}` : ""}
                        <br />
                        {addr.city}, {addr.state} - {addr.postalCode}
                      </p>
                      {addr.phone && (
                        <p className="text-xs text-muted-foreground pt-1">Phone: {addr.phone}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

