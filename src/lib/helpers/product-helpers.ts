import { ShowcaseProduct } from "@/types/productsInterface"

/**
 * Obtiene el precio más bajo de un producto
 */
export const getProductPrice = (product: ShowcaseProduct): number => {
  const prices = product.items.map((item) => item.sellers[0]?.commertialOffer?.Price || 0)
  return Math.min(...prices)
}

/**
 * Obtiene el precio original más alto de un producto si hay descuento
 */
export const getProductOriginalPrice = (product: ShowcaseProduct): number | null => {
  const prices = product.items.map((item) => item.sellers[0]?.commertialOffer?.ListPrice || 0)
  const maxPrice = Math.max(...prices)
  const currentPrice = getProductPrice(product)
  return maxPrice > currentPrice ? maxPrice : null
}

/**
 * Verifica si un producto está en oferta
 */
export const isProductOnSale = (product: ShowcaseProduct): boolean => {
  return product.items.some((item) => {
    const offer = item.sellers[0]?.commertialOffer
    return offer && offer.Price < offer.ListPrice
  })
}

/**
 * Obtiene la primera imagen del producto
 */
export const getProductImage = (product: ShowcaseProduct): string => {
  return product.items[0]?.images[0]?.imageUrl || "/placeholder.svg?height=400&width=300"
}

/**
 * Obtiene todos los colores del producto desde las especificaciones SKU
 */
export const getProductColors = (product: ShowcaseProduct): string[] => {
  const colorSpec = product.skuSpecifications.find((spec) => spec.field.name === "Color")
  return colorSpec?.values.map((value) => value.name) || []
}

/**
 * Obtiene todas las tallas del producto desde las especificaciones SKU
 */
export const getProductSizes = (product: ShowcaseProduct): string[] => {
  const sizeSpec = product.skuSpecifications.find((spec) => spec.field.name === "Talla")
  return sizeSpec?.values.map((value) => value.name) || []
}

/**
 * Genera un rating mock basado en el ID del producto
 */
export const getProductRating = (product: ShowcaseProduct): number => {
  return 4 + (Number.parseInt(product.productId) % 10) / 10
}

/**
 * Genera un número de reviews mock basado en el ID del producto
 */
export const getProductReviews = (product: ShowcaseProduct): number => {
  return 50 + Number.parseInt(product.productId) * 23
}

/**
 * Verifica si un producto es nuevo (mock basado en ID)
 */
export const isProductNew = (product: ShowcaseProduct): boolean => {
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
