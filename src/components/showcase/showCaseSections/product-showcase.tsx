"use client";

import { useProductShowcase } from "@/hooks/useProductShowcase";
import SearchAndFiltersBar from "./SearchAndFiltersBar";
import ActiveFilters from "./ActiveFilters";
import ProductsGrid from "./ProductsGrid";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

export default function ProductShowcase() {
  const {
    // State
    viewMode,
    setViewMode,
    products,
    loading,
    error,
    filters,
    sortOption,
    searchTerm,
    categories,
    
    // Actions
    setSearchTerm,
    handleCategoryChange,
    handleSortChange,
    handleAddToCart,
    handleProductClick,
    clearFilter,
  } = useProductShowcase();

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchAndFiltersBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={filters?.category || "todos"}
          categories={categories}
          onCategoryChange={handleCategoryChange}
          sortOption={sortOption}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <ActiveFilters
          filters={filters}
          loading={loading}
          productsCount={products.length}
          onClearFilter={clearFilter}
        />

        {loading && products.length === 0 ? (
          <LoadingState />
        ) :  (
          <>
            <ProductsGrid
              products={products}
              viewMode={viewMode}
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick}
            />
          </>
        )}
      </div>
    </div>
  );
}