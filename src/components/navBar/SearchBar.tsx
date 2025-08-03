"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SearchBarProps {
  isSearchFocused: boolean
  scrolled: boolean
  onSearchFocus: (focused: boolean) => void
}

export default function SearchBar({ isSearchFocused, scrolled, onSearchFocus }: SearchBarProps) {
  return (
    <div className="hidden md:flex items-center">
      <motion.div
        className="relative"
        animate={{
          width: isSearchFocused ? 320 : scrolled ? 256 : 288, // w-80, w-64, w-72
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-cream/50 to-light-gray/50 rounded-full",
            isSearchFocused ? "shadow-xl" : "shadow-md",
          )}
          animate={{
            scale: isSearchFocused ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        ></motion.div>
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
          <motion.div
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-6 h-6 bg-gradient-to-r from-olive-green to-burnt-orange rounded-full flex items-center justify-center">
              <Search className="h-3 w-3 text-pure-white" />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
