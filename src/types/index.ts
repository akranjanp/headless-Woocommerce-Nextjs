export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  regularPrice?: number;
  sku: string;
  inStock: boolean;
  stockQuantity?: number;
  attributes: {
    name: string;
    value: string;
  }[];
}

export interface ProductAttribute {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  databaseId?: number;
  name: string;
  slug: string;
  subtitle?: string;
  price: number;
  regularPrice?: number;
  onSale?: boolean;
  saleBadge?: string;
  description: string;
  shortDescription?: string;
  images: {
    id: string;
    sourceUrl: string;
    altText?: string;
  }[];
  category: {
    name: string;
    slug: string;
  };
  attributes?: ProductAttribute[];
  variants?: ProductVariant[];
  colorOptions?: {
    name: string;
    hex: string;
  }[];
  sizeOptions?: string[];
  sku?: string;
  stockQuantity?: number;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
  fabricCare?: string;
  shippingInfo?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  id: string; // Unique cart item ID (product ID + variant details)
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  maxStock?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  itemCount?: number;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "Pending" | "Processing" | "In Transit" | "Delivered" | "Cancelled";
  total: number;
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
  };
}

export interface CustomerAddress {
  id: string;
  title: string;
  isDefault: boolean;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
}
