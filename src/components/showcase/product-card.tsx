"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Product } from "@/types/productsInterface"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: Product
  onAddToCart: (productId: string, itemId: string) => void
  onProductClick: (productId: string) => void
}

export default function ProductCard({
  product,
  onAddToCart,
  onProductClick,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const router = useRouter();

  // Obtener el item seleccionado
  const selectedItem = product.items[selectedItemIndex] || product.items[0]
  const mainImage = selectedItem?.images[0]?.imageUrl || '/placeholder-image.jpg'

  // Calcular descuento si existe
  const hasDiscount = selectedItem && selectedItem.price < selectedItem.listPrice
  const discountPercentage = hasDiscount 
    ? Math.round(((selectedItem.listPrice - selectedItem.price) / selectedItem.listPrice) * 100)
    : 0

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedItem) {
      onAddToCart(product.productId, selectedItem.itemId)
    }
  }

  const handleCardClick = () => {
    onProductClick(product.productId)
    router.push(`product-details/${product.productId}`);

  }

  const handleItemChange = (index: number) => {
    setSelectedItemIndex(index)
  }

  return (
    <Card className="group cursor-pointer overflow-hidden bg-pure-white border-cream hover:shadow-lg transition-all duration-300">
      <div onClick={handleCardClick}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={mainImage}
            alt={product.productName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-olive-green text-pure-white text-xs">
                Nuevo
              </Badge>
            )}
            {hasDiscount && (
              <Badge className="bg-burnt-orange text-pure-white text-xs">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 h-8 w-8 rounded-full ${
              isFavorite 
                ? 'bg-burnt-orange text-pure-white hover:bg-burnt-orange/90' 
                : 'bg-pure-white/80 text-dark-green hover:bg-pure-white'
            }`}
            onClick={handleFavoriteClick}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>

          {/* Quick Add to Cart - appears on hover */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={handleAddToCart}
              disabled={!selectedItem?.isAvailable}
              className="w-full bg-dark-green hover:bg-olive-green text-pure-white text-sm py-2"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {selectedItem?.isAvailable ? 'Agregar al carrito' : 'No disponible'}
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Brand */}
          <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
          
          {/* Product Name */}
          <h3 className="font-medium text-dark-green mb-2 line-clamp-2 group-hover:text-olive-green transition-colors">
            {product.productName}
          </h3>

          {/* Available Colors */}
          {product.availableColors.length > 0 && (
            <div className="flex gap-1 mb-2">
              {product.availableColors.slice(0, 5).map((color, index) => (
                <div
                  key={color}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ 
                    backgroundColor: getColorValue(color)
                  }}
                  title={color}
                />
              ))}
              {product.availableColors.length > 5 && (
                <span className="text-xs text-gray-500 ml-1">
                  +{product.availableColors.length - 5}
                </span>
              )}
            </div>
          )}

          {/* Available Sizes */}
          {product.availableSizes.length > 0 && (
            <div className="mb-2">
              <p className="text-xs text-gray-600 mb-1">
                Tallas: {product.availableSizes.slice(0, 4).join(', ')}
                {product.availableSizes.length > 4 && '...'}
              </p>
            </div>
          )}

          {/* Item Variants (if multiple) */}
          {product.items.length > 1 && (
            <div className="mb-3">
              <div className="flex gap-1 flex-wrap">
                {product.items.slice(0, 3).map((item, index) => (
                  <button
                    key={item.itemId}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleItemChange(index)
                    }}
                    className={`w-8 h-8 rounded border-2 overflow-hidden ${
                      selectedItemIndex === index 
                        ? 'border-olive-green' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={item.images[0]?.imageUrl || '/placeholder-image.jpg'}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                {product.items.length > 3 && (
                  <div className="w-8 h-8 rounded border-2 border-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-500">
                      +{product.items.length - 3}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-dark-green text-lg">
              ${selectedItem?.price?.toLocaleString() || '0'}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${selectedItem?.listPrice?.toLocaleString()}
              </span>
            )}
          </div>

          {/* Rating placeholder */}
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className="h-3 w-3 fill-current text-yellow-400" 
                />
              ))}
            </div>
            <span>(4.5)</span>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

// Helper function to convert color names to CSS colors
function getColorValue(colorName: string): string {
  const colorMap: Record<string, string> = {
    'Negro': '#000000',
    'Blanco': '#FFFFFF',
    'Azul': '#0066CC',
    'Rojo': '#CC0000',
    'Verde': '#00CC00',
    'Amarillo': '#FFCC00',
    'Rosa': '#FF69B4',
    'Gris': '#808080',
    'Marrón': '#8B4513',
    'Beige': '#F5F5DC',
    'Naranja': '#FFA500',
    'Morado': '#800080',
    'Turquesa': '#40E0D0',
    // Agregar más colores según sea necesario
  }

  return colorMap[colorName] || '#CCCCCC' // Color por defecto
}