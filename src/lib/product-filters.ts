import {  Product} from "@/types/productsInterface"


/**
 * Ordena productos según el criterio especificado
 */
export const sortProducts = (products: Product[], sortBy: string):Product[] => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
      case "price-high":
      case "newest":
        return Number.parseInt(b.productId) - Number.parseInt(a.productId)
      case "rating":
        // Mock rating basado en el ID del producto
        return Number.parseInt(b.productId) - Number.parseInt(a.productId)
      default:
        return 0
    }
  })
}



