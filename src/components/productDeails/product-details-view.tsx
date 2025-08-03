"use client"

import { useState, useEffect, useMemo } from "react"
import type { ApiProduct } from "@/types/productsInterface"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Share2, ShoppingCart, Star, Truck, Shield, RotateCcw, ChevronRight, Check } from "lucide-react"
import { ImageGallery } from "./image-gallery"
import { ProductVariantSelector } from "./product-variant-selector"
import { useCart } from "../cart/context/shopping-cart-context"

interface ProductDetailsViewProps {
  product: ApiProduct;
  productId: string;
}

export function ProductDetailsView({ product, productId }: ProductDetailsViewProps) {
  
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const { addItem } = useCart()

  console.log("Datos en ProductDetailsView:", product);

  // Inicializar colores y tallas por defecto
  useEffect(() => {
    if (product.items && product.items.length > 0) {
      const firstItem = product.items[0];
      if (firstItem.Color && firstItem.Color.length > 0 && !selectedColor) {
        setSelectedColor(firstItem.Color[0]);
      }
      if (firstItem.Talla && firstItem.Talla.length > 0 && !selectedSize) {
        setSelectedSize(firstItem.Talla[0]);
      }
    }
  }, [product, selectedColor, selectedSize]);

  // Memoizar el item seleccionado y sus datos
  const selectedItemData = useMemo(() => {
    const selectedItem = product.items?.find(item => {
      const hasColor = !selectedColor || (item.Color && item.Color.includes(selectedColor))
      const hasSize = !selectedSize || (item.Talla && item.Talla.includes(selectedSize))
      return hasColor && hasSize
    }) || product.items?.[0]

    if (!selectedItem) return null

    // Calcular precio
    let price = 0;
    let listPrice = 0;
    let isAvailable = true;

    if (selectedItem.sellers && selectedItem.sellers.length > 0) {
      const seller = selectedItem.sellers[0];
      if (seller.commertialOffer) {
        price = seller.commertialOffer.Price || 0;
        listPrice = seller.commertialOffer.ListPrice || 0;
        isAvailable = seller.commertialOffer.IsAvailable || false;
      }
    }

    // Obtener imagen principal
    const mainImage = selectedItem.images && selectedItem.images.length > 0 
      ? selectedItem.images[0].imageUrl 
      : '/placeholder-image.jpg'

    const discountPercentage = listPrice > price 
      ? Math.round(((listPrice - price) / listPrice) * 100)
      : 0;

    return {
      selectedItem,
      price,
      listPrice,
      isAvailable,
      mainImage,
      discountPercentage,
      images: selectedItem.images || []
    }
  }, [product, selectedColor, selectedSize])

  const handleAddToCart = () => {
    if (!selectedItemData) return

    console.log("Agregando al carrito:", {
      product,
      selectedColor,
      selectedSize,
      quantity,
    })

    // Crear el item del carrito
    const cartItem = {
      id: productId,
      itemId: selectedItemData.selectedItem.itemId,
      name: product.productName,
      price: selectedItemData.price,
      image: selectedItemData.mainImage,
      color: selectedColor || undefined,
      size: selectedSize || undefined,
      brand: product.brand,
      isAvailable: selectedItemData.isAvailable
    }

    // Agregar cada cantidad individualmente para manejar correctamente la cantidad
    for (let i = 0; i < quantity; i++) {
      addItem(cartItem)
    }

    // Mostrar feedback visual
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  // Si no hay datos del item seleccionado, mostrar un estado de carga
  if (!selectedItemData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-500">Cargando producto...</p>
        </div>
      </div>
    )
  }

  const { price, listPrice, isAvailable, images, discountPercentage } = selectedItemData

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <span>Inicio</span>
          <ChevronRight className="w-4 h-4" />
          <span>{product.categories?.[0] || "Productos"}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{product.productName}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galería de Imágenes */}
          <div className="space-y-4 relative">
            {images.length > 0 ? (
              <ImageGallery images={images} productName={product.productName} />
            ) : (
              <div className="bg-gray-200 aspect-square rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Sin imágenes disponibles</p>
              </div>
            )}

            {/* Badges flotantes */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {discountPercentage > 0 && (
                <Badge className="bg-red-500 hover:bg-red-600 text-white">
                  -{discountPercentage}%
                </Badge>
              )}
              {!isAvailable && (
                <Badge className="bg-gray-500 hover:bg-gray-600 text-white">
                  No disponible
                </Badge>
              )}
            </div>
          </div>

          {/* Información del Producto */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {product.brand}
                </Badge>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.productName}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.5) • 128 reseñas</span>
              </div>
            </div>

            {/* Precio */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ${price > 0 ? price.toLocaleString() : "Consultar precio"}
                </span>
                {listPrice > price && (
                  <span className="text-xl text-gray-500 line-through">
                    ${listPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discountPercentage > 0 && (
                <p className="text-green-600 font-medium">
                  Ahorras ${(listPrice - price).toLocaleString()} ({discountPercentage}%)
                </p>
              )}
            </div>

            <Separator />

            {/* Selector de Variantes */}
            <ProductVariantSelector
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              onColorChange={setSelectedColor}
              onSizeChange={setSelectedSize}
            />

            {/* Cantidad */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Cantidad</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="transition-colors duration-200"
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium bg-gray-50 px-3 py-2 rounded border">
                  {quantity}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setQuantity(quantity + 1)}
                  className="transition-colors duration-200"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className={`w-full h-12 text-lg font-medium cursor-pointer active:scale-95 transition-all duration-200 ${
                  isAdded 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : isAvailable
                    ? 'bg-black hover:bg-gray-800'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {!isAvailable ? (
                  'No disponible'
                ) : isAdded ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    ¡Agregado al carrito!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Agregar al carrito
                  </>
                )}
              </Button>
            </div>

            {/* Beneficios */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-4 h-4" />
                <span>Envío gratis</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Garantía 1 año</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <RotateCcw className="w-4 h-4" />
                <span>30 días devolución</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de Información Adicional */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Descripción</TabsTrigger>
              <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  {product.description || "Descripción no disponible para este producto."}
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card className="p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Especificaciones del Producto</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.brand && (
                      <div className="flex justify-between">
                        <span className="font-medium">Marca:</span>
                        <span>{product.brand}</span>
                      </div>
                    )}
                    {product.categories && product.categories.length > 0 && (
                      <div className="flex justify-between">
                        <span className="font-medium">Categoría:</span>
                        <span>{product.categories[0]}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card className="p-6">
                <p className="text-gray-500 text-center py-8">Las reseñas se cargarán próximamente.</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}