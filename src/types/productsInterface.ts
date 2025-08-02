// Para el endpoint de un producto individual
export interface Product {
  productId: string;
  productName: string; 
  brand: string; 
  productReference: string; 
  productReferenceCode: string; // Código de referencia alternativo
  items: ProductItem[]; // Contiene las variaciones (SKUs) con sus tallas, colores, imágenes y precios
  skuSpecifications: SkuSpecification[]; // Para mostrar las tallas y colores disponibles de forma seleccionable
}

export interface ProductItem {
  itemId: string; 
  name: string; 
  images: Image[]; 
  Color: string[]; 
  Talla: string[]; 
  sellers: Seller[]; 
}

export interface Image {
  imageUrl: string; 
}

export interface Seller {
  commertialOffer: CommertialOffer; 
}

export interface CommertialOffer {
  Price: number; // Precio con Descuento
  ListPrice: number; // Precio Full
}

export interface SkuSpecification {
  field: SkuField;
  values: SkuValue[];
}

export interface SkuField {
  id: number;
  name: string; 
  isActive: boolean;
  position: number;
  type: string; 
}

export interface SkuValue {
  id: string;
  name: string; 
  position: number; 
}

// Interfaz para la Vitrina

export type ShowcaseProduct = Product;

export interface CartItem {
  productId: string; 
  itemId: string;
  name: string;
  imageUrl: string;
  price: number; 
  quantity: number; 
  color?: string;
  size?: string;
}

// Interfaz para el estado completo del carrito
export interface CartState {
  items: CartItem[];
  totalAmount: number; 
}

export interface ProductFilters {
  category: string
  priceRange: [number, number]
  selectedSizes: string[]
  selectedColors: string[]
  showOnSale: boolean
  showNew: boolean
}

export type SortOption = "featured" | "newest" | "price-low" | "price-high" | "rating"
export type ViewMode = "grid" | "list"