"use client"

import type { Product, ProductItem } from "@/types/productsInterface"
import { Card } from "@/components/ui/card"

interface ProductSpecsProps {
  product: Product
  selectedItem: ProductItem
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  const specs = [
    { label: "Marca", value: product.brand },
    { label: "Categorías", value: product.categories.join(", ") },
    { label: "Colores disponibles", value: product.availableColors.join(", ") || "N/A" },
    { label: "Tallas disponibles", value: product.availableSizes.join(", ") || "N/A" },
    { label: "Precio mínimo", value: `$${product.minPrice.toLocaleString()}` },
    { label: "Precio máximo", value: `$${product.maxPrice.toLocaleString()}` },
    { label: "En oferta", value: product.isOnSale ? "Sí" : "No" },
    { label: "Producto nuevo", value: product.isNew ? "Sí" : "No" },
  ]

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specs.map((spec, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <span className="text-sm font-medium text-gray-700">{spec.label}:</span>
            <span className="text-sm text-gray-900">{spec.value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
