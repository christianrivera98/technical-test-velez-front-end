import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Product } from "@/types/productsInterface"
import { useCart } from "@/components/cart/context/shopping-cart-context"

export function useProductCard(product: Product, onAddToCart?: (productId: string, itemId: string) => void) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  const router = useRouter()
  const { addItem, state } = useCart()

  const selectedItem = product.items[selectedItemIndex] || product.items[0]
  const mainImage = selectedItem?.images[0]?.imageUrl || "/placeholder.svg?height=400&width=320"

  const hasDiscount = selectedItem && selectedItem.price < selectedItem.listPrice
  const discountPercentage = hasDiscount
    ? Math.round(((selectedItem.listPrice - selectedItem.price) / selectedItem.listPrice) * 100)
    : 0

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (selectedItem && selectedItem.isAvailable) {
      console.log("ProductCard: Adding to cart", selectedItem)

      const cartItem = {
        id: product.productId,
        itemId: selectedItem.itemId,
        name: product.productName,
        price: selectedItem.price,
        image: mainImage,
        color: selectedItem.colors?.[0] || undefined,
        size: selectedItem.sizes?.[0] || undefined,
        brand: product.brand,
        isAvailable: selectedItem.isAvailable,
      }

      console.log("ProductCard: Cart item to add:", cartItem)
      console.log("ProductCard: Current cart state before add:", state)

      try {
        addItem(cartItem)
        if (onAddToCart) {
          onAddToCart(product.productId, selectedItem.itemId)
        }
        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
        console.log("ProductCard: Item added successfully")
      } catch (error) {
        console.error("ProductCard: Error adding item to cart:", error)
      }
    }
  }

  const handleCardClick = (onProductClick: (productId: string) => void) => {
    onProductClick(product.productId)
    router.push(`product-details/${product.productId}`)
  }

  const handleItemChange = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedItemIndex(index)
  }

  return {
    isFavorite,
    selectedItemIndex,
    isAdded,
    selectedItem,
    mainImage,
    hasDiscount,
    discountPercentage,
    handleFavoriteClick,
    handleAddToCart,
    handleCardClick,
    handleItemChange
  }
}