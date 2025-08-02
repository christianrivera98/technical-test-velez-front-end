import { useState, useEffect } from 'react';
import { Product } from '@/types/productsInterface';
import { ErrorResponse } from '@/api/errorResponse';
import { productService } from '@/lib/services/productsService';

export const useProductDetails = (productId: string | null) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      setError(null);
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await productService.getProductById(productId);
        
        if ('statusCode' in result) {
          setError(result);
          setProduct(null);
        } else {
          setProduct(result.data);
        }
      } catch (err) {
        setError({
          statusCode: 0,
          message: 'Error inesperado al cargar el producto'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};