import { useState, useEffect, useCallback, useRef } from 'react';
import { Product, ProductFilters, SortOption } from '@/types/productsInterface';
import { ErrorResponse } from '@/api/errorResponse';
import { productService } from '@/lib/services/productsService';

interface UseProductsState {
  products: Product[];
  loading: boolean;
  error: ErrorResponse | null;
  totalProducts: number;
  currentPage: number;
  hasMore: boolean;
}

interface UseProductsOptions {
  initialPage?: number;
  itemsPerPage?: number;
  initialFilters?: ProductFilters;
  initialSortOption?: SortOption;
  autoFetch?: boolean;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const {
    initialPage = 1,
    itemsPerPage = 12,
    initialFilters,
    initialSortOption = 'featured',
    autoFetch = true
  } = options;

  const [state, setState] = useState<UseProductsState>({
    products: [],
    loading: false,
    error: null,
    totalProducts: 0,
    currentPage: initialPage,
    hasMore: true,
  });

  const [filters, setFilters] = useState<ProductFilters | undefined>(initialFilters);
  const [sortOption, setSortOption] = useState<SortOption>(initialSortOption);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Ref para evitar el bucle infinito en el primer fetch
  const hasInitialFetched = useRef(false);

  const fetchProducts = useCallback(async (
    page: number = 1,
    reset: boolean = true,
    currentFilters?: ProductFilters,
    currentSort?: SortOption
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await productService.getProducts(
        page,
        itemsPerPage,
        currentFilters || filters,
        currentSort || sortOption
      );
      console.log('Fetched products:', result);
      
      if ('statusCode' in result) {
        // Es un error
        setState(prev => ({
          ...prev,
          loading: false,
          error: result,
          products: reset ? [] : prev.products,
        }));
      } else {
        // Es una respuesta exitosa
        const productsData = result.data;
        
        // Verificar si la respuesta es un array directamente o un objeto con products
        let products: Product[] = [];
        let totalProducts = 0;
        
        if (Array.isArray(productsData)) {
          // Si la respuesta es directamente un array de productos
          products = productsData;
          totalProducts = products.length;
        } else if (productsData && typeof productsData === 'object') {
          // Si la respuesta es un objeto que contiene products
          products = productsData.products || [];
          totalProducts = productsData.totalProducts || products.length;
        }
        
        setState(prev => ({
          ...prev,
          loading: false,
          error: null,
          products: reset ? products : [...prev.products, ...products],
          totalProducts: totalProducts,
          currentPage: page,
          hasMore: products.length === itemsPerPage,
        }));
      }
    } catch (error) {
      console.error('Error in fetchProducts:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: {
          statusCode: 0,
          message: 'Error inesperado al cargar productos'
        },
        products: reset ? [] : prev.products,
      }));
    }
  }, [itemsPerPage]); // SOLO itemsPerPage como dependencia

  const loadMore = useCallback(() => {
    if (!state.loading && state.hasMore) {
      fetchProducts(state.currentPage + 1, false, filters, sortOption);
    }
  }, [state.loading, state.hasMore, state.currentPage, fetchProducts, filters, sortOption]);

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters(prev => prev ? { ...prev, ...newFilters } : undefined);
  }, []);

  const updateSort = useCallback((newSort: SortOption) => {
    setSortOption(newSort);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(undefined);
    setSearchTerm('');
    setSortOption('featured');
  }, []);

  const refetch = useCallback(() => {
    fetchProducts(1, true, filters, sortOption);
  }, [fetchProducts, filters, sortOption]);

  // Auto-fetch cuando cambian los filtros o sort
  useEffect(() => {
    if (autoFetch && hasInitialFetched.current) {
      fetchProducts(1, true, filters, sortOption);
    }
  }, [filters, sortOption, searchTerm, autoFetch, fetchProducts]);

  // Initial fetch - solo una vez
  useEffect(() => {
    if (autoFetch && !hasInitialFetched.current) {
      hasInitialFetched.current = true;
      fetchProducts(1, true, filters, sortOption);
    }
  }, [autoFetch, fetchProducts, filters, sortOption]);

  return {
    // Estado
    products: state.products,
    loading: state.loading,
    error: state.error,
    totalProducts: state.totalProducts,
    hasMore: state.hasMore,
    currentPage: state.currentPage,
    
    // Filtros y ordenamiento
    filters,
    sortOption,
    searchTerm,
    
    // Acciones
    loadMore,
    refetch,
    updateFilters,
    updateSort,
    setSearchTerm,
    clearFilters,
    fetchProducts: (page?: number, reset?: boolean) => fetchProducts(page, reset, filters, sortOption),
  };
};