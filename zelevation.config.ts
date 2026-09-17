export interface SubMenuItem {
  title: string;
  href: string;
  badge?: string;
}

export interface MegaCategoryItem {
  categoryTitle: string;
  items: SubMenuItem[];
}

export interface NavItem {
  title: string;
  href: string;
  isMegaMenu?: boolean;
  megaCategories?: MegaCategoryItem[];
  featuredBanner?: {
    title: string;
    subtitle: string;
    imageUrl: string;
    ctaText: string;
    href: string;
  };
  subItems?: SubMenuItem[];
  badge?: string;
}

export interface ZelevationConfig {
  agency: {
    name: string;
    credit: string;
    url: string;
  };
  store: {
    name: string;
    tagline: string;
    legalName: string;
    supportEmail: string;
    supportPhone: string;
    address: string;
    currencySymbol: string;
    currencyCode: string;
    freeShippingThreshold: number;
  };
  branding: {
    logoText: string;
    logoAccent: string;
    colors: {
      primary: string;
      primaryHover: string;
      secondary: string;
      accent: string;
      background: string;
      foreground: string;
    };
  };
  announcements: string[];
  navigation: NavItem[];
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
    pinterest: string;
  };
  api: {
    useMockData: boolean;
    wordpressGraphqlUrl: string;
    woocommerceRestUrl: string;
  };
}

export const zelevationConfig: ZelevationConfig = {
  agency: {
    name: "Zelevation",
    credit: "Engineered by Zelevation Headless Studio",
    url: "https://zelevation.com",
  },
  store: {
    name: "ZELEVATION ATELIER",
    tagline: "Contemporary Haute Couture & Urban Silhouette",
    legalName: "Zelevation Commerce Pvt. Ltd.",
    supportEmail: "concierge@zelevation.com",
    supportPhone: "+91 (0) 800 920 4400",
    address: "Zelevation Fashion House, 4th Avenue, Indiranagar, Bengaluru, India",
    currencySymbol: "₹",
    currencyCode: "INR",
    freeShippingThreshold: 1999,
  },
  branding: {
    logoText: "ZELEVATION",
    logoAccent: "ATELIER",
    colors: {
      primary: "#090d16", // Deep Royal Midnight Velvet
      primaryHover: "#162033",
      secondary: "#d97706", // Gleaming Champagne Gold
      accent: "#e11d48", // Vibrant Couture Rose-Coral
      background: "#fcfbf9", // Warm porcelain pearl
      foreground: "#090d16", // Deep Midnight
    },
  },
  announcements: [
    "✨ COMPLIMENTARY EXPRESS SHIPPING ON ORDERS OVER ₹1,999",
    "NEW SS'26 RUNWAY CAPSULE JUST DROPPED • SHOP NOW",
    "USE CODE 'ZELEVATION15' TO RECEIVE 15% OFF YOUR MAIDEN ORDER",
    "HASSLE-FREE 7-DAY DOORSTEP RETURNS & REPLACEMENTS",
  ],
  navigation: [
    {
      title: "WOMEN",
      href: "/shop?cat=women",
      badge: "HOT",
      isMegaMenu: true,
      megaCategories: [
        {
          categoryTitle: "READY TO WEAR",
          items: [
            { title: "Dresses & Gowns", href: "/shop?cat=women-dresses" },
            { title: "Structured Blazers", href: "/shop?cat=women-blazers", badge: "NEW" },
            { title: "Tailored Trousers", href: "/shop?cat=women-trousers" },
            { title: "Silk Tops & Shirts", href: "/shop?cat=women-shirts" },
            { title: "Cashmere Knitwear", href: "/shop?cat=women-knitwear" },
          ],
        },
        {
          categoryTitle: "COLLECTIONS",
          items: [
            { title: "Minimalist Linen Drop", href: "/shop?collection=linen" },
            { title: "Urban Monochromes", href: "/shop?collection=monochrome" },
            { title: "Evening Silhouette", href: "/shop?collection=evening", badge: "POPULAR" },
            { title: "Travel Capsule", href: "/shop?collection=resort" },
          ],
        },
        {
          categoryTitle: "ACCESSORIES",
          items: [
            { title: "Sculpted Handbags", href: "/shop?cat=handbags" },
            { title: "Italian Leather Belts", href: "/shop?cat=belts" },
            { title: "Fine Silk Scarves", href: "/shop?cat=scarves" },
            { title: "Minimalist Eyewear", href: "/shop?cat=eyewear" },
          ],
        },
      ],
      featuredBanner: {
        title: "SPRING SOLSTICE",
        subtitle: "Architectural cuts in breathable organic fibers.",
        imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        ctaText: "EXPLORE CAPSULE",
        href: "/shop?cat=women",
      },
    },
    {
      title: "MEN",
      href: "/shop?cat=men",
      isMegaMenu: true,
      megaCategories: [
        {
          categoryTitle: "TOPWEAR",
          items: [
            { title: "Oversized Luxury Tees", href: "/shop?cat=men-tees", badge: "BESTSELLER" },
            { title: "Structured Overshirts", href: "/shop?cat=men-overshirts" },
            { title: "Classic Formal Shirts", href: "/shop?cat=men-shirts" },
            { title: "Bombers & Trench Coats", href: "/shop?cat=men-jackets" },
          ],
        },
        {
          categoryTitle: "BOTTOMWEAR",
          items: [
            { title: "Pleated Wide-Leg Pants", href: "/shop?cat=men-trousers", badge: "TRENDING" },
            { title: "Raw Selvedge Denim", href: "/shop?cat=men-denim" },
            { title: "Relaxed Linen Trousers", href: "/shop?cat=men-linen" },
            { title: "Tailored Cargo Chinos", href: "/shop?cat=men-cargos" },
          ],
        },
        {
          categoryTitle: "LEATHER GOODS",
          items: [
            { title: "Derby Shoes & Loafers", href: "/shop?cat=men-shoes" },
            { title: "Weekender Duffle Bags", href: "/shop?cat=men-bags" },
            { title: "Full-Grain Leather Wallets", href: "/shop?cat=men-wallets" },
          ],
        },
      ],
      featuredBanner: {
        title: "THE SARTORIAL EDIT",
        subtitle: "Sharply tailored relaxed menswear for the modern vanguard.",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
        ctaText: "DISCOVER MEN",
        href: "/shop?cat=men",
      },
    },
    {
      title: "NEW ARRIVALS",
      href: "/shop?filter=new",
      badge: "NEW",
    },
    {
      title: "LOOKBOOK",
      href: "/shop?lookbook=true",
    },
    {
      title: "ARCHIVE SALE",
      href: "/shop?filter=sale",
      badge: "UP TO 40% OFF",
    },
  ],
  socials: {
    instagram: "https://instagram.com/zelevation",
    facebook: "https://facebook.com/zelevation",
    twitter: "https://twitter.com/zelevation",
    pinterest: "https://pinterest.com/zelevation",
  },
  api: {
    useMockData: true, // Default to true for zero-friction client demos; set false when WP credentials provided
    wordpressGraphqlUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://demo.zelevation.com/graphql",
    woocommerceRestUrl: process.env.NEXT_PUBLIC_WC_REST_URL || "https://demo.zelevation.com/wp-json/wc/v3",
  },
};
