import { Search, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption, ViewMode } from "@/types/productsInterface";

interface SearchAndFiltersBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function SearchAndFiltersBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  categories,
  onCategoryChange,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
}: SearchAndFiltersBarProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-8">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-pure-white border-cream focus:border-olive-green"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-40 bg-pure-white border-cream">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortOption} onValueChange={onSortChange}>
          <SelectTrigger className="w-48 bg-pure-white border-cream">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Destacados</SelectItem>
            <SelectItem value="newest">Más nuevos</SelectItem>
            <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
            <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
            <SelectItem value="rating">Mejor valorados</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => onViewModeChange("grid")}
            className={
              viewMode === "grid"
                ? "bg-dark-green hover:bg-olive-green"
                : "border-cream"
            }
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => onViewModeChange("list")}
            className={
              viewMode === "list"
                ? "bg-dark-green hover:bg-olive-green"
                : "border-cream"
            }
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}