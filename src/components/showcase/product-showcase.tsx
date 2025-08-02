"use client"

import { useState } from "react"
import { Search, Filter, Grid, List, Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

// Mock data for products
const products = [
  {
    id: 1,
    name: "Camisa de Lino Clásica",
    price: 89.99,
    originalPrice: 120.0,
    image: "/placeholder.svg?height=400&width=300",
    category: "Camisas",
    rating: 4.5,
    reviews: 124,
    colors: ["Blanco", "Azul", "Beige"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    isOnSale: true,
  },
  {
    id: 2,
    name: "Vestido Floral Verano",
    price: 65.99,
    originalPrice: null,
    image: "/placeholder.svg?height=400&width=300",
    category: "Vestidos",
    rating: 4.8,
    reviews: 89,
    colors: ["Floral", "Rosa", "Azul"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    isOnSale: false,
  },
  {
    id: 3,
    name: "Jeans Slim Fit",
    price: 79.99,
    originalPrice: 95.0,
    image: "/placeholder.svg?height=400&width=300",
    category: "Pantalones",
    rating: 4.3,
    reviews: 256,
    colors: ["Azul Oscuro", "Negro", "Gris"],
    sizes: ["28", "30", "32", "34", "36"],
    isNew: false,
    isOnSale: true,
  },
  {
    id: 4,
    name: "Blazer Elegante",
    price: 149.99,
    originalPrice: null,
    image: "/placeholder.svg?height=400&width=300",
    category: "Blazers",
    rating: 4.7,
    reviews: 67,
    colors: ["Marino", "Negro", "Gris"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isOnSale: false,
  },
  {
    id: 5,
    name: "Suéter de Punto",
    price: 55.99,
    originalPrice: 75.0,
    image: "/placeholder.svg?height=400&width=300",
    category: "Suéteres",
    rating: 4.4,
    reviews: 143,
    colors: ["Beige", "Gris", "Rosa"],
    sizes: ["XS", "S", "M", "L"],
    isNew: false,
    isOnSale: true,
  },
  {
    id: 6,
    name: "Falda Midi Plisada",
    price: 45.99,
    originalPrice: null,
    image: "/placeholder.svg?height=400&width=300",
    category: "Faldas",
    rating: 4.6,
    reviews: 98,
    colors: ["Negro", "Marino", "Camel"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    isOnSale: false,
  },
  {
    id: 7,
    name: "Chaqueta de Cuero",
    price: 199.99,
    originalPrice: 250.0,
    image: "/placeholder.svg?height=400&width=300",
    category: "Chaquetas",
    rating: 4.9,
    reviews: 45,
    colors: ["Negro", "Marrón"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isOnSale: true,
  },
  {
    id: 8,
    name: "Top Crop Básico",
    price: 25.99,
    originalPrice: null,
    image: "/placeholder.svg?height=400&width=300",
    category: "Tops",
    rating: 4.2,
    reviews: 187,
    colors: ["Blanco", "Negro", "Rosa", "Azul"],
    sizes: ["XS", "S", "M", "L"],
    isNew: false,
    isOnSale: false,
  },
]

const categories = ["Todos", "Camisas", "Vestidos", "Pantalones", "Blazers", "Suéteres", "Faldas", "Chaquetas", "Tops"]
const sizes = ["XS", "S", "M", "L", "XL"]
const colors = ["Blanco", "Negro", "Azul", "Rosa", "Gris", "Beige", "Marino", "Marrón"]

export default function ProductShowcase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [showOnSale, setShowOnSale] = useState(false)
  const [showNew, setShowNew] = useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesSize = selectedSizes.length === 0 || selectedSizes.some((size) => product.sizes.includes(size))
    const matchesColor = selectedColors.length === 0 || selectedColors.some((color) => product.colors.includes(color))
    const matchesSale = !showOnSale || product.isOnSale
    const matchesNew = !showNew || product.isNew

    return matchesSearch && matchesCategory && matchesPrice && matchesSize && matchesColor && matchesSale && matchesNew
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      default:
        return 0
    }
  })

  const ProductCard = ({ product }: { product: (typeof products)[0] }) => (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-pure-white">
      <div className="relative overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && <Badge className="bg-olive-green text-pure-white">Nuevo</Badge>}
          {product.isOnSale && <Badge className="bg-burnt-orange text-pure-white">Oferta</Badge>}
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" variant="secondary" className="h-8 w-8 bg-pure-white/90 hover:bg-pure-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" className="h-8 w-8 bg-dark-green hover:bg-olive-green">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-golden text-golden" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        <h3 className="font-medium text-dark-green mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-lg text-dark-green">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {product.colors.slice(0, 3).map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{
                backgroundColor:
                  color === "Blanco"
                    ? "#FFFFFF"
                    : color === "Negro"
                      ? "#000000"
                      : color === "Azul"
                        ? "#3B82F6"
                        : color === "Rosa"
                          ? "#EC4899"
                          : color === "Gris"
                            ? "#6B7280"
                            : color === "Beige"
                              ? "#D2B48C"
                              : color === "Marino"
                                ? "#1E3A8A"
                                : color === "Marrón"
                                  ? "#92400E"
                                  : "#9CA3AF",
              }}
            />
          ))}
          {product.colors.length > 3 && <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <header className="bg-pure-white shadow-sm border-b border-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-dark-green">StyleShop</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-dark-green hover:text-olive-green transition-colors">
                Mujer
              </a>
              <a href="#" className="text-dark-green hover:text-olive-green transition-colors">
                Hombre
              </a>
              <a href="#" className="text-dark-green hover:text-olive-green transition-colors">
                Niños
              </a>
              <a href="#" className="text-dark-green hover:text-olive-green transition-colors">
                Ofertas
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-pure-white border-cream focus:border-olive-green"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40 bg-pure-white border-cream">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
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
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-dark-green hover:bg-olive-green" : "border-cream"}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-dark-green hover:bg-olive-green" : "border-cream"}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

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
                    <Slider value={priceRange} onValueChange={setPriceRange} max={300} step={10} className="mb-2" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <h3 className="font-medium text-dark-green mb-3">Tallas</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {sizes.map((size) => (
                        <div key={size} className="flex items-center space-x-2">
                          <Checkbox
                            id={size}
                            checked={selectedSizes.includes(size)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedSizes([...selectedSizes, size])
                              } else {
                                setSelectedSizes(selectedSizes.filter((s) => s !== size))
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
                      {colors.map((color) => (
                        <div key={color} className="flex items-center space-x-2">
                          <Checkbox
                            id={color}
                            checked={selectedColors.includes(color)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedColors([...selectedColors, color])
                              } else {
                                setSelectedColors(selectedColors.filter((c) => c !== color))
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
                          checked={showOnSale}
                          onCheckedChange={(checked) => setShowOnSale(checked === true)}
                        />
                        <label htmlFor="on-sale" className="text-sm">
                          En oferta
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="new" checked={showNew} onCheckedChange={(checked) => setShowNew(checked === true)} />
                        <label htmlFor="new" className="text-sm">
                          Nuevos
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Mostrando {sortedProducts.length} de {products.length} productos
          </p>
          <div className="flex gap-2">
            {selectedCategory !== "Todos" && (
              <Badge variant="secondary" className="bg-cream text-dark-green">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("Todos")} className="ml-2 hover:text-burnt-orange">
                  ×
                </button>
              </Badge>
            )}
            {selectedSizes.map((size) => (
              <Badge key={size} variant="secondary" className="bg-cream text-dark-green">
                Talla {size}
                <button
                  onClick={() => setSelectedSizes(selectedSizes.filter((s) => s !== size))}
                  className="ml-2 hover:text-burnt-orange"
                >
                  ×
                </button>
              </Badge>
            ))}
            {selectedColors.map((color) => (
              <Badge key={color} variant="secondary" className="bg-cream text-dark-green">
                {color}
                <button
                  onClick={() => setSelectedColors(selectedColors.filter((c) => c !== color))}
                  className="ml-2 hover:text-burnt-orange"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
          }`}
        >
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600 mb-4">Intenta ajustar tus filtros o términos de búsqueda</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("Todos")
                setSelectedSizes([])
                setSelectedColors([])
                setShowOnSale(false)
                setShowNew(false)
                setPriceRange([0, 300])
              }}
              className="bg-dark-green hover:bg-olive-green"
            >
              Limpiar filtros
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {sortedProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-olive-green text-olive-green hover:bg-olive-green hover:text-pure-white bg-transparent"
            >
              Cargar más productos
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
