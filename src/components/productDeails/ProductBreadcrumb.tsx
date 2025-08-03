import { ChevronRight } from "lucide-react"
import type { ApiProduct } from "@/types/productsInterface"

interface ProductBreadcrumbProps {
  product: ApiProduct
}

export default function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
      <span>Inicio</span>
      <ChevronRight className="w-4 h-4" />
      <span>{product.categories?.[0] || "Productos"}</span>
      <ChevronRight className="w-4 h-4" />
      <span className="text-gray-900 font-medium">{product.productName}</span>
    </nav>
  )
}