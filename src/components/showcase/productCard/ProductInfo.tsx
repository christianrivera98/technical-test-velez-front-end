"use client"

import type React from "react"
import { CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import type { Product } from "@/types/productsInterface"
import { getColorValue } from "@/lib/helpers/product-helpers"

interface ProductInfoProps {
  product: Product
  selectedItem: any
  selectedItemIndex: number
  hasDiscount: boolean
  onItemChange: (index: number, e: React.MouseEvent) => void
}

export default function ProductInfo({
  product,
  selectedItem,
  selectedItemIndex,
  hasDiscount,
  onItemChange,
}: ProductInfoProps) {
  return (
    <div className="relative bg-primary text-primary-foreground">
      {/* Basic Info - Always Visible */}
      <CardContent className="p-4 space-y-2">
        {/* Brand */}
        <p className="text-sm opacity-80 mb-1 font-medium uppercase tracking-wide">{product.brand}</p>

        {/* Product Name */}
        <h3 className="font-semibold mb-2 line-clamp-2 text-base leading-tight">{product.productName}</h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">${selectedItem?.price?.toLocaleString() || "0"}</span>
          {hasDiscount && (
            <span className="text-sm opacity-60 line-through">${selectedItem?.listPrice?.toLocaleString()}</span>
          )}
        </div>
      </CardContent>

      {/* Expandable Details - Appears as Overlay on Hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground border-t border-primary-foreground/20 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out z-10 shadow-lg">
        <CardContent className="p-4 space-y-3">
          {/* Available Colors */}
          {product.availableColors.length > 0 && (
            <div>
              <p className="text-xs opacity-80 mb-2 font-medium">Colores disponibles:</p>
              <div className="flex gap-1.5 flex-wrap">
                {product.availableColors.slice(0, 6).map((color, index) => (
                  <div
                    key={color}
                    className="w-5 h-5 rounded-full border border-primary-foreground/20 hover:scale-110 transition-transform duration-200"
                    style={{
                      backgroundColor: getColorValue(color),
                    }}
                    title={color}
                  />
                ))}
                {product.availableColors.length > 6 && (
                  <span className="text-xs opacity-70 ml-1 self-center">+{product.availableColors.length - 6}</span>
                )}
              </div>
            </div>
          )}

          {/* Available Sizes */}
          {product.availableSizes.length > 0 && (
            <div>
              <p className="text-xs opacity-80 mb-1 font-medium">Tallas disponibles:</p>
              <div className="flex gap-1.5 flex-wrap">
                {product.availableSizes.slice(0, 8).map((size, index) => (
                  <span
                    key={size}
                    className="text-xs px-2 py-1 bg-primary-foreground/10 rounded border border-primary-foreground/20"
                  >
                    {size}
                  </span>
                ))}
                {product.availableSizes.length > 8 && (
                  <span className="text-xs opacity-70 self-center">+{product.availableSizes.length - 8}</span>
                )}
              </div>
            </div>
          )}

          {/* Stock Status and Rating */}
          <div className="flex items-center justify-between pt-2 border-t border-primary-foreground/20">
            <div
              className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                selectedItem?.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {selectedItem?.isAvailable ? "En Stock" : "Agotado"}
            </div>

            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3 w-3 fill-current text-yellow-400" />
                ))}
              </div>
              <span className="text-xs opacity-80 ml-1">(4.5)</span>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  )
}
