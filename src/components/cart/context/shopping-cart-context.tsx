"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  color?: string
  size?: string
  quantity: number
  // Campos adicionales para tu estructura de producto
  itemId?: string
  brand?: string
  isAvailable?: boolean
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  // Agregamos un timestamp para forzar re-renders
  lastUpdated: number
  isLoaded: boolean // Nuevo campo para controlar la hidratación
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartState }
  | { type: "SET_LOADED" } // Nueva acción

const CART_STORAGE_KEY = "shopping-cart"

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (itemKey: string) => void
  updateQuantity: (itemKey: string, quantity: number) => void
  clearCart: () => void
} | null>(null)

// Función para cargar el carrito desde localStorage (solo en el cliente)
function loadCartFromStorage(): CartState {
  if (typeof window === "undefined") {
    return { items: [], total: 0, itemCount: 0, lastUpdated: Date.now(), isLoaded: false }
  }
  
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (storedCart) {
      const parsed = JSON.parse(storedCart)
      return {
        ...parsed,
        lastUpdated: Date.now(),
        isLoaded: true
      }
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error)
  }
  
  return { items: [], total: 0, itemCount: 0, lastUpdated: Date.now(), isLoaded: true }
}

// Función para guardar el carrito en localStorage (solo en el cliente)
function saveCartToStorage(state: CartState) {
  if (typeof window === "undefined" || !state.isLoaded) return
  
  try {
    // No guardamos isLoaded en localStorage
    const { isLoaded, ...stateToSave } = state
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(stateToSave))
  } catch (error) {
    console.error("Error saving cart to localStorage:", error)
  }
}

// Función para generar clave del item
function generateItemKey(item: CartItem | Omit<CartItem, "quantity">): string {
  return `${item.id}-${item.color || ''}-${item.size || ''}-${item.itemId || ''}`
}

// Función para calcular totales
function calculateTotals(items: CartItem[]): { total: number; itemCount: number } {
  const total = Number(items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2))
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return { total, itemCount }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  console.log('Cart Reducer - Action:', action.type)
  console.log('Cart Reducer - Current State:', state)
  
  let newItems: CartItem[]
  let newState: CartState

  switch (action.type) {
    case "SET_LOADED":
      return { ...state, isLoaded: true }

    case "ADD_ITEM": {
      const itemKey = generateItemKey(action.payload)
      console.log('Adding item with key:', itemKey)
      
      const existingItemIndex = state.items.findIndex(
        (item) => generateItemKey(item) === itemKey
      )

      if (existingItemIndex > -1) {
        // Si el item ya existe, incrementar cantidad
        newItems = state.items.map((item, index) =>
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
        console.log('Item exists, incrementing quantity')
      } else {
        // Si es un item nuevo, agregarlo
        newItems = [...state.items, { ...action.payload, quantity: 1 }]
        console.log('New item added')
      }

      const { total, itemCount } = calculateTotals(newItems)
      newState = { 
        ...state,
        items: newItems, 
        total, 
        itemCount, 
        lastUpdated: Date.now() 
      }
      break
    }

    case "REMOVE_ITEM": {
      console.log('Removing item with key:', action.payload)
      
      newItems = state.items.filter((item) => {
        const itemKey = generateItemKey(item)
        return itemKey !== action.payload
      })

      const { total, itemCount } = calculateTotals(newItems)
      newState = { 
        ...state,
        items: newItems, 
        total, 
        itemCount, 
        lastUpdated: Date.now() 
      }
      break
    }

    case "UPDATE_QUANTITY": {
      console.log('Updating quantity for:', action.payload.id, 'to:', action.payload.quantity)
      
      newItems = state.items
        .map((item) => {
          const itemKey = generateItemKey(item)
          return itemKey === action.payload.id 
            ? { ...item, quantity: Math.max(0, action.payload.quantity) } 
            : item
        })
        .filter((item) => item.quantity > 0) // Eliminar items con cantidad 0

      const { total, itemCount } = calculateTotals(newItems)
      newState = { 
        ...state,
        items: newItems, 
        total, 
        itemCount, 
        lastUpdated: Date.now() 
      }
      break
    }

    case "CLEAR_CART":
      console.log('Clearing cart')
      newState = { 
        ...state,
        items: [], 
        total: 0, 
        itemCount: 0, 
        lastUpdated: Date.now() 
      }
      break

    case "LOAD_CART":
      console.log('Loading cart from storage')
      return {
        ...action.payload,
        lastUpdated: Date.now(),
        isLoaded: true
      }

    default:
      return state
  }

  console.log('Cart Reducer - New State:', newState)
  return newState
}

export function ShoppingCartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    lastUpdated: Date.now(),
    isLoaded: false,
  })

  // Cargar el carrito desde localStorage al montar el componente (solo en el cliente)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = loadCartFromStorage()
      if (savedCart.items.length > 0 || savedCart.isLoaded) {
        dispatch({ type: "LOAD_CART", payload: savedCart })
      } else {
        dispatch({ type: "SET_LOADED" })
      }
    }
  }, [])

  // Guardar en localStorage cada vez que cambie el estado (solo después de cargar)
  useEffect(() => {
    if (state.isLoaded) {
      saveCartToStorage(state)
    }
  }, [state])

  // Log para debugging
  useEffect(() => {
    console.log('Cart State Updated:', state)
  }, [state])

  // Funciones helper con useCallback para evitar recreaciones innecesarias
  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    console.log('addItem called with:', item)
    dispatch({ type: "ADD_ITEM", payload: item })
  }, [])

  const removeItem = useCallback((itemKey: string) => {
    console.log('removeItem called with:', itemKey)
    dispatch({ type: "REMOVE_ITEM", payload: itemKey })
  }, [])

  const updateQuantity = useCallback((itemKey: string, quantity: number) => {
    console.log('updateQuantity called with:', itemKey, quantity)
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: itemKey, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    console.log('clearCart called')
    dispatch({ type: "CLEAR_CART" })
  }, [])

  // Valor del contexto
  const contextValue = {
    state,
    dispatch,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a ShoppingCartProvider")
  }
  return context
}

// Hook personalizado para obtener solo el estado (útil para componentes que solo leen)
export function useCartState() {
  const { state } = useCart()
  return state
}

// Hook personalizado para obtener solo las acciones (útil para componentes que solo escriben)
export function useCartActions() {
  const { addItem, removeItem, updateQuantity, clearCart } = useCart()
  return { addItem, removeItem, updateQuantity, clearCart }
}