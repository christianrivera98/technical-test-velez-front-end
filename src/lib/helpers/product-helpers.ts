
/**
 * Obtiene el precio más bajo de un producto
 */

import { Product } from "@/types/productsInterface"





/**
 * Obtiene la primera imagen del producto
 */
export const getProductImage = (product: Product): string => {
  return product.items[0]?.images[0]?.imageUrl || "/placeholder.svg?height=400&width=300"
}



/**
 * Obtiene todas las tallas del producto desde las especificaciones SKU
 */

/**
 * Genera un rating mock basado en el ID del producto
 */
export const getProductRating = (product: Product): number => {
  return 4 + (Number.parseInt(product.productId) % 10) / 10
}

/**
 * Genera un número de reviews mock basado en el ID del producto
 */
export const getProductReviews = (product: Product): number => {
  return 50 + Number.parseInt(product.productId) * 23
}

/**
 * Verifica si un producto es nuevo (mock basado en ID)
 */
export const isProductNew = (product: Product): boolean => {
  return Number.parseInt(product.productId) > 2
}

/**
 * Obtiene el color CSS para un nombre de color
 */
export const getColorValue = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    Blanco: "#FFFFFF",
    Negro: "#000000",
    Azul: "#3B82F6",
    "Azul Oscuro": "#1E3A8A",
    Rosa: "#EC4899",
    Gris: "#6B7280",
    Beige: "#D2B48C",
    Marino: "#1E3A8A",
    Verde: "#10B981",
    Marrón: "#92400E",
  }
  return colorMap[colorName] || "#9CA3AF"
}
