/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/shopping-cart-context";
import { toast } from "sonner";

export function ShoppingCartSidebar() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  // Función para generar la clave del item (debe coincidir con el contexto)
  const generateItemKey = (item: any) =>
    `${item.id}-${item.color || ""}-${item.size || ""}-${item.itemId || ""}`;

  // Memoizar la lista de items para evitar re-renders innecesarios
  const cartItems = useMemo(() => {
    return state.items.map((item) => ({
      ...item,
      key: generateItemKey(item),
    }));
  }, [state.items]);

  const handleRemoveItem = (itemKey: string) => {
    removeItem(itemKey);
  };

  const handleUpdateQuantity = (itemKey: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemKey);
    } else {
      updateQuantity(itemKey, newQuantity);
    }
  };

  const handleClearCart = () => {
    clearCart();
  };
  const onFinishCheckout = () => {
    clearCart();
    toast.success("¡Compra finalizada con éxito!", {
      description: `Se procesaron ${
        state.itemCount
      } artículos por $${state.total.toFixed(2)}`,
      duration: 4000,
    });
  };
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <ShoppingCart className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Tu carrito está vacío
        </h3>
        <p className="text-gray-500">Agrega algunos productos para comenzar</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[90vh]">
      <div className="flex-1 overflow-y-auto py-4">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.key}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100"
            >
              <div className="flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {item.name}
                </h4>
                <div className="text-xs text-gray-500 space-y-1">
                  {item.color && <p>Color: {item.color}</p>}
                  {item.size && <p>Talla: {item.size}</p>}
                  {item.brand && <p>Marca: {item.brand}</p>}
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${item.price.toFixed(2)} × {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveItem(item.key)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
                  title="Eliminar producto"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateQuantity(item.key, item.quantity - 1)
                    }
                    className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors duration-200"
                    disabled={item.quantity <= 1}
                    title="Disminuir cantidad"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium bg-white px-2 py-1 rounded border">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateQuantity(item.key, item.quantity + 1)
                    }
                    className="h-8 w-8 p-0 hover:bg-gray-100 transition-colors duration-200"
                    title="Aumentar cantidad"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t p-4 space-y-4 bg-white">
        <div className="flex justify-between items-center">
          <span className="text-base font-medium text-gray-900">
            Total ({state.itemCount}{" "}
            {state.itemCount === 1 ? "artículo" : "artículos"}):
          </span>
          <span className="text-xl font-bold text-gray-900">
            ${state.total.toFixed(2)}
          </span>
        </div>

        <Separator />

        <div className="space-y-2">
          <Button
            onClick={onFinishCheckout}
            className="w-full cursor-pointer hover:scale-95 active:scale-100 active:"
            size="lg"
          >
            Finalizar Compra
          </Button>
          <Button
            variant="outline"
            className="w-full bg-transparent hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
            onClick={handleClearCart}
          >
            Vaciar Carrito
          </Button>
        </div>
      </div>
    </div>
  );
}
