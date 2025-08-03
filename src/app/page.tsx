"use client"

import ProductShowcase from "@/components/showcase/product-showcase"

export default function Home() {

  return (
      <div className="min-h-screen bg-light-gray">
       
        {/* Content with proper top margin to avoid being hidden by fixed navbar */}
        <div>
          <ProductShowcase />
        </div>
      </div>
  )
}