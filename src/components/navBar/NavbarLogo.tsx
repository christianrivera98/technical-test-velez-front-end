// components/navbar/NavbarLogo.tsx
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavbarLogoProps {
  scrolled: boolean
}

export default function NavbarLogo({ scrolled }: NavbarLogoProps) {
  return (
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
  )
}