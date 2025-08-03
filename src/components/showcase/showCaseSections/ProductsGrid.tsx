// components/ProductsGrid.tsx
import { ViewMode } from "@/types/productsInterface";
import type { Product } from "@/types/productsInterface";
import ProductCard from "../productCard/product-card";

interface ProductsGridProps {
  products: Product[];
  viewMode: ViewMode;
  onAddToCart: () => void;
  onProductClick: () => void;
}

export default function ProductsGrid({
  products,
  viewMode,
  onAddToCart,
  onProductClick,
}: ProductsGridProps) {
  return (
    <div
      className={`grid gap-6 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1"
      }`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.productId}
          product={product}
          onAddToCart={onAddToCart}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
}