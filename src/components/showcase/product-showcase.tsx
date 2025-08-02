"use client"

import { useState } from "react"
import { Search, Filter, Grid, List, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProducts } from "@/hooks/useProducts"
import { ProductFilters, SortOption, ViewMode } from "@/types/productsInterface"
import ProductFiltersComponent from "./product-filters"
import ProductCard from "./product-card"

// Datos estáticos para filtros (estos podrían venir de tu API también)
const categories = ["todos", "tenis", "zapatos", "sandalias", "botas"]
const availableSizes = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"]
const availableColors = ["Negro", "Blanco", "Azul", "Rojo", "Verde", "Amarillo", "Rosa", "Gris", "Marrón"]

const defaultFilters: ProductFilters = {
  category: "todos",
  priceRange: [0, 500],
  selectedSizes: [],
  selectedColors: [],
  showOnSale: false,
  showNew: false,
}

export default function ProductShowcase() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  
  const {
    products,
    loading,
    error,
    hasMore,
    filters,
    sortOption,
    searchTerm,
    loadMore,
    updateFilters,
    updateSort,
    setSearchTerm,
    clearFilters,
  } = useProducts({
    initialFilters: defaultFilters,
    itemsPerPage: 12,
  })

  const handleCategoryChange = (category: string) => {
    updateFilters({ category })
  }

  const handleSortChange = (sort: SortOption) => {
    updateSort(sort)
  }

  const handleAddToCart = (productId: string, itemId: string) => {
    console.log('Agregando al carrito:', { productId, itemId })
    // Implementar lógica del carrito
  }

  const handleToggleFavorite = (productId: string) => {
    console.log('Toggle favorito:', productId)
    // Implementar lógica de favoritos
  }

  const handleProductClick = (productId: string) => {
    console.log('Ver producto:', productId)
    // Navegar a página de detalles del producto
  }

  // Función para limpiar filtros individuales
  const clearFilter = (filterType: keyof ProductFilters, value?: string) => {
    switch (filterType) {
      case 'category':
        updateFilters({ category: 'todos' })
        break
      case 'selectedSizes':
        if (value && filters?.selectedSizes) {
          updateFilters({ 
            selectedSizes: filters.selectedSizes.filter(size => size !== value) 
          })
        }
        break
      case 'selectedColors':
        if (value && filters?.selectedColors) {
          updateFilters({ 
            selectedColors: filters.selectedColors.filter(color => color !== value) 
          })
        }
        break
      case 'showOnSale':
        updateFilters({ showOnSale: false })
        break
      case 'showNew':
        updateFilters({ showNew: false })
        break
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark-green mb-4">Error al cargar productos</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => window.location.reload()} className="bg-dark-green hover:bg-olive-green">
            Reintentar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-pure-white border-cream focus:border-olive-green"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Select value={filters?.category || 'todos'} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-40 bg-pure-white border-cream">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className="w-48 bg-pure-white border-cream">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Destacados</SelectItem>
                <SelectItem value="newest">Más nuevos</SelectItem>
                <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                <SelectItem value="rating">Mejor valorados</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-dark-green hover:bg-olive-green" : "border-cream"}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-dark-green hover:bg-olive-green" : "border-cream"}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {filters && (
              <ProductFiltersComponent
                filters={filters}
                availableSizes={availableSizes}
                availableColors={availableColors}
                onUpdateFilters={updateFilters}
              />
            )}
          </div>
        </div>

        {/* Active Filters */}
        {filters && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {loading ? 'Cargando...' : `Mostrando ${products.length} productos`}
            </p>
            <div className="flex gap-2 flex-wrap">
              {filters.category !== 'todos' && (
                <Badge variant="secondary" className="bg-cream text-dark-green">
                  {filters.category}
                  <button 
                    onClick={() => clearFilter('category')} 
                    className="ml-2 hover:text-burnt-orange"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.selectedSizes.map((size) => (
                <Badge key={size} variant="secondary" className="bg-cream text-dark-green">
                  Talla {size}
                  <button
                    onClick={() => clearFilter('selectedSizes', size)}
                    className="ml-2 hover:text-burnt-orange"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {filters.selectedColors.map((color) => (
                <Badge key={color} variant="secondary" className="bg-cream text-dark-green">
                  {color}
                  <button
                    onClick={() => clearFilter('selectedColors', color)}
                    className="ml-2 hover:text-burnt-orange"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {filters.showOnSale && (
                <Badge variant="secondary" className="bg-cream text-dark-green">
                  En oferta
                  <button
                    onClick={() => clearFilter('showOnSale')}
                    className="ml-2 hover:text-burnt-orange"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.showNew && (
                <Badge variant="secondary" className="bg-cream text-dark-green">
                  Nuevos
                  <button
                    onClick={() => clearFilter('showNew')}
                    className="ml-2 hover:text-burnt-orange"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
          }`}
        >
          {products.map((product) => (
            <ProductCard 
              key={product.productId} 
              product={product}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              onProductClick={handleProductClick}
            />
          ))}
        </div>

        {/* Loading State */}
        {loading && products.length === 0 && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-green"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600 mb-4">Intenta ajustar tus filtros o términos de búsqueda</p>
            <Button
              onClick={clearFilters}
              className="bg-dark-green hover:bg-olive-green"
            >
              Limpiar filtros
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {!loading && products.length > 0 && hasMore && (
          <div className="text-center mt-12">
            <Button
              onClick={loadMore}
              variant="outline"
              className="border-olive-green text-olive-green hover:bg-olive-green hover:text-pure-white bg-transparent"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Cargar más productos'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}