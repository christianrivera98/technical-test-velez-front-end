"use client"

import type { ApiProduct } from "@/types/productsInterface"
import { Button } from "@/components/ui/button"

interface ProductVariantSelectorProps {
  product: ApiProduct
  selectedColor: string
  selectedSize: string
  onColorChange: (color: string) => void
  onSizeChange: (size: string) => void
}

export function ProductVariantSelector({
  product,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}: ProductVariantSelectorProps) {
  
  // Extraer todos los colores únicos de todos los items
  const availableColors = Array.from(
    new Set(
      product.items?.flatMap(item => item.Color || []) || []
    )
  );

  // Extraer todas las tallas únicas de todos los items
  const availableSizes = Array.from(
    new Set(
      product.items?.flatMap(item => item.Talla || []) || []
    )
  );



  return (
    <div className="space-y-6">
      {/* Selector de Color */}
      {availableColors.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Color: <span className="font-normal">{selectedColor || "Selecciona un color"}</span>
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableColors.map((color, idx) => (
              <Button
                key={`${color}-${idx}`}
                variant={selectedColor === color ? "default" : "outline"}
                size="sm"
                onClick={() => onColorChange(color)}
                className="min-w-[80px] capitalize"
              >
                {color}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Selector de Talla */}
      {availableSizes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Talla: <span className="font-normal">{selectedSize || "Selecciona una talla"}</span>
            </label>
            <Button variant="link" size="sm" className="text-xs p-0 h-auto">
              Guía de tallas
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size, idx) => (
              <Button
                key={`${size}-${idx}`}
                variant={selectedSize === size ? "default" : "outline"}
                size="sm"
                onClick={() => onSizeChange(size)}
                className="min-w-[50px] uppercase"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Información de Disponibilidad */}
      {product.items && product.items.length > 0 && (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full bg-green-500`} />
          <span className={`text-sm text-green-600`}>
            En stock
          </span>
        </div>
      )}
    </div>
  )
}