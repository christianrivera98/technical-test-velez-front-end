"use client"

import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { ProductFilters } from "@/types/productsInterface"

interface ProductFiltersProps {
  filters: ProductFilters
  availableSizes: string[]
  availableColors: string[]
  onUpdateFilters: (filters: Partial<ProductFilters>) => void
}

export default function ProductFiltersComponent({
  filters,
  availableSizes,
  availableColors,
  onUpdateFilters,
}: ProductFiltersProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="border-cream bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-pure-white">
        <SheetHeader>
          <SheetTitle className="text-dark-green">Filtros</SheetTitle>
          <SheetDescription>Refina tu búsqueda con estos filtros</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Price Range */}
          <div>
            <h3 className="font-medium text-dark-green mb-3">Rango de Precio</h3>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => onUpdateFilters({ priceRange: value as [number, number] })}
              max={300}
              step={10}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-medium text-dark-green mb-3">Tallas</h3>
            <div className="grid grid-cols-3 gap-2">
              {availableSizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={size}
                    checked={filters.selectedSizes.includes(size)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onUpdateFilters({ selectedSizes: [...filters.selectedSizes, size] })
                      } else {
                        onUpdateFilters({ selectedSizes: filters.selectedSizes.filter((s) => s !== size) })
                      }
                    }}
                  />
                  <label htmlFor={size} className="text-sm">
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="font-medium text-dark-green mb-3">Colores</h3>
            <div className="space-y-2">
              {availableColors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={color}
                    checked={filters.selectedColors.includes(color)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onUpdateFilters({ selectedColors: [...filters.selectedColors, color] })
                      } else {
                        onUpdateFilters({ selectedColors: filters.selectedColors.filter((c) => c !== color) })
                      }
                    }}
                  />
                  <label htmlFor={color} className="text-sm">
                    {color}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Special Filters */}
          <div>
            <h3 className="font-medium text-dark-green mb-3">Especiales</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="on-sale"
                  checked={filters.showOnSale}
                  onCheckedChange={(checked) => onUpdateFilters({ showOnSale: !!checked })}
                />
                <label htmlFor="on-sale" className="text-sm">
                  En oferta
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="new"
                  checked={filters.showNew}
                  onCheckedChange={(checked) => onUpdateFilters({ showNew: !!checked })}
                />
                <label htmlFor="new" className="text-sm">
                  Nuevos
                </label>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
