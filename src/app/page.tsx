"use client"

import MainNavbar from "@/components/navBar/main-navbar"
import ProductShowcase from "@/components/showcase/product-showcase"
import { useState } from "react"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-light-gray">
      <MainNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* Content with proper top margin to avoid being hidden by fixed navbar */}
      <div className="pt-32">
        <ProductShowcase />
      </div>
    </div>
  )
}
