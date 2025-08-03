import { useState, useEffect, useCallback } from "react"
import { productService } from "@/lib/services/productsService"
import { ErrorResponse } from "@/api/errorResponse"
import { ApiProduct } from "@/types/productsInterface";

interface UseProductByIdReturn {
  product: ApiProduct | null;
  loading: boolean;
  error: ErrorResponse | null;
}

export function useProductById(productId: string): UseProductByIdReturn {
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const fetchProduct = useCallback(async () => {
    if(!productId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await productService.getProductById(productId);
      console.log("productbyid response:", response);

      if ('error' in response) {
        setError(response as ErrorResponse);
        setProduct(null);
      } else {
        // Si la respuesta es un array, tomar el primer elemento
        const productData = response as any; // Usar any temporalmente
        
        if (Array.isArray(productData)) {
          // Es un array, tomar el primer producto
          if (productData.length > 0) {
            setProduct(productData[0]);
            console.log("encontré el producto (primer elemento del array):", productData[0]);
          } else {
            setError({
              message: 'No se encontró el producto',
              statusCode: 404,
            });
            setProduct(null);
          }
        } else {
          // Es un objeto único
          setProduct(productData);
          console.log("encontré el producto (objeto único):", productData);
        }
        
        setError(null);
      }
    } catch (err) {
      setError({
        message: 'Error inesperado al obtener los detalles del producto',
        statusCode: 500,
      });
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [productId])

  useEffect(() => {
    if (productId) {
      fetchProduct()
    }
  }, [productId, fetchProduct])

  return {
    product,
    loading,
    error
  };
}