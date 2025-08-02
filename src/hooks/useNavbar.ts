"use client"

import { useState, useEffect } from "react"

export const useNavbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

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

  return {
    // State
    isSearchFocused,
    isMobileMenuOpen,
    scrolled,
    activeDropdown,

    // Actions
    setIsSearchFocused,
    setIsMobileMenuOpen,
    handleDropdownEnter,
    handleDropdownLeave,
  }
}
