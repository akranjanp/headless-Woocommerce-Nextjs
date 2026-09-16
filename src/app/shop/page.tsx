import React from "react";
import Link from "next/link";
import { getProducts, getCategories } from "@/lib/woocommerce";
import ProductCard from "@/components/product/ProductCard";
import { SlidersHorizontal } from "lucide-react";

interface ShopPageProps {
  searchParams: Promise<{
    cat?: string;
    q?: string;
    filter?: string;
    sort?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const categories = await getCategories();
  let products = await getProducts();

  // Search filtering
  if (params.q) {
    const q = params.q.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.name.toLowerCase().includes(q)
    );
  }

  // Category filtering
  if (params.cat) {
    const cat = params.cat.toLowerCase();
    products = products.filter(
      (p) =>
        p.category.slug.toLowerCase().includes(cat) ||
        cat.includes(p.category.slug.toLowerCase())
    );
  }

  // Sort handling
  if (params.sort === "price-asc") {
    products.sort((a, b) => a.price - b.price);
  } else if (params.sort === "price-desc") {
    products.sort((a, b) => b.price - a.price);
  }

  const activeCategoryName = categories.find((c) => c.slug === params.cat)?.name || "All Collections";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="border-b border-border pb-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-secondary mb-1">
              {params.q ? `Search results for "${params.q}"` : "CATALOG"}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              {activeCategoryName}
            </h1>
          </div>
          <span className="text-xs text-muted-foreground">
            Showing <strong>{products.length}</strong> sartorial designs
          </span>
        </div>

        {/* Quick Category Chips Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 scrollbar-none">
          <Link
            href="/shop"
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              !params.cat
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-muted text-foreground/80 hover:bg-muted/80"
            }`}
          >
            All Products
          </Link>
          {categories.map((cat) => {
            const isActive = params.cat === cat.slug;
            return (
              <Link
                key={cat.id}
                href={`/shop?cat=${cat.slug}`}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted text-foreground/80 hover:bg-muted/80"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Product Grid Area */}
      {products.length === 0 ? (
        <div className="py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground mb-4">
            <SlidersHorizontal className="w-8 h-8 opacity-40" />
          </div>
          <h3 className="font-serif text-lg font-bold text-foreground">
            No designs found
          </h3>
          <p className="text-xs text-muted-foreground mt-1 mb-6">
            Try adjusting your search keywords or browsing our full collection.
          </p>
          <Link
            href="/shop"
            className="px-6 py-2.5 bg-primary text-primary-foreground text-xs font-bold uppercase rounded-md"
          >
            Reset Filters
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
