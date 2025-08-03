import { Button } from "@/components/ui/button"

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (delta: number) => void
}

export default function QuantitySelector({
  quantity,
  onQuantityChange,
}: QuantitySelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Cantidad</label>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onQuantityChange(-1)}
          disabled={quantity <= 1}
          className="transition-colors duration-200"
        >
          -
        </Button>
        <span className="w-12 text-center font-medium bg-gray-50 px-3 py-2 rounded border">
          {quantity}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onQuantityChange(1)}
          className="transition-colors duration-200"
        >
          +
        </Button>
      </div>
    </div>
  )
}