"use client"

import type { ApiProduct } from "@/types/productsInterface"
import { useProductById } from "@/hooks/useProductDetails"
import ProductLoadingState from "./ProductLoadingState";
import ProductBreadcrumb from "./ProductBreadcrumb";
import ProductImageSection from "./ProductImageSection";
import ProductInfoSection from "./ProductInfoSection";
import ProductInfoTabs from "./ProductInfoTabs";

interface ProductDetailsViewProps {
  product: ApiProduct;
  productId: string;
}

export function ProductDetailsView({ product, productId }: ProductDetailsViewProps) {
  const {
    // State
    selectedColor,
    selectedSize,
    quantity,
    isFavorite,
    isAdded,
    selectedItemData,
    
    // Actions
    setSelectedColor,
    setSelectedSize,
    handleAddToCart,
    handleQuantityChange,
    toggleFavorite,
  } = useProductById( productId)

  // Si no hay datos del item seleccionado, mostrar un estado de carga
  if (!selectedItemData) {
    return <ProductLoadingState />
  }

  const { price, listPrice, isAvailable, images, discountPercentage } = selectedItemData

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <ProductBreadcrumb product={product} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImageSection
            product={product}
            images={images}
            discountPercentage={discountPercentage}
            isAvailable={isAvailable}
          />

          <ProductInfoSection
            product={product}
            price={price}
            listPrice={listPrice}
            discountPercentage={discountPercentage}
            isAvailable={isAvailable}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            quantity={quantity}
            isFavorite={isFavorite}
            isAdded={isAdded}
            onColorChange={setSelectedColor}
            onSizeChange={setSelectedSize}
            onQuantityChange={handleQuantityChange}
            onToggleFavorite={toggleFavorite}
            onAddToCart={handleAddToCart}
          />
        </div>

        <ProductInfoTabs product={product} />
      </div>
    </div>
  );
}