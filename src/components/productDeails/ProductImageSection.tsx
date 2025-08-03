/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge"
import { ImageGallery } from "./image-gallery"
import type { ApiProduct } from "@/types/productsInterface"

interface ProductImageSectionProps {
  product: ApiProduct
  images: any[]
  discountPercentage: number
  isAvailable: boolean
}

export default function ProductImageSection({
  product,
  images,
  discountPercentage,
  isAvailable,
}: ProductImageSectionProps) {
  return (
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
          <Badge className="bg-red-500 hover:bg-red-600 text-white animate-fade-in">-{discountPercentage}%</Badge>
        )}
        {!isAvailable && (
          <Badge className="bg-gray-500 hover:bg-gray-600 text-white animate-fade-in">No disponible</Badge>
        )}
      </div>
    </div>
  )
}
