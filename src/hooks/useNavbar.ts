"use client"

import { useCart } from "@/components/cart/context/shopping-cart-context"
import { useState, useEffect } from "react"

export const useNavbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { state } = useCart()
  const [cartAnimation, setCartAnimation] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDropdownEnter = (dropdownName: string) => {
    setActiveDropdown(dropdownName)
  }

  const handleDropdownLeave = () => {
    setActiveDropdown(null)
  }

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }


  return {
    // State
    isSearchFocused,
    isMobileMenuOpen,
    scrolled,
    activeDropdown,
    cartAnimation,
    isSheetOpen,
    setIsSheetOpen,
    

    //Cart State
    cartState: state,

    // Actions
    setIsSearchFocused,
    setIsMobileMenuOpen,
    handleDropdownEnter,
    handleDropdownLeave,
    handleCartClick,
    toggleMobileMenu,
  }
}
