"use client"

import type React from "react"
import { Heart, ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/productsInterface"

interface ProductImageProps {
  product: Product
  selectedItem: any
  mainImage: string
  hasDiscount: boolean
  discountPercentage: number
  isFavorite: boolean
  isAdded: boolean
  onFavoriteClick: (e: React.MouseEvent) => void
  onAddToCart: (e: React.MouseEvent) => void
}

export default function ProductImage({
  product,
  selectedItem,
  mainImage,
  hasDiscount,
  discountPercentage,
  isFavorite,
  isAdded,
  onFavoriteClick,
  onAddToCart,
}: ProductImageProps) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-muted/30">
      <img
        src={mainImage || "/placeholder.svg"}
        alt={product.productName}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        {product.isNew && (
          <Badge className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1">Nuevo</Badge>
        )}
        {hasDiscount && (
          <Badge className="bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1">
            -{discountPercentage}%
          </Badge>
        )}
        {!selectedItem?.isAvailable && (
          <Badge variant="secondary" className="text-xs font-medium px-2 py-1">
            Agotado
          </Badge>
        )}
      </div>


      {/* Quick Add to Cart */}
      <div className="absolute top-3 right-3 h-9 w-9 rounded-full transition-all duration-200 ">
        <Button
          onClick={onAddToCart}
          disabled={!selectedItem?.isAvailable}
          className={`w-full transition-all duration-200 cursor-pointer ${
            isAdded
              ? "bg-green-600 hover:bg-green-700 text-white"
              : selectedItem?.isAvailable
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4" />
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
