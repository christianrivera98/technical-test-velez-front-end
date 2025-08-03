import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import {
  ProductFilters,
  SortOption,
  ViewMode,
} from "@/types/productsInterface";

const categories = [
  "todos",
  "bolsos",
  "camisetas",
  "cinturones",
  "manos libres",
];

const defaultFilters: ProductFilters = {
  category: "todos",
  priceRange: [0, 500],
  selectedSizes: [],
  selectedColors: [],
  showOnSale: false,
  showNew: false,
};

export function useProductShowcase() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const {
    products,
    loading,
    error,
    hasMore,
    filters,
    sortOption,
    searchTerm,
    updateFilters,
    updateSort,
    setSearchTerm,
  } = useProducts({
    initialFilters: defaultFilters,
    itemsPerPage: 12,
  });

  // Extraer tallas y colores disponibles de los productos actuales
  const availableOptions = useMemo(() => {
    const sizes = new Set<string>();
    const colors = new Set<string>();

    products.forEach((product) => {
      product.availableSizes.forEach((size) => sizes.add(size));
      product.availableColors.forEach((color) => colors.add(color));
    });

    return {
      sizes: Array.from(sizes).sort((a, b) => {
        // Ordenar tallas numéricamente
        const numA = parseInt(a);
        const numB = parseInt(b);
        if (!isNaN(numA) && !isNaN(numB)) {
          return numA - numB;
        }
        return a.localeCompare(b);
      }),
      colors: Array.from(colors).sort(),
    };
  }, [products]);

  const handleCategoryChange = (category: string) => {
    updateFilters({ category });
  };

  const handleSortChange = (sort: SortOption) => {
    updateSort(sort);
  };

  const handleAddToCart = () => {};

  const handleProductClick = () => {};

  // Función para limpiar filtros individuales
  const clearFilter = (filterType: keyof ProductFilters, value?: string) => {
    switch (filterType) {
      case "category":
        updateFilters({ category: "todos" });
        break;
      case "selectedSizes":
        if (value && filters?.selectedSizes) {
          updateFilters({
            selectedSizes: filters.selectedSizes.filter(
              (size) => size !== value
            ),
          });
        }
        break;
      case "selectedColors":
        if (value && filters?.selectedColors) {
          updateFilters({
            selectedColors: filters.selectedColors.filter(
              (color) => color !== value
            ),
          });
        }
        break;
      case "showOnSale":
        updateFilters({ showOnSale: false });
        break;
      case "showNew":
        updateFilters({ showNew: false });
        break;
    }
  };

  return {
    // State
    viewMode,
    setViewMode,
    products,
    loading,
    error,
    hasMore,
    filters,
    sortOption,
    searchTerm,
    availableOptions,
    categories,
    
    // Actions
    updateFilters,
    updateSort,
    setSearchTerm,
    handleCategoryChange,
    handleSortChange,
    handleAddToCart,
    handleProductClick,
    clearFilter,
  };
}