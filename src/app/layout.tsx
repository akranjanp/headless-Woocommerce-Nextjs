import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { zelevationConfig } from "@/../zelevation.config";

export const metadata: Metadata = {
  title: `${zelevationConfig.store.name} | ${zelevationConfig.store.tagline}`,
  description: "Next-generation luxury fashion headless eCommerce boilerplate engineered by Zelevation.",
  keywords: ["headless woocommerce", "luxury fashion", "zelevation", "nextjs ecommerce", "editorial apparel"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground selection:bg-secondary selection:text-white">
        {/* Global Sticky Modern Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Global Slide-Over Mini-Cart Drawer */}
        <CartDrawer />

        {/* Global High-End Agency Footer */}
        <Footer />
      </body>
    </html>
  );
}
