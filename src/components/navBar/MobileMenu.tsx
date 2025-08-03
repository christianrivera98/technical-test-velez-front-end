// components/navbar/MobileMenu.tsx
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { navItems } from "./navItems"

interface MobileMenuProps {
  isOpen: boolean
}

export default function MobileMenu({ isOpen }: MobileMenuProps) {
  return (
    <div
      className={cn(
        "lg:hidden overflow-hidden transition-all duration-500 ease-out",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
      )}
    >
      <div className="px-8 pb-6 pt-2 border-t border-cream/50">
        {/* Mobile Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-olive-green h-4 w-4" />
            <Input
              placeholder="Buscar productos..."
              className="pl-12 pr-4 py-3 bg-pure-white/20 backdrop-blur-md border-0 rounded-full focus:ring-2 focus:ring-olive-green/50"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href="#"
              className={cn(
                "block px-4 py-3 font-medium rounded-xl hover:bg-cream/50 transition-all duration-300",
                item.isSpecial
                  ? "bg-gradient-to-r from-burnt-orange to-golden text-pure-white font-bold shadow-lg"
                  : "text-dark-green",
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.isSpecial && "🔥 "}
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}