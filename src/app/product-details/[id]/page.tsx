"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react"
import { ProductDetailsView } from "@/components/productDeails/product-details-view"
import { useParams } from "next/navigation"
import { useProductById } from "@/hooks/useProductDetails"

interface ProductPageProps {
  productId: string
  onBack?: () => void
}

export default function ProductPage({ onBack }: ProductPageProps) {
  const params = useParams();
  const productId = params?.id as string;
  const { product, loading, error } = useProductById(productId)
  
  console.log("Product ID from params:", productId);
  console.log("Product data:", product);

  // Estado de carga
  if (loading) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
                <p className="text-gray-600">Cargando producto...</p>
              </div>
            </div>
          </div>
        </div>
    )
  }

  // Estado de error
  if (error) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <Card className="p-8 max-w-md w-full text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Error al cargar el producto
                </h2>
                <p className="text-gray-600 mb-6">
                  {error.message}
                </p>
                <div className="flex gap-2 justify-center">
                  {onBack && (
                    <Button
                      variant="outline"
                      onClick={onBack}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Volver
                    </Button>
                  )}
                  <Button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="w-4 h-4" />
                    Reintentar
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
    )
  }

  // Producto no encontrado
  if (!product) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <Card className="p-8 max-w-md w-full text-center">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Producto no encontrado
                </h2>
                <p className="text-gray-600 mb-6">
                  El producto que buscas no existe o no está disponible.
                </p>
                {onBack && (
                  <Button
                    onClick={onBack}
                    className="flex items-center gap-2 mx-auto"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Volver
                  </Button>
                )}
              </Card>
            </div>
          </div>
        </div>
    )
  }

  return (
      <ProductDetailsView product={product} productId={productId} />
  )
}