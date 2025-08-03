// hooks/useProductDetails.ts
import { useState, useEffect, useMemo, useCallback } from "react"
import type { ApiProduct } from "@/types/productsInterface"
import { productService } from "@/lib/services/productsService"
import { ErrorResponse } from "@/api/errorResponse"
import { useCart } from "@/components/cart/context/shopping-cart-context";

interface UseProductDetailsReturn {
  product: ApiProduct | null;
  loading: boolean;
  error: ErrorResponse | null;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  isFavorite: boolean;
  isAdded: boolean;
  selectedItemData: any;
  setSelectedColor: (color: string) => void;
  setSelectedSize: (size: string) => void;
  setQuantity: (quantity: number) => void;
  handleAddToCart: () => void;
  handleQuantityChange: (delta: number) => void;
  toggleFavorite: () => void;
  refetchProduct: () => void;
}

export function useProductById(productId: string): UseProductDetailsReturn {
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  
  const { addItem } = useCart();

  const fetchProduct = useCallback(async () => {
    if (!productId) return;

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
        const productData = response as any;
        
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
  }, [productId]);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId, fetchProduct]);

  // Inicializar colores y tallas por defecto cuando se carga el producto
  useEffect(() => {
    if (product && product.items && product.items.length > 0) {
      const firstItem = product.items[0];
      
      // Solo establecer si no hay selección previa
      if (firstItem.Color && firstItem.Color.length > 0 && !selectedColor) {
        setSelectedColor(firstItem.Color[0]);
      }
      if (firstItem.Talla && firstItem.Talla.length > 0 && !selectedSize) {
        setSelectedSize(firstItem.Talla[0]);
      }
    }
  }, [product, selectedColor, selectedSize]);

  // Memoizar el item seleccionado y sus datos
  const selectedItemData = useMemo(() => {
    if (!product || !product.items) return null;

    const selectedItem = product.items.find(item => {
      const hasColor = !selectedColor || (item.Color && item.Color.includes(selectedColor));
      const hasSize = !selectedSize || (item.Talla && item.Talla.includes(selectedSize));
      return hasColor && hasSize;
    }) || product.items[0];

    if (!selectedItem) return null;

    // Calcular precio
    let price = 0;
    let listPrice = 0;
    let isAvailable = true;

    if (selectedItem.sellers && selectedItem.sellers.length > 0) {
      const seller = selectedItem.sellers[0];
      if (seller.commertialOffer) {
        price = seller.commertialOffer.Price || 0;
        listPrice = seller.commertialOffer.ListPrice || 0;
        isAvailable = seller.commertialOffer.IsAvailable || false;
      }
    }

    // Obtener imagen principal
    const mainImage = selectedItem.images && selectedItem.images.length > 0 
      ? selectedItem.images[0].imageUrl 
      : 'sin imagen';

    const discountPercentage = listPrice > price 
      ? Math.round(((listPrice - price) / listPrice) * 100)
      : 0;

    return {
      selectedItem,
      price,
      listPrice,
      isAvailable,
      mainImage,
      discountPercentage,
      images: selectedItem.images || []
    };
  }, [product, selectedColor, selectedSize]);

  const handleAddToCart = () => {
    if (!selectedItemData || !product) return;

    console.log("Agregando al carrito:", {
      product,
      selectedColor,
      selectedSize,
      quantity,
    });

    // Crear el item del carrito
    const cartItem = {
      id: productId,
      itemId: selectedItemData.selectedItem.itemId,
      name: product.productName,
      price: selectedItemData.price,
      image: selectedItemData.mainImage,
      color: selectedColor || undefined,
      size: selectedSize || undefined,
      brand: product.brand,
      isAvailable: selectedItemData.isAvailable
    };

    // Agregar cada cantidad individualmente para manejar correctamente la cantidad
    for (let i = 0; i < quantity; i++) {
      addItem(cartItem);
    }

    // Mostrar feedback visual
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleQuantityChange = (delta: number) => {
    if (delta < 0) {
      setQuantity(Math.max(1, quantity + delta));
    } else {
      setQuantity(quantity + delta);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return {
    product,
    loading,
    error,
    selectedColor,
    selectedSize,
    quantity,
    isFavorite,
    isAdded,
    selectedItemData,
    setSelectedColor,
    setSelectedSize,
    setQuantity,
    handleAddToCart,
    handleQuantityChange,
    toggleFavorite,
    refetchProduct: fetchProduct,
  };
}