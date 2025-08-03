/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCartSidebar } from "../cart/_components/shopping-cart-sidebar"
import { cn } from "@/lib/utils"

interface NavbarActionsProps {
  cartState: any
  cartAnimation: boolean
  isSheetOpen: boolean
  setIsSheetOpen: (open: boolean) => void
  isMobileMenuOpen: boolean
  onCartClick: () => void
  onToggleMobileMenu: () => void
}

export default function NavbarActions({
  cartState,
  cartAnimation,
  isSheetOpen,
  setIsSheetOpen,
  isMobileMenuOpen,
  onCartClick,
  onToggleMobileMenu,
}: NavbarActionsProps) {
  return (
    <div className="flex items-center space-x-3">
      {/* Cart with Pulsing Animation */}
      <div className="relative group">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onCartClick}
              className={`relative text-dark-green cursor-pointer hover:scale-95 hover:text-olive-green hover:bg-olive-green/10 transition-all duration-200 ${
                cartAnimation ? 'scale-110' : ''
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Carrito</span>
              {cartState.itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className={`absolute -top-2 -right-2 h-5 w-5 flex  text-primary items-center justify-center p-0 text-xs bg-burnt-orange hover:bg-burnt-orange transition-all duration-200 ${
                    cartAnimation ? 'animate-bounce scale-125' : ''
                  }`}
                >
                  {cartState.itemCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Carrito de Compras
                {cartState.itemCount > 0 && (
                  <Badge variant="outline" className="ml-2">
                    {cartState.itemCount} {cartState.itemCount === 1 ? 'artículo' : 'artículos'}
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
        onClick={onToggleMobileMenu}
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
  )
}