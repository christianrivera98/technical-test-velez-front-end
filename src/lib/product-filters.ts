import { ProductFilters, ShowcaseProduct } from "@/types/productsInterface"
import { getProductPrice, getProductSizes, getProductColors, isProductOnSale, isProductNew } from "./helpers/product-helpers"

/**
 * Filtra productos basado en los criterios especificados
 */
export const filterProducts = (
  products: ShowcaseProduct[],
  searchTerm: string,
  selectedCategory: string,
  filters: ProductFilters,
): ShowcaseProduct[] => {
  return products.filter((product) => {
    // Filtro por búsqueda
    const matchesSearch =
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro por categoría
    const matchesCategory =
      selectedCategory === "Todos" || product.productName.toLowerCase().includes(selectedCategory.toLowerCase())

    // Filtro por precio
    const productPrice = getProductPrice(product)
    const matchesPrice = productPrice >= filters.priceRange[0] && productPrice <= filters.priceRange[1]

    // Filtro por tallas
    const productSizes = getProductSizes(product)
    const matchesSize =
      filters.selectedSizes.length === 0 || filters.selectedSizes.some((size) => productSizes.includes(size))

    // Filtro por colores
    const productColors = getProductColors(product)
    const matchesColor =
      filters.selectedColors.length === 0 || filters.selectedColors.some((color) => productColors.includes(color))

    // Filtro por ofertas
    const matchesSale = !filters.showOnSale || isProductOnSale(product)

    // Filtro por productos nuevos
    const matchesNew = !filters.showNew || isProductNew(product)

    return matchesSearch && matchesCategory && matchesPrice && matchesSize && matchesColor && matchesSale && matchesNew
  })
}

/**
 * Ordena productos según el criterio especificado
 */
export const sortProducts = (products: ShowcaseProduct[], sortBy: string): ShowcaseProduct[] => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return getProductPrice(a) - getProductPrice(b)
      case "price-high":
        return getProductPrice(b) - getProductPrice(a)
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

/**
 * Extrae todas las tallas únicas de una lista de productos
 */
export const extractAvailableSizes = (products: ShowcaseProduct[]): string[] => {
  const sizes = new Set<string>()
  products.forEach((product) => {
    product.skuSpecifications.forEach((spec) => {
      if (spec.field.name === "Talla") {
        spec.values.forEach((value) => sizes.add(value.name))
      }
    })
  })
  return Array.from(sizes).sort()
}

/**
 * Extrae todos los colores únicos de una lista de productos
 */
export const extractAvailableColors = (products: ShowcaseProduct[]): string[] => {
  const colors = new Set<string>()
  products.forEach((product) => {
    product.skuSpecifications.forEach((spec) => {
      if (spec.field.name === "Color") {
        spec.values.forEach((value) => colors.add(value.name))
      }
    })
  })
  return Array.from(colors).sort()
}
