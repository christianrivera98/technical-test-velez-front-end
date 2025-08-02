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
      console.log('Fetched products result:', result);
  
      
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
        const productsData = result;
        console.log('Products data before processing:', productsData);
        
        let products: Product[] = [];
        let totalProducts = 0;
        
        // Manejo más explícito de la respuesta
        if (Array.isArray(productsData)) {
          console.log('Processing as direct array');
          products = productsData;
          totalProducts = products.length;
        } else if (productsData && typeof productsData === 'object') {
          console.log('Processing as object with products property');
          // Si es un objeto, intentar extraer los productos
          if ('products' in productsData && Array.isArray(productsData.products)) {
            products = productsData.products;
          } else {
            // Si no tiene property 'products', usar el objeto completo si es válido
            console.log('Object does not have products property, treating as single product or invalid');
            products = [];
            totalProducts = 0;
          }
        } else {
          console.log('Invalid data format');
          products = [];
          totalProducts = 0;
        }
        
        console.log('Final processed products:', products);
        console.log('Final total products:', totalProducts);
        
        setState(prev => ({
          ...prev,
          loading: false,
          error: null,
          products: reset ? products : [...prev.products, ...products],
          totalProducts: totalProducts,
          currentPage: page,
          hasMore: products.length === itemsPerPage,
        })); 
        
        console.log('Updated products state:', {
          products, 
          totalProducts, 
          currentPage: page, 
          hasMore: products.length === itemsPerPage
        });
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
  }, [itemsPerPage, filters, sortOption]); 

  const loadMore = useCallback(() => {
    if (!state.loading && state.hasMore) {
      fetchProducts(state.currentPage + 1, false, filters, sortOption);
    }
  }, [state.loading, state.hasMore, state.currentPage, fetchProducts, filters, sortOption]);

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters(prev => prev ? { ...prev, ...newFilters } : newFilters as ProductFilters);
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
      console.log('Auto-fetch triggered by filters/sort change');
      fetchProducts(1, true, filters, sortOption);
    }
  }, [filters, sortOption, searchTerm, autoFetch, fetchProducts]);

  // Initial fetch - solo una vez
  useEffect(() => {
    if (autoFetch && !hasInitialFetched.current) {
      console.log('Initial fetch triggered');
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