// components/ProductInfo.tsx
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
  onItemChange
}: ProductInfoProps) {
  return (
    <CardContent className="p-4 bg-primary text-primary-foreground">
      {/* Brand */}
      <p className="text-sm opacity-80 mb-1 font-medium uppercase tracking-wide">{product.brand}</p>

      {/* Product Name */}
      <h3 className="font-semibold mb-3 line-clamp-2 text-base leading-tight">{product.productName}</h3>

      {/* Available Colors */}
      {product.availableColors.length > 0 && (
        <div className="flex gap-1.5 mb-3">
          {product.availableColors.slice(0, 4).map((color, index) => (
            <div
              key={color}
              className="w-4 h-4 rounded-full border border-primary-foreground/20"
              style={{
                backgroundColor: getColorValue(color),
              }}
              title={color}
            />
          ))}
          {product.availableColors.length > 4 && (
            <span className="text-xs opacity-70 ml-1 self-center">+{product.availableColors.length - 4}</span>
          )}
        </div>
      )}

      {/* Available Sizes */}
      {product.availableSizes.length > 0 && (
        <div className="mb-3">
          <p className="text-xs opacity-80">
            Tallas: {product.availableSizes.slice(0, 4).join(", ")}
            {product.availableSizes.length > 4 && "..."}
          </p>
        </div>
      )}

      {/* Item Variants */}
      {product.items.length > 1 && (
        <div className="mb-3">
          <div className="flex gap-1.5 flex-wrap">
            {product.items.slice(0, 3).map((item, index) => (
              <button
                key={item.itemId}
                onClick={(e) => onItemChange(index, e)}
                className={`w-8 h-8 rounded border overflow-hidden transition-all duration-200 ${
                  selectedItemIndex === index
                    ? "border-primary-foreground scale-110"
                    : "border-primary-foreground/30 hover:border-primary-foreground/60"
                }`}
              >
                <img
                  src={item.images[0]?.imageUrl || "/placeholder-image.jpg"}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
            {product.items.length > 3 && (
              <div className="w-8 h-8 rounded border border-primary-foreground/30 flex items-center justify-center">
                <span className="text-xs opacity-70">+{product.items.length - 3}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Price and Stock */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">${selectedItem?.price?.toLocaleString() || "0"}</span>
          {hasDiscount && (
            <span className="text-sm opacity-60 line-through">${selectedItem?.listPrice?.toLocaleString()}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Stock Status */}
          <div
            className={`text-xs px-2 py-1 rounded-full ${
              selectedItem?.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {selectedItem?.isAvailable ? "Stock" : "Agotado"}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-3 w-3 fill-current text-yellow-400" />
              ))}
            </div>
            <span className="text-xs opacity-80">(4.5)</span>
          </div>
        </div>
      </div>
    </CardContent>
  )
}