export type ProductCategory = 'todos' | 'tops' | 'pantalones' | 'vestidos' | 'sets' | 'blazers' | 'faldas';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  priceCRC: number; // Costa Rican Colones
  originalPriceCRC?: number;
  priceUSD: number;
  fabric: string;
  composition: string;
  fit: string;
  colors: ProductColor[];
  sizes: string[];
  image: string;
  fallbackImage?: string;
  tag?: string;
  description: string;
  details: string[];
  care: string[];
  inStock: boolean;
  isApartadoAvailable: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
  purchaseType?: 'direct' | 'apartado'; // Regular purchase or Apartado (layaway with 50%)
}

export interface FilterState {
  category: ProductCategory;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name';
  maxPriceCRC: number;
}

export interface CheckoutDetails {
  fullName: string;
  email: string;
  phone: string;
  instagramUser: string;
  address: string;
  province: string;
  canton: string;
  paymentMethod: 'sinpe' | 'card' | 'transfer' | 'apartado';
  sinpePhoneConfirmed?: boolean;
  notes?: string;
}
