import { apiClient } from "@/api/apiClient";
import { ApiResponse } from "@/api/apiResponse";
import { handleApiError } from "@/api/errorHandler";
import { ErrorResponse } from "@/api/errorResponse";
import { ProductResponse } from "@/api/response/productsResponse";
import { Product, ProductFilters, SortOption } from "@/types/productsInterface"; 

// Interfaz para la respuesta de productos (vitrina)
// Puede ser un array directo o un objeto con products
type ProductsApiResponse = Product[] | {
  products: Product[];
  totalProducts?: number;
  totalPages?: number;
  currentPage?: number;
};

export const productService = {
  // Get products with pagination, filters, and sorting
  getProducts: async (
    page: number = 1,
    limit: number = 20,
    filters?: ProductFilters,
    sortOption?: SortOption
  ): Promise<ProductResponse | ErrorResponse> => {
    try {
      const params = {
        page,
        limit,
        ...(filters && {
          category: filters.category,
          minPrice: filters.priceRange ? filters.priceRange[0] : undefined,
          maxPrice: filters.priceRange ? filters.priceRange[1] : undefined,
          sizes: filters.selectedSizes.join(','),
          colors: filters.selectedColors.join(','),
          onSale: filters.showOnSale,
          new: filters.showNew,
        }),
        ...(sortOption && { sort: sortOption }),
      };

      const response = await apiClient.get('/products', { params });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get a single product by ID
  getProductById: async (
    productId: string
  ): Promise<ProductResponse | ErrorResponse> => {
    try {
      const response = await apiClient.get<ProductResponse>(`/products/${productId}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};