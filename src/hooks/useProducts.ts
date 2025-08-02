"use client"

import { useState, useMemo } from "react"
import { filterProducts, sortProducts, extractAvailableSizes, extractAvailableColors } from "@/lib/product-filters"
import { ProductFilters, SortOption } from "@/types/productsInterface"
import { mockProducts } from "@/api/mockData"

interface UseProductsProps {
  searchTerm: string
  selectedCategory: string
}

export const useProducts = ({ searchTerm, selectedCategory }: UseProductsProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [filters, setFilters] = useState<ProductFilters>({
    category: "Todos",
    priceRange: [0, 300],
    selectedSizes: [],
    selectedColors: [],
    showOnSale: false,
    showNew: false,
  })

  // Extraer tallas y colores disponibles
  const availableSizes = useMemo(() => extractAvailableSizes(mockProducts), [])
  const availableColors = useMemo(() => extractAvailableColors(mockProducts), [])

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    return filterProducts(mockProducts, searchTerm, selectedCategory, filters)
  }, [searchTerm, selectedCategory, filters])

  // Ordenar productos
  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortBy)
  }, [filteredProducts, sortBy])

  // Función para actualizar filtros
  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  // Función para limpiar filtros
  const clearFilters = () => {
    setFilters({
      category: "Todos",
      priceRange: [0, 300],
      selectedSizes: [],
      selectedColors: [],
      showOnSale: false,
      showNew: false,
    })
  }

  return {
    // Data
    products: mockProducts,
    filteredProducts,
    sortedProducts,
    availableSizes,
    availableColors,

    // State
    sortBy,
    filters,

    // Actions
    setSortBy,
    updateFilters,
    clearFilters,
  }
}
