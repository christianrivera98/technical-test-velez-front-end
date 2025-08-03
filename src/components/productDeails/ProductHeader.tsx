import { Heart, Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ApiProduct } from "@/types/productsInterface"

interface ProductHeaderProps {
  product: ApiProduct
  isFavorite: boolean
  onToggleFavorite: () => void
}

export default function ProductHeader({
  product,
  isFavorite,
  onToggleFavorite,
}: ProductHeaderProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Badge variant="outline" className="text-xs">
          {product.brand}
        </Badge>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFavorite}
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
  )
}