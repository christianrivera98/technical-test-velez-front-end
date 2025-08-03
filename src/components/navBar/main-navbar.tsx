"use client"

import { Search, Heart, ShoppingCart, Menu, X, Sparkles, Zap, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useNavbar } from "@/hooks/useNavbar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Badge } from "../ui/badge"
import { ShoppingCartSidebar } from "../cart/_components/shopping-cart-sidebar"
import { useCart } from "../cart/context/shopping-cart-context"
import { useState, useEffect } from "react"
import Link from "next/link"

const navItems = [
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

export default function MainNavbar() {
  const {
    isSearchFocused,
    isMobileMenuOpen,
    scrolled,
    activeDropdown,
    setIsSearchFocused,
    setIsMobileMenuOpen,
    handleDropdownEnter,
    handleDropdownLeave,
  } = useNavbar()

  const { state } = useCart()
  const [cartAnimation, setCartAnimation] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // Trigger animation when cart count changes
  useEffect(() => {
    if (state.itemCount > 0) {
      setCartAnimation(true)
      const timer = setTimeout(() => setCartAnimation(false), 300)
      return () => clearTimeout(timer)
    }
  }, [state.itemCount])

  // Log para debugging - IMPORTANTE: Esto te ayudará a ver si el estado se actualiza
  useEffect(() => {
    console.log('MainNavbar - Cart State Updated:', {
      itemCount: state.itemCount,
      total: state.total,
      items: state.items,
      lastUpdated: state.lastUpdated
    })
  }, [state])

  // Función para manejar la apertura del carrito
  const handleCartClick = () => {
    console.log('MainNavbar - Cart clicked, current state:', state)
    setIsSheetOpen(true)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${scrolled ? "py-2" : "py-0"}`}
    >
      <div className={cn("relative transition-all duration-700 ease-out ",
        scrolled ? "max-[w-7xl] mx-auto  px-4 sm:px-6 lg:px-8" : "max-[w-7xl] mx-auto px-0")}
      >
        <div
          className={cn(
            "relative transition-all duration-700 ease-out",
            scrolled
              ? "bg-transparent backdrop-blur-xl shadow-lg rounded-3xl px-4 sm:px-6 lg:px-8 border border-pure-white/10"
              : "bg-transparent backdrop-blur-md shadow-md border border-pure-white/5",
          )}
        >
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-olive-green/20 to-golden/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-burnt-orange/20 to-dark-green/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative flex items-center justify-between px-8 py-4">
            {/* Logo with Morphing Animation */}
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-golden/50 to-burnt-orange/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="flex flex-col">
                <Link href={"/"}>
                <h1
                  className={cn(
                    "font-black bg-gradient-to-r from-dark-green via-olive-green to-burnt-orange bg-clip-text text-sidebar-primary transition-all duration-500",
                    scrolled ? "text-xl" : "text-2xl",
                  )}
                >
                  StyleShop
                </h1>
                
                </Link>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-golden rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-burnt-orange rounded-full animate-pulse delay-200"></div>
                  <div className="w-1 h-1 bg-olive-green rounded-full animate-pulse delay-400"></div>
                </div>
              </div>
            </div>

            {/* Floating Navigation Pills with Dropdown Trigger */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <div
                  key={item.name}
                  onMouseEnter={() => handleDropdownEnter(item.name)}
                  onMouseLeave={handleDropdownLeave}
                  className="relative"
                >
                  <a
                    href="#"
                    className={cn(
                      "relative px-6 py-3 font-medium  transition-all duration-300 hover:bg-cream/50 hover:scale-105 group flex items-center space-x-1",
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
                  {item.dropdown && activeDropdown === item.name && (
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
                          {item.dropdown.highlights.map((link) => (
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
                          {item.dropdown.categories.map((link) => (
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
                          src={item.dropdown.image || "/placeholder.svg"}
                          alt="Dropdown Highlight"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-green/40 to-transparent flex items-end p-4">
                          <span className="text-pure-white font-bold text-xl">Colección Exclusiva</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Morphing Search Bar */}
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
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
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

            {/* Action Buttons with Floating Animation */}
            <div className="flex items-center space-x-3">
              {/* Favorites with Floating Heart */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative w-12 h-12 rounded-full bg-gradient-to-br from-cream/50 to-light-gray/50 hover:from-burnt-orange/20 hover:to-golden/20 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Heart className="h-5 w-5 text-dark-green group-hover:text-burnt-orange transition-colors duration-300" />
                </Button>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-burnt-orange to-golden rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <span className="text-pure-white text-xs font-bold">3</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/20 to-golden/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
              </div>

              {/* Cart with Pulsing Animation */}
              <div className="relative group">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleCartClick}
                      className={`relative text-dark-green hover:text-olive-green hover:bg-olive-green/10 transition-all duration-200 ${
                        cartAnimation ? 'scale-110' : ''
                      }`}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span className="ml-2 hidden sm:inline">Carrito</span>
                      {state.itemCount > 0 && (
                        <Badge
                          variant="destructive"
                          className={`absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-burnt-orange hover:bg-burnt-orange transition-all duration-200 ${
                            cartAnimation ? 'animate-bounce scale-125' : ''
                          }`}
                        >
                          {state.itemCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-lg">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Carrito de Compras
                        {state.itemCount > 0 && (
                          <Badge variant="outline" className="ml-2">
                            {state.itemCount} {state.itemCount === 1 ? 'artículo' : 'artículos'}
                          </Badge>
                        )}
                      </SheetTitle>
                    </SheetHeader>
                    <ShoppingCartSidebar />
                  </SheetContent>
                </Sheet>
              </div>

              {/* Mobile Menu with Morphing Icon */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative w-12 h-12 rounded-full bg-gradient-to-br from-cream/50 to-light-gray/50 hover:from-dark-green/20 hover:to-olive-green/20 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <div className="relative">
                  <Menu
                    className={cn(
                      "h-5 w-5 text-dark-green transition-all duration-300",
                      isMobileMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
                    )}
                  />
                  <X
                    className={cn(
                      "absolute inset-0 h-5 w-5 text-dark-green transition-all duration-300",
                      isMobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
                    )}
                  />
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Menu with Slide Animation */}
          <div
            className={cn(
              "lg:hidden overflow-hidden transition-all duration-500 ease-out",
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
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
        </div>
      </div>
    </header>
  )
}