// components/navbar/SearchBar.tsx
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  isSearchFocused: boolean
  scrolled: boolean
  onSearchFocus: (focused: boolean) => void
}

export default function SearchBar({
  isSearchFocused,
  scrolled,
  onSearchFocus,
}: SearchBarProps) {
  return (
    <div className="hidden md:flex items-center">
      <div
        className={cn(
          "relative transition-all duration-500 ease-out",
          isSearchFocused ? "w-80" : scrolled ? "w-64" : "w-72",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-cream/50 to-light-gray/50 rounded-full transition-all duration-300",
            isSearchFocused ? "shadow-xl scale-105" : "shadow-md",
          )}
        ></div>
        <Search
          className={cn(
            "absolute left-4 top-1/2 transform -translate-y-1/2 text-olive-green transition-all duration-300",
            isSearchFocused ? "h-5 w-5 scale-110" : "h-4 w-4",
          )}
        />
        <Input
          placeholder="Descubre tu estilo..."
          onFocus={() => onSearchFocus(true)}
          onBlur={() => onSearchFocus(false)}
          className="relative pl-12 pr-4 py-3 bg-transparent border-0 rounded-full focus:ring-2 focus:ring-olive-green/50 placeholder:text-olive-green/60 text-dark-green font-medium"
        />
        {isSearchFocused && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-6 h-6 bg-gradient-to-r from-olive-green to-burnt-orange rounded-full flex items-center justify-center">
              <Search className="h-3 w-3 text-pure-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}