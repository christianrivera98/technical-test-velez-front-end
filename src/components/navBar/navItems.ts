// data/navItems.ts
export interface DropdownItem {
  highlights: string[]
  categories: string[]
  image: string
}

export interface NavItem {
  name: string
  dropdown: DropdownItem | null
  isSpecial?: boolean
}

export const navItems: NavItem[] = [
  { name: "Men", dropdown: null },
  {
    name: "Women",
    dropdown: {
      highlights: ["New Arrivals", "Pirarucu", "Sunglasses"],
      categories: ["Ver Todos", "Bijoux", "Bolsas", "Chapéus", "Cintos", "Lenços", "Aroma"],
      image: "/images/dropdown-image.png",
    },
  },
  {
    name: "Accessories",
    dropdown: {
      highlights: ["Bolsas de Cuero", "Joyas Minimalistas", "Sombreros de Verano"],
      categories: ["Carteras", "Bufandas", "Gafas", "Relojes", "Guantes"],
      image: "/placeholder.svg?height=400&width=300",
    },
  },
  { name: "Shoes", dropdown: null },
  { name: "Sale", dropdown: null, isSpecial: true },
]