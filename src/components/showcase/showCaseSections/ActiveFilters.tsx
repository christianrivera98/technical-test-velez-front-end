// components/ActiveFilters.tsx
import { Badge } from "@/components/ui/badge";
import { ProductFilters } from "@/types/productsInterface";

interface ActiveFiltersProps {
  filters?: ProductFilters | null;
  loading: boolean;
  productsCount: number;
  onClearFilter: (filterType: keyof ProductFilters, value?: string) => void;
}

export default function ActiveFilters({
  filters,
  loading,
  productsCount,
  onClearFilter,
}: ActiveFiltersProps) {
  if (!filters) return null;

  const hasActiveFilters = 
    filters.category !== "todos" ||
    filters.selectedSizes.length > 0 ||
    filters.selectedColors.length > 0 ||
    filters.showOnSale ||
    filters.showNew;

  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-gray-600">
        {loading ? "Cargando..." : `Mostrando ${productsCount} productos`}
      </p>
      
      {hasActiveFilters && (
        <div className="flex gap-2 flex-wrap">
          {filters.category !== "todos" && (
            <Badge variant="secondary" className="bg-cream text-dark-green">
              {filters.category}
              <button
                onClick={() => onClearFilter("category")}
                className="ml-2 hover:text-burnt-orange"
              >
                ×
              </button>
            </Badge>
          )}
          
          {filters.selectedSizes.map((size) => (
            <Badge
              key={size}
              variant="secondary"
              className="bg-cream text-dark-green"
            >
              Talla {size}
              <button
                onClick={() => onClearFilter("selectedSizes", size)}
                className="ml-2 hover:text-burnt-orange"
              >
                ×
              </button>
            </Badge>
          ))}
          
          {filters.selectedColors.map((color) => (
            <Badge
              key={color}
              variant="secondary"
              className="bg-cream text-dark-green"
            >
              {color}
              <button
                onClick={() => onClearFilter("selectedColors", color)}
                className="ml-2 hover:text-burnt-orange"
              >
                ×
              </button>
            </Badge>
          ))}
          
          {filters.showOnSale && (
            <Badge variant="secondary" className="bg-cream text-dark-green">
              En oferta
              <button
                onClick={() => onClearFilter("showOnSale")}
                className="ml-2 hover:text-burnt-orange"
              >
                ×
              </button>
            </Badge>
          )}
          
          {filters.showNew && (
            <Badge variant="secondary" className="bg-cream text-dark-green">
              Nuevos
              <button
                onClick={() => onClearFilter("showNew")}
                className="ml-2 hover:text-burnt-orange"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}