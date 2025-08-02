import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  getProductPrice,
  getProductOriginalPrice,
  isProductOnSale,
  isProductNew,
  getProductImage,
  getProductColors,
  getProductRating,
  getProductReviews,
  getColorValue,
} from "@/lib/helpers/product-helpers"
import { ShowcaseProduct } from "@/types/productsInterface"

interface ProductCardProps {
  product: ShowcaseProduct
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = getProductPrice(product)
  const originalPrice = getProductOriginalPrice(product)
  const isOnSale = isProductOnSale(product)
  const isNew = isProductNew(product)
  const image = getProductImage(product)
  const colors = getProductColors(product)
  const rating = getProductRating(product)
  const reviews = getProductReviews(product)

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-pure-white">
      <div className="relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={product.productName}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && <Badge className="bg-olive-green text-pure-white">Nuevo</Badge>}
          {isOnSale && <Badge className="bg-burnt-orange text-pure-white">Oferta</Badge>}
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" variant="secondary" className="h-8 w-8 bg-pure-white/90 hover:bg-pure-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" className="h-8 w-8 bg-dark-green hover:bg-olive-green">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-golden text-golden" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({reviews})</span>
        </div>
        <div className="mb-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide">{product.brand}</span>
        </div>
        <h3 className="font-medium text-dark-green mb-2 line-clamp-2">{product.productName}</h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-lg text-dark-green">${price.toFixed(2)}</span>
          {originalPrice && <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>}
        </div>
        <div className="flex flex-wrap gap-1">
          {colors.slice(0, 3).map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: getColorValue(color) }}
            />
          ))}
          {colors.length > 3 && <span className="text-xs text-gray-500">+{colors.length - 3}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
