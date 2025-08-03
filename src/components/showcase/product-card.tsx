"use client"
import { useState } from "react"
import type React from "react"

import { Heart, ShoppingCart, Star, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/types/productsInterface"
import { useRouter } from "next/navigation"
import { useCart } from "../cart/context/shopping-cart-context"

interface ProductCardProps {
  product: Product
  onProductClick: (productId: string) => void
  onAddToCart?: (productId: string, itemId: string) => void
}

export default function ProductCard({ product, onProductClick, onAddToCart }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  const router = useRouter()
  const { addItem, state, dispatch } = useCart()

  const selectedItem = product.items[selectedItemIndex] || product.items[0]
  const mainImage = selectedItem?.images[0]?.imageUrl || "/placeholder.svg?height=400&width=320"

  const hasDiscount = selectedItem && selectedItem.price < selectedItem.listPrice
  const discountPercentage = hasDiscount
    ? Math.round(((selectedItem.listPrice - selectedItem.price) / selectedItem.listPrice) * 100)
    : 0

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (selectedItem && selectedItem.isAvailable) {
      console.log("ProductCard: Adding to cart", selectedItem)

      const cartItem = {
        id: product.productId,
        itemId: selectedItem.itemId,
        name: product.productName,
        price: selectedItem.price,
        image: mainImage,
        color: selectedItem.colors?.[0] || undefined,
        size: selectedItem.sizes?.[0] || undefined,
        brand: product.brand,
        isAvailable: selectedItem.isAvailable,
      }

      console.log("ProductCard: Cart item to add:", cartItem)
      console.log("ProductCard: Current cart state before add:", state)

      try {
        addItem(cartItem)
        if (onAddToCart) {
          onAddToCart(product.productId, selectedItem.itemId)
        }
        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
        console.log("ProductCard: Item added successfully")
      } catch (error) {
        console.error("ProductCard: Error adding item to cart:", error)
      }
    }
  }

  const handleCardClick = () => {
    onProductClick(product.productId)
    router.push(`product-details/${product.productId}`)
  }

  const handleItemChange = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedItemIndex(index)
  }

  return (
    <Card className="group cursor-pointer overflow-hidden bg-card border border-border/60 hover:border-border transition-all duration-300 hover:shadow-lg">
      <div onClick={handleCardClick}>
        {/* Image Container */}
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

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-3 right-3 h-9 w-9 rounded-full transition-all duration-200 ${
              isFavorite
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-background/80 text-foreground hover:bg-background"
            }`}
            onClick={handleFavoriteClick}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </Button>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Button
              onClick={handleAddToCart}
              disabled={!selectedItem?.isAvailable}
              className={`w-full transition-all duration-200 ${
                isAdded
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : selectedItem?.isAvailable
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Agregado
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {selectedItem?.isAvailable ? "Agregar" : "Sin stock"}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Product Info */}
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
                    onClick={(e) => handleItemChange(index, e)}
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
      </div>
    </Card>
  )
}

// Helper function to convert color names to CSS colors
function getColorValue(colorName: string): string {
  const colorMap: Record<string, string> = {
    Negro: "#1c1c1c",
    Blanco: "#fafaff",
    Azul: "#4a90e2",
    Rojo: "#e74c3c",
    Verde: "#27ae60",
    Amarillo: "#f1c40f",
    Rosa: "#e91e63",
    Gris: "#95a5a6",
    Marrón: "#8b4513",
    Beige: "#f5f5dc",
    Naranja: "#ff9500",
    Morado: "#9b59b6",
    Turquesa: "#1abc9c",
  }
  return colorMap[colorName] || "#daddd8"
}
