// components/navbar/DesktopNavigation.tsx
import { Zap, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import NavigationDropdown from "./NavigationDropdown"
import { navItems } from "./navItems"

interface DesktopNavigationProps {
  activeDropdown: string | null
  onDropdownEnter: (name: string) => void
  onDropdownLeave: () => void
}

export default function DesktopNavigation({
  activeDropdown,
  onDropdownEnter,
  onDropdownLeave,
}: DesktopNavigationProps) {
  return (
    <nav className="hidden lg:flex items-center space-x-2">
      {navItems.map((item, index) => (
        <div
          key={item.name}
          onMouseEnter={() => onDropdownEnter(item.name)}
          onMouseLeave={onDropdownLeave}
          className="relative"
        >
          <a
            href="#"
            className={cn(
              "relative px-6 py-3 font-medium transition-all duration-300 hover:bg-cream/50 hover:scale-105 group flex items-center space-x-1",
              item.isSpecial
                ? "bg-gradient-to-r from-burnt-orange to-golden text-pure-white font-bold"
                : "text-dark-green",
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {item.isSpecial && <Zap className="h-4 w-4" />}
            <span className="relative z-10">{item.name}</span>
            {item.dropdown && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 ml-1 transition-transform duration-300",
                  activeDropdown === item.name ? "rotate-180" : "rotate-0",
                )}
              />
            )}
            {!item.isSpecial && (
              <div className="absolute inset-0 bg-gradient-to-r from-olive-green/0 via-olive-green/10 to-olive-green/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
          </a>

          {/* Dropdown Content */}
          {item.dropdown && (
            <NavigationDropdown
              dropdown={item.dropdown}
              isActive={activeDropdown === item.name}
            />
          )}
        </div>
      ))}
    </nav>
  )
}