# Zelevation Headless WooCommerce Fashion Boilerplate 🚀

> **Engineered for High-Conversion Fashion eCommerce by Zelevation**  
> Modern, ultra-fast (95+ Core Web Vitals), mobile-first Headless WooCommerce template built with Next.js 15, TypeScript, Tailwind CSS, and WPGraphQL.

---

## ✨ Features Included

- **Mobile-First Luxury Navigation**:
  - Top Announcement Ticker with smooth transitions and controls.
  - Sticky editorial desktop header with dynamic MegaMenu categories and visual cards.
  - Off-canvas Mobile Drawer with nested accordion submenus, integrated search, quick actions, and currency/social links.
- **Home Page**:
  - Cinematic editorial hero with dual CTAs and trust badges.
  - Infinite Marquee ticker for seasonal drops.
  - Curated category banners with zoom-on-hover.
  - Tabbed Best Sellers & New Arrivals product grid.
  - "Shop The Look" / Lookbook hotspot feature.
- **Product Detail Page (PDP)**:
  - Multi-image fashion gallery with thumbnail reel and hover zoom.
  - Interactive Color Swatches and Size buttons with real-time stock indicators.
  - Pop-up Bespoke Size Guide modal (Inches vs Centimeters).
  - Floating sticky bottom "Add to Bag" bar for mobile shoppers on scroll.
  - Collapsible specification accordions (Fabric & Care, Delivery & Returns).
- **Cart Experience**:
  - Slide-over mini-cart drawer with immediate add-to-bag feedback.
  - Dynamic Free Shipping progress threshold bar.
  - Dedicated full `/cart` page with quantity steppers, special order packaging notes, and coupon discounts.
- **Checkout Page**:
  - Distraction-free 2-step checkout with contact, address, delivery, and payment options (UPI / QR, Card, NetBanking, COD).
  - Order Confirmation screen with order tracking ID and item breakdown.
- **Customer Portal & Auth**:
  - Tabbed My Account dashboard: Overview, Past Orders with status badges, Saved Addresses, and Wishlist.
  - Minimalist Login & Register pages with perks checkbox.

---

## ⚡ Quick Start

```bash
# Navigate to project directory
cd zelevation-commerce

# Run development server (runs on port 3001)
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3001](http://localhost:3001) to view the application.

---

## 🎨 15-Minute Client Customization Guide for Zelevation

All store customizations are consolidated into **`zelevation.config.ts`**:

```typescript
// zelevation.config.ts
export const zelevationConfig = {
  agency: {
    name: "Zelevation",
    credit: "Engineered by Zelevation Headless Studio",
    url: "https://zelevation.com",
  },
  store: {
    name: "CLIENT BRAND NAME",
    tagline: "Brand Tagline Here",
    currencySymbol: "₹",
    freeShippingThreshold: 1999,
  },
  branding: {
    logoText: "BRAND",
    logoAccent: "STUDIO",
    colors: {
      primary: "#111827",      // Primary Brand Color
      secondary: "#c5a880",    // Accent Gold / Highlights
      background: "#fafaf9",   // Body background
    },
  },
  // Navigation menus, announcements, and socials...
};
```

---

## 🔌 Connecting to Client WordPress / WooCommerce

1. In WordPress, install the following free plugins:
   - **WooCommerce**
   - **WPGraphQL** (`wp-graphql`)
   - **WooGraphQL** (`wp-graphql-woocommerce`)
2. In `zelevation-commerce/.env.local`:
   ```bash
   NEXT_PUBLIC_USE_MOCK_DATA=false
   NEXT_PUBLIC_WORDPRESS_URL=https://your-client-wordpress.com/graphql
   ```
3. Restart your dev server (`npm run dev`). Products and categories will now automatically synchronize from WooCommerce!

---

## 📂 Project Structure

```
zelevation-commerce/
├── zelevation.config.ts           # Central Agency Config (Single Source of Truth)
├── .env.example                   # Environment credentials template
├── tailwind.config.ts             # Tailwind CSS tokens & animations
├── src/
│   ├── app/                       # Next.js 15 App Router pages
│   │   ├── page.tsx               # Luxury Home Page
│   │   ├── shop/                  # Catalog & PDP [slug]
│   │   ├── cart/                  # Full Cart Page
│   │   ├── checkout/              # 2-Step Checkout Page
│   │   ├── account/               # My Account Dashboard
│   │   ├── login/                 # Sign In Page
│   │   └── register/              # Create Account Page
│   ├── components/                # Modular UI Components
│   │   ├── layout/                # Header, MegaMenu, MobileDrawer, Footer
│   │   ├── product/               # ProductCard, Gallery, SizeGuide, StickyCTA
│   │   └── cart/                  # CartDrawer, FreeShippingBar
│   ├── lib/                       # Utilities, Mock Data & WooGraphQL Client
│   └── store/                     # Zustand persistent stores (Cart & Wishlist)
```

---

© 2026 Zelevation. All rights reserved.
