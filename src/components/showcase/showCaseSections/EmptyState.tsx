import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <Search className="h-12 w-12 mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No se encontraron productos
      </h3>
      <p className="text-gray-600 mb-4">
        Intenta ajustar tus filtros o términos de búsqueda
      </p>
      <Button
        onClick={onClearFilters}
        className="bg-dark-green hover:bg-olive-green"
      >
        Limpiar filtros
      </Button>
    </div>
  );
}