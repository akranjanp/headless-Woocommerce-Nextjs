import { Product, Category } from "@/types";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "./mockData";
import { zelevationConfig } from "@/../zelevation.config";

const BASE_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://staging.bom1.mystaging.site";
const USE_MOCK =
  process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

function cleanHtml(html?: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
}

export async function getProducts(params?: {
  categorySlug?: string;
  featuredOnly?: boolean;
  newArrivalsOnly?: boolean;
  limit?: number;
}): Promise<Product[]> {
  if (!USE_MOCK && BASE_URL) {
    try {
      // Determine API URL: clean trailing slash and /graphql
      const cleanBase = BASE_URL.replace(/\/graphql\/?$/, "").replace(/\/$/, "");
      const storeApiUrl = `${cleanBase}/wp-json/wc/store/v1/products?per_page=${params?.limit || 20}`;

      const res = await fetch(storeApiUrl, {
        next: { revalidate: 30 },
      });

      if (res.ok) {
        const rawProducts: any[] = await res.json();

        if (Array.isArray(rawProducts) && rawProducts.length > 0) {
          const mapped: Product[] = rawProducts.map((p) => {
            // Price conversion: wc/store/v1 provides price in minor unit string, e.g. "17500" = 175
            const minorUnit = p.prices?.currency_minor_unit ?? 2;
            const divisor = Math.pow(10, minorUnit);
            const price = parseFloat(p.prices?.price || "0") / divisor;
            const regPrice = parseFloat(p.prices?.regular_price || "0") / divisor;

            return {
              id: String(p.id),
              databaseId: p.id,
              name: p.name,
              slug: p.slug,
              price: price || 999,
              regularPrice: regPrice > price ? regPrice : undefined,
              onSale: p.on_sale || false,
              description: cleanHtml(p.description) || p.name,
              shortDescription: cleanHtml(p.short_description) || "",
              category: {
                name: p.categories?.[0]?.name || "General",
                slug: p.categories?.[0]?.slug || "general",
              },
              images: (p.images && p.images.length > 0)
                ? p.images.map((img: any) => ({
                    id: String(img.id),
                    sourceUrl: img.src,
                    altText: img.alt || p.name,
                  }))
                : [
                    {
                      id: "def",
                      sourceUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
                      altText: p.name,
                    },
                  ],
              colorOptions: p.attributes?.find((a: any) => a.name.toLowerCase() === "color")
                ?.terms?.map((t: any) => ({
                  name: t.name,
                  hex: t.slug === "blue" ? "#2563eb" : t.slug === "red" ? "#dc2626" : t.slug === "green" ? "#16a34a" : t.slug === "aqua" ? "#06b6d4" : "#18181b",
                })) || [
                  { name: "Default", hex: "#18181b" },
                  { name: "Neutral", hex: "#c5a880" }
                ],
              sizeOptions: p.attributes?.find((a: any) => a.name.toLowerCase() === "size")
                ?.terms?.map((t: any) => t.name) || ["S", "M", "L", "XL"],
              sku: p.sku || `SKU-${p.id}`,
              stockQuantity: 10,
              inStock: p.is_in_stock ?? true,
              rating: parseFloat(p.average_rating || "4.8") || 4.8,
              reviewCount: p.review_count || 12,
              fabricCare: "Premium Crafted Garment. Gentle machine wash cold or dry clean.",
              shippingInfo: "Complimentary express courier across India. 7-day hassle-free returns.",
              isFeatured: true,
              isNewArrival: true,
            };
          });

          let results = mapped;
          if (params?.categorySlug) {
            results = results.filter(
              (p) => p.category.slug.toLowerCase() === params.categorySlug?.toLowerCase()
            );
          }
          if (params?.limit) {
            results = results.slice(0, params.limit);
          }
          return results;
        }
      }
    } catch (err) {
      console.warn("[Zelevation Live WC API] Fetch failed, using fallback:", err);
    }
  }

  // Fallback to High-Res Mock Data
  let results = [...MOCK_PRODUCTS];
  if (params?.categorySlug) {
    results = results.filter(
      (p) => p.category.slug.toLowerCase() === params.categorySlug?.toLowerCase()
    );
  }
  if (params?.limit) {
    results = results.slice(0, params.limit);
  }
  return results;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!USE_MOCK && BASE_URL) {
    try {
      const cleanBase = BASE_URL.replace(/\/graphql\/?$/, "").replace(/\/$/, "");
      const res = await fetch(`${cleanBase}/wp-json/wc/store/v1/products?slug=${slug}`, {
        next: { revalidate: 30 },
      });

      if (res.ok) {
        const rawProducts: any[] = await res.json();
        if (Array.isArray(rawProducts) && rawProducts.length > 0) {
          const p = rawProducts[0];
          const minorUnit = p.prices?.currency_minor_unit ?? 2;
          const divisor = Math.pow(10, minorUnit);
          const price = parseFloat(p.prices?.price || "0") / divisor;
          const regPrice = parseFloat(p.prices?.regular_price || "0") / divisor;

          return {
            id: String(p.id),
            databaseId: p.id,
            name: p.name,
            slug: p.slug,
            price: price || 999,
            regularPrice: regPrice > price ? regPrice : undefined,
            onSale: p.on_sale || false,
            description: cleanHtml(p.description) || p.name,
            shortDescription: cleanHtml(p.short_description) || "",
            category: {
              name: p.categories?.[0]?.name || "General",
              slug: p.categories?.[0]?.slug || "general",
            },
            images: (p.images && p.images.length > 0)
              ? p.images.map((img: any) => ({
                  id: String(img.id),
                  sourceUrl: img.src,
                  altText: img.alt || p.name,
                }))
              : [
                  {
                    id: "def",
                    sourceUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
                    altText: p.name,
                  },
                ],
            colorOptions: p.attributes?.find((a: any) => a.name.toLowerCase() === "color")
              ?.terms?.map((t: any) => ({
                name: t.name,
                hex: t.slug === "blue" ? "#2563eb" : t.slug === "red" ? "#dc2626" : t.slug === "green" ? "#16a34a" : t.slug === "aqua" ? "#06b6d4" : "#18181b",
              })) || [
                { name: "Default", hex: "#18181b" },
                { name: "Neutral", hex: "#c5a880" }
              ],
            sizeOptions: p.attributes?.find((a: any) => a.name.toLowerCase() === "size")
              ?.terms?.map((t: any) => t.name) || ["S", "M", "L", "XL"],
            sku: p.sku || `SKU-${p.id}`,
            stockQuantity: 10,
            inStock: p.is_in_stock ?? true,
            rating: parseFloat(p.average_rating || "4.8") || 4.8,
            reviewCount: p.review_count || 12,
            fabricCare: "100% Authentic Quality. Machine wash cold or dry clean.",
            shippingInfo: "Complimentary express courier across India. 7-day hassle-free returns.",
            isFeatured: true,
            isNewArrival: true,
          };
        }
      }
    } catch (err) {
      console.warn("[Zelevation Live PDP Fetch Error]:", err);
    }
  }

  const found = MOCK_PRODUCTS.find((p) => p.slug === slug);
  return found || null;
}

export async function getCategories(): Promise<Category[]> {
  if (!USE_MOCK && BASE_URL) {
    try {
      const cleanBase = BASE_URL.replace(/\/graphql\/?$/, "").replace(/\/$/, "");
      const res = await fetch(`${cleanBase}/wp-json/wc/store/v1/products/categories`, {
        next: { revalidate: 60 },
      });

      if (res.ok) {
        const rawCats: any[] = await res.json();
        if (Array.isArray(rawCats) && rawCats.length > 0) {
          return rawCats.map((c: any) => ({
            id: String(c.id),
            name: c.name,
            slug: c.slug,
            description: cleanHtml(c.description),
            image: c.image?.src || (c.slug === "men" ? "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900" : "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900"),
            itemCount: c.count || 10,
          }));
        }
      }
    } catch (err) {
      console.warn("[Zelevation Live Categories Error]:", err);
    }
  }

  return MOCK_CATEGORIES;
}
