"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Star, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Product } from "@/types/productsInterface"
import { useRouter } from "next/navigation"
import { useCart } from "../cart/context/shopping-cart-context"

interface ProductCardProps {
  product: Product
  onProductClick: (productId: string) => void
  onAddToCart?: (productId: string, itemId: string) => void // Hacer opcional
}

export default function ProductCard({
  product,
  onProductClick,
  onAddToCart, // Esta prop ahora es opcional
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  const router = useRouter()
  const { addItem, state, dispatch } = useCart() // Agregamos state para debugging
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

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()
   
    if (selectedItem && selectedItem.isAvailable) {
      console.log('ProductCard: Adding to cart', selectedItem)
      
      // Preparar los datos del producto para el carrito
      const cartItem = {
        id: product.productId,
        itemId: selectedItem.itemId,
        name: product.productName,
        price: selectedItem.price,
        image: mainImage,
        color: selectedItem.colors?.[0] || undefined,
        size: selectedItem.sizes?.[0] || undefined,
        brand: product.brand,
        isAvailable: selectedItem.isAvailable
      }

      console.log('ProductCard: Cart item to add:', cartItem)
      console.log('ProductCard: Current cart state before add:', state)

      try {
        // Usar la función addItem del contexto
        addItem(cartItem)

        // Llamar la función onAddToCart si existe (para compatibilidad)
        if (onAddToCart) {
          onAddToCart(product.productId, selectedItem.itemId)
        }

        // Mostrar feedback visual
        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)

        console.log('ProductCard: Item added successfully')
      } catch (error) {
        console.error('ProductCard: Error adding item to cart:', error)
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
    <Card className="group cursor-pointer overflow-hidden bg-pure-white border-cream hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
      <div onClick={handleCardClick}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={mainImage}
            alt={product.productName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
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
            {!selectedItem?.isAvailable && (
              <Badge className="bg-gray-500 text-pure-white text-xs">
                Sin stock
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 h-8 w-8 rounded-full transition-all duration-200 ${
              isFavorite 
                ? 'bg-burnt-orange text-pure-white hover:bg-burnt-orange/90 scale-110' 
                : 'bg-pure-white/80 text-dark-green hover:bg-pure-white hover:scale-110'
            }`}
            onClick={handleFavoriteClick}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>

          {/* Quick Add to Cart - appears on hover */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Button
              onClick={handleAddToCart}
              disabled={!selectedItem?.isAvailable}
              className={`w-full text-pure-white text-sm py-2 transition-all duration-200 ${
                isAdded 
                  ? 'bg-green-600 hover:bg-green-700 scale-105' 
                  : selectedItem?.isAvailable
                  ? 'bg-dark-green hover:bg-olive-green active:scale-95'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  ¡Agregado!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {selectedItem?.isAvailable ? 'Agregar' : 'Sin stock'}
                </>
              )}
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Brand */}
          <p className="text-sm text-gray-600 mb-1 font-medium">{product.brand}</p>
          
          {/* Product Name */}
          <h3 className="font-medium text-dark-green mb-2 line-clamp-2 group-hover:text-olive-green transition-colors duration-200">
            {product.productName}
          </h3>

          {/* Available Colors */}
          {product.availableColors.length > 0 && (
            <div className="flex gap-1 mb-2">
              {product.availableColors.slice(0, 5).map((color, index) => (
                <div
                  key={color}
                  className="w-4 h-4 rounded-full border border-gray-300 hover:scale-110 transition-transform duration-200"
                  style={{ 
                    backgroundColor: getColorValue(color)
                  }}
                  title={color}
                />
              ))}
              {product.availableColors.length > 5 && (
                <span className="text-xs text-gray-500 ml-1 self-center">
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
                    onClick={(e) => handleItemChange(index, e)}
                    className={`w-8 h-8 rounded border-2 overflow-hidden transition-all duration-200 ${
                      selectedItemIndex === index 
                        ? 'border-olive-green scale-110' 
                        : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                    }`}
                  >
                    <img
                      src={item.images[0]?.imageUrl || '/placeholder-image.jpg'}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
                {product.items.length > 3 && (
                  <div className="w-8 h-8 rounded border-2 border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors duration-200">
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

          {/* Stock status */}
          <div className="flex items-center justify-between mb-2">
            <div className={`text-xs px-2 py-1 rounded-full ${
              selectedItem?.isAvailable 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {selectedItem?.isAvailable ? 'En stock' : 'Sin stock'}
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
  }

  return colorMap[colorName] || '#CCCCCC'
}