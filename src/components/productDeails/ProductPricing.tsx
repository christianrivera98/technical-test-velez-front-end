interface ProductPricingProps {
  price: number
  listPrice: number
  discountPercentage: number
}

export default function ProductPricing({
  price,
  listPrice,
  discountPercentage,
}: ProductPricingProps) {
  return (
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
  )
}