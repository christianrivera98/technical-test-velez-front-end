import { Separator } from "@/components/ui/separator"
import type { ApiProduct } from "@/types/productsInterface"
import ProductHeader from "./ProductHeader"
import ProductPricing from "./ProductPricing"
import { ProductVariantSelector } from "./product-variant-selector"
import QuantitySelector from "./QuantitySelector"
import AddToCartButton from "./AddToCartButton"
import ProductBenefits from "./ProductBenefits"

interface ProductInfoSectionProps {
  product: ApiProduct
  price: number
  listPrice: number
  discountPercentage: number
  isAvailable: boolean
  selectedColor: string
  selectedSize: string
  quantity: number
  isFavorite: boolean
  isAdded: boolean
  onColorChange: (color: string) => void
  onSizeChange: (size: string) => void
  onQuantityChange: (delta: number) => void
  onToggleFavorite: () => void
  onAddToCart: () => void
}

export default function ProductInfoSection({
  product,
  price,
  listPrice,
  discountPercentage,
  isAvailable,
  selectedColor,
  selectedSize,
  quantity,
  isFavorite,
  isAdded,
  onColorChange,
  onSizeChange,
  onQuantityChange,
  onToggleFavorite,
  onAddToCart,
}: ProductInfoSectionProps) {
  return (
    <div className="space-y-6">
      <ProductHeader
        product={product}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
      />

      <ProductPricing
        price={price}
        listPrice={listPrice}
        discountPercentage={discountPercentage}
      />

      <Separator />

      <ProductVariantSelector
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onColorChange={onColorChange}
        onSizeChange={onSizeChange}
      />

      <QuantitySelector
        quantity={quantity}
        onQuantityChange={onQuantityChange}
      />

      <AddToCartButton
        isAvailable={isAvailable}
        isAdded={isAdded}
        onAddToCart={onAddToCart}
      />

      <ProductBenefits />
    </div>
  )
}