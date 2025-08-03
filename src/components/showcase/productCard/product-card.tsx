"use client"
import type React from "react"
import { Card } from "@/components/ui/card"
import type { Product } from "@/types/productsInterface"
import { useProductCard } from "@/hooks/useProductCard"
import ProductImage from "./ProductImage"
import ProductInfo from "./ProductInfo"

interface ProductCardProps {
  product: Product
  onProductClick: (productId: string) => void
  onAddToCart?: (productId: string, itemId: string) => void
}

export default function ProductCard({ product, onProductClick, onAddToCart }: ProductCardProps) {
  const {
    isFavorite,
    selectedItemIndex,
    isAdded,
    selectedItem,
    mainImage,
    hasDiscount,
    discountPercentage,
    handleFavoriteClick,
    handleAddToCart,
    handleCardClick,
    handleItemChange
  } = useProductCard(product, onAddToCart)

  return (
    <Card className="group cursor-pointer overflow-hidden bg-card border border-border/60 hover:border-border transition-all duration-300 hover:shadow-lg">
      <div onClick={() => handleCardClick(onProductClick)}>
        <ProductImage
          product={product}
          selectedItem={selectedItem}
          mainImage={mainImage}
          hasDiscount={hasDiscount}
          discountPercentage={discountPercentage}
          isFavorite={isFavorite}
          isAdded={isAdded}
          onFavoriteClick={handleFavoriteClick}
          onAddToCart={handleAddToCart}
        />
        
        <ProductInfo
          product={product}
          selectedItem={selectedItem}
          selectedItemIndex={selectedItemIndex}
          hasDiscount={hasDiscount}
          onItemChange={handleItemChange}
        />
      </div>
    </Card>
  )
}