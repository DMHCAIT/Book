import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'tailor_cart'

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.item.id)
      if (existing) {
        return state.map(i =>
          i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...state, { ...action.item, qty: 1, hasFabric: false }]
    }
    case 'TOGGLE_FABRIC':
      return state.map(i =>
        i.id === action.id ? { ...i, hasFabric: !i.hasFabric } : i
      )
    case 'REMOVE':
      return state.filter(i => i.id !== action.id)
    case 'UPDATE_QTY':
      return state
        .map(i => i.id === action.id ? { ...i, qty: action.qty } : i)
        .filter(i => i.qty > 0)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    [],
    () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
      } catch {
        return []
      }
    }
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart      = item => dispatch({ type: 'ADD', item })
  const removeFromCart = id   => dispatch({ type: 'REMOVE', id })
  const updateQty      = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty })
  const clearCart      = () => dispatch({ type: 'CLEAR' })
  const toggleFabric   = id  => dispatch({ type: 'TOGGLE_FABRIC', id })

  const totalCount  = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice  = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, toggleFabric, totalCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
