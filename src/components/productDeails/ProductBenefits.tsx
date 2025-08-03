import { Truck, Shield, RotateCcw } from "lucide-react"

export default function ProductBenefits() {
  const benefits = [
    { icon: Truck, text: "Envío gratis" },
    { icon: Shield, text: "Garantía 1 año" },
    { icon: RotateCcw, text: "30 días devolución" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
      {benefits.map((benefit, index) => {
        const Icon = benefit.icon
        return (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <Icon className="w-4 h-4" />
            <span>{benefit.text}</span>
          </div>
        )
      })}
    </div>
  )
}