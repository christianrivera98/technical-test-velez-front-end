import { useState, useEffect, useCallback, useRef } from 'react';
import { Product, ProductFilters, SortOption, ApiProduct } from '@/types/productsInterface';
import { ErrorResponse } from '@/api/errorResponse';
import { productService } from '@/lib/services/productsService';
import { transformApiProduct } from '@/lib/helpers/transforApiProduct';

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

  // Función para aplicar filtros en el cliente - SIMPLIFICADA
  const applyFilters = useCallback((products: Product[], currentFilters?: ProductFilters, searchTerm?: string): Product[] => {
    let filtered = [...products];

    // Aplicar filtro de búsqueda
    if (searchTerm && searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.productName.toLowerCase().includes(search) ||
        product.brand.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      );
    }

    // Solo aplicar filtro de categoría si está definido y no es "todos"
    if (currentFilters?.category && currentFilters.category !== 'todos') {
      filtered = filtered.filter(product => 
        product.categories.some(cat => 
          cat.toLowerCase().includes(currentFilters.category.toLowerCase())
        )
      );
    }

    return filtered;
  }, []);

  // Función para aplicar ordenamiento
  const applySorting = useCallback((products: Product[], sortOption: SortOption): Product[] => {
    const sorted = [...products];
    
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => a.minPrice - b.minPrice);
      case 'price-high':
        return sorted.sort((a, b) => b.maxPrice - a.maxPrice);
      case 'newest':
        return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'rating':
        // Si tienes un campo de rating, úsalo aquí
        return sorted; // Por ahora sin cambios
      case 'featured':
      default:
        return sorted; // Orden original de la API
    }
  }, []);

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
        let apiProducts: ApiProduct[] = [];
        
        // Manejo de la respuesta de la API
        if (Array.isArray(result)) {
          apiProducts = result;
        } else if (result && typeof result === 'object' && 'products' in result && Array.isArray(result.products)) {
          apiProducts = result.products;
        } else {
          console.log('Invalid data format');
          apiProducts = [];
        }
        
        console.log('API products before transformation:', apiProducts);
        
        // Transformar productos de la API al formato interno
        const transformedProducts = apiProducts.map(transformApiProduct);
        console.log('Transformed products:', transformedProducts);
        
        // Para el primer fetch o cuando no hay filtros específicos, mostrar todos los productos
        let processedProducts = transformedProducts;
        
        // Solo aplicar filtros si hay criterios activos
        const hasActiveFilters = (
          (currentFilters?.category && currentFilters.category !== 'todos') ||
          (searchTerm && searchTerm.trim())
        );

        if (hasActiveFilters) {
          processedProducts = applyFilters(processedProducts, currentFilters || filters, searchTerm);
        }
        
        // Aplicar ordenamiento
        processedProducts = applySorting(processedProducts, currentSort || sortOption);
        
        console.log('Final processed products:', processedProducts);
        
        setState(prev => ({
          ...prev,
          loading: false,
          error: null,
          products: reset ? processedProducts : [...prev.products, ...processedProducts],
          totalProducts: transformedProducts.length, // Total de productos sin filtrar
          currentPage: page,
          hasMore: processedProducts.length === itemsPerPage,
        })); 
        
        console.log('Updated products state:', {
          products: processedProducts, 
          totalProducts: transformedProducts.length, 
          currentPage: page, 
          hasMore: processedProducts.length === itemsPerPage
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
  }, [itemsPerPage, filters, sortOption, applyFilters, applySorting, searchTerm]); 

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
    setFilters({ category: 'todos' });
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