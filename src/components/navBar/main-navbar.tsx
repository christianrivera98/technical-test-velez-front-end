"use client"

import { useNavbar } from "@/hooks/useNavbar"
import { cn } from "@/lib/utils"
import BackgroundOrbs from "./BackgroundOrbs"
import NavbarLogo from "./NavbarLogo"
import DesktopNavigation from "./DesktopNavigation"
import SearchBar from "./SearchBar"
import NavbarActions from "./NavbarActions"
import MobileMenu from "./MobileMenu"

export default function MainNavbar() {
  const {
    // State from useNavbar
    isSearchFocused,
    isMobileMenuOpen,
    scrolled,
    activeDropdown,
    setIsSearchFocused,
    handleDropdownEnter,
    handleDropdownLeave,
    
    // Cart state
    cartState,
    cartAnimation,
    isSheetOpen,
    setIsSheetOpen,
    
    // Actions
    handleCartClick,
    toggleMobileMenu,
  } = useNavbar()

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
          <BackgroundOrbs />

          <div className="relative flex items-center justify-between px-8 py-4">
            <NavbarLogo scrolled={scrolled} />

            <DesktopNavigation
              activeDropdown={activeDropdown}
              onDropdownEnter={handleDropdownEnter}
              onDropdownLeave={handleDropdownLeave}
            />

            <SearchBar
              isSearchFocused={isSearchFocused}
              scrolled={scrolled}
              onSearchFocus={setIsSearchFocused}
            />

            <NavbarActions
              cartState={cartState}
              cartAnimation={cartAnimation}
              isSheetOpen={isSheetOpen}
              setIsSheetOpen={setIsSheetOpen}
              isMobileMenuOpen={isMobileMenuOpen}
              onCartClick={handleCartClick}
              onToggleMobileMenu={toggleMobileMenu}
            />
          </div>

          <MobileMenu isOpen={isMobileMenuOpen} />
        </div>
      </div>
    </header>
  )
}