// components/navbar/NavigationDropdown.tsx
import { cn } from "@/lib/utils"
import { DropdownItem } from "./navItems"

interface NavigationDropdownProps {
  dropdown: DropdownItem
  isActive: boolean
}

export default function NavigationDropdown({ dropdown, isActive }: NavigationDropdownProps) {
  if (!isActive) return null

  return (
    <div
      className={cn(
        "absolute left-1/2 -translate-x-1/2 mt-4 w-[90vw] max-w-5xl",
        "bg-pure-white/20 backdrop-blur-xl shadow-2xl rounded-3xl border border-pure-white/10",
        "p-8 grid grid-cols-3 gap-8 opacity-0 animate-fade-in-slide-down",
      )}
      style={{ animationFillMode: "forwards", animationDuration: "0.3s" }}
    >
      {/* Destaques Column */}
      <div>
        <h3 className="font-bold text-dark-green text-lg mb-4">Destaques</h3>
        <ul className="space-y-2">
          {dropdown.highlights.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="block text-gray-700 hover:text-olive-green transition-colors text-base font-medium"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Categorias Column */}
      <div>
        <h3 className="font-bold text-dark-green text-lg mb-4">Categorias</h3>
        <ul className="space-y-2">
          {dropdown.categories.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="block text-gray-700 hover:text-olive-green transition-colors text-base"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Image Column */}
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <img
          src={dropdown.image || "/placeholder.svg"}
          alt="Dropdown Highlight"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-green/40 to-transparent flex items-end p-4">
          <span className="text-pure-white font-bold text-xl">Colección Exclusiva</span>
        </div>
      </div>
    </div>
  )
}