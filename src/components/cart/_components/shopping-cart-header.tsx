"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useCart } from "../context/shopping-cart-context"
import { ShoppingCartSidebar } from "./shopping-cart-sidebar"

export function ShoppingCartHeader() {
  const { state } = useCart()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-900">Mi Tienda</h1>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="relative bg-transparent">
              <ShoppingCart className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Carrito</span>
              {state.itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {state.itemCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Carrito de Compras</SheetTitle>
            </SheetHeader>
            <ShoppingCartSidebar />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
