import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AddToCartButtonProps {
  isAvailable: boolean
  isAdded: boolean
  onAddToCart: () => void
}

export default function AddToCartButton({
  isAvailable,
  isAdded,
  onAddToCart,
}: AddToCartButtonProps) {
  return (
    <div className="space-y-3">
      <Button
        onClick={onAddToCart}
        disabled={!isAvailable}
        className={`w-full h-12 text-lg font-medium cursor-pointer active:scale-95 transition-all duration-200 ${
          isAdded 
            ? 'bg-green-600 hover:bg-green-700' 
            : isAvailable
            ? 'bg-black hover:bg-gray-800'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {!isAvailable ? (
          'No disponible'
        ) : isAdded ? (
          <>
            <Check className="w-5 h-5 mr-2" />
            ¡Agregado al carrito!
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5 mr-2" />
            Agregar al carrito
          </>
        )}
      </Button>
    </div>
  )
}