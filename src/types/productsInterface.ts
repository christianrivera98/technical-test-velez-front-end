/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ApiProduct {
  productId: string;
  productName: string;
  brand: string;
  brandId: number;
  brandImageUrl?: string;
  linkText: string;
  productReference: string;
  productReferenceCode: string;
  categoryId: string;
  productTitle?: string;
  metaTagDescription?: string;
  releaseDate: string;
  clusterHighlights?: any;
  productClusters?: any;
  searchableClusters?: any;
  categories: string[];
  categoriesIds?: string[];
  link?: string;
  description: string;
  items: ApiProductItem[];
  
  // Especificaciones específicas que vienen en tu API
  ZAPATOS?: string[];
  meli_shipping_mode?: string[];
  Modelo?: string[];
  Impuesto?: string[];
  Genero?: string[];
  meli_title?: string[];
  "REGISTRO SIC"?: string[];
  General?: string[];
  "ALTO (cm)"?: string[];
  "INSTRUCCIONES DE CUIDADO"?: string[];
  "PAÍS DE ORIGEN"?: string[];
  "PESO (gr)"?: string[];
  CARACTERÍSTICAS?: string[];
  "FABRICANTE Y/O IMPORTADOR"?: string[];
  "ANCHO (cm)"?: string[];
  "PROFUNDO/LONGITUD (cm)"?: string[];
  COMPOSICIÓN?: string[];
  Contenido?: string[];
  allSpecifications?: string[];
  allSpecificationsGroups?: string[];
}

export interface ApiProductItem {
  itemId: string;
  name: string;
  nameComplete: string;
  complementName: string;
  ean: string;
  referenceId: ReferenceId[];
  measurementUnit: string;
  unitMultiplier: number;
  modalType?: string;
  isKit: boolean;
  images: ApiImage[];
  Color?: string[];
  Talla?: string[];
  variations?: string[];
  sellers: ApiSeller[];
  attachments?: any[];
  Videos?: any[];
  estimatedDateArrival?: any;
}

// El resto de las interfaces se mantienen igual...

export interface ApiImage {
  imageId: string;
  imageLabel: string;
  imageTag: string;
  imageUrl: string;
  imageText: string;
  imageLastModified: string;
}

export interface ApiSeller {
  sellerId: string;
  sellerName: string;
  addToCartLink: string;
  sellerDefault: boolean;
  commertialOffer: CommertialOffer;
}

export interface CommertialOffer {
  DeliverySlaSamplesPerRegion: any;
  Installments: Installment[];
  DiscountHighLight: any[];
  GiftSkuIds: any[];
  Teasers: any[];
  PromotionTeasers: any[];
  BuyTogether: any[];
  ItemMetadataAttachment: any[];
  Price: number;
  ListPrice: number;
  PriceWithoutDiscount: number;
  RewardValue: number;
  PriceValidUntil: string;
  AvailableQuantity: number;
  IsAvailable: boolean;
  Tax: number;
  DeliverySlaSamples: DeliverySlaSample[];
  GetInfoErrorMessage?: string;
  CacheVersionUsedToCallCheckout: string;
  PaymentOptions: PaymentOptions;
}

export interface Installment {
  Value: number;
  InterestRate: number;
  TotalValuePlusInterestRate: number;
  NumberOfInstallments: number;
  PaymentSystemName: string;
  PaymentSystemGroupName: string;
  Name: string;
}

export interface DeliverySlaSample {
  DeliverySlaPerTypes: any[];
  Region?: any;
}




export interface ReferenceId {
  Key: string;
  Value: string;
}


// Interfaces simplificadas para el componente de productos
export interface Product {
  productId: string;
  productName: string;
  brand: string;
  description: string;
  categories: string[];
  items: ProductItem[];
  // Campos extraídos para filtrado
  availableSizes: string[];
  availableColors: string[];
  minPrice: number;
  maxPrice: number;
  isOnSale: boolean;
  isNew: boolean;
}

export interface ProductItem {
  itemId: string;
  name: string;
  images: ImageInterface[];
  colors: string[];
  sizes: string[];
  price: number;
  listPrice: number;
  isAvailable: boolean;
}

export interface ImageInterface {
  imageUrl: string;
  imageLabel?: string;
}

// Interfaces para filtros (mantienen la estructura actual)
export interface ProductFilters {
  category: string;
  priceRange: [number, number];
  selectedSizes: string[];
  selectedColors: string[];
  showOnSale: boolean;
  showNew: boolean;
}

export type SortOption = "featured" | "newest" | "price-low" | "price-high" | "rating";
export type ViewMode = "grid" | "list";

// Interface para el carrito (mantiene la estructura actual)
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

export interface CartState {
  items: CartItem[];
  totalAmount: number;
}

