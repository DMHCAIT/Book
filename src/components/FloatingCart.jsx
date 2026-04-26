import { useState, useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'
import CartDrawer from './CartDrawer'

export default function FloatingCart() {
  const [cartOpen, setCartOpen] = useState(false)
  const [badgePulse, setBadgePulse] = useState(false)
  const { totalCount, cart } = useCart()
  const prevCount = useRef(totalCount)

  useEffect(() => {
    if (totalCount !== prevCount.current) {
      setBadgePulse(true)
      const t = setTimeout(() => setBadgePulse(false), 400)
      prevCount.current = totalCount
      return () => clearTimeout(t)
    }
  }, [totalCount])

  if (totalCount === 0) return null

  const totalPrice = cart.reduce((sum, item) => sum + (item.stitching * item.qty), 0)

  return (
    <>
      {/* Floating Cart Button - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <div className="bg-gradient-to-t from-black/30 to-transparent h-8 pointer-events-none" />
        <button
          onClick={() => setCartOpen(true)}
          className="w-full bg-[#0d1525] text-white py-4 px-4 shadow-2xl border-t-2 border-cmt-gold/40 
                     hover:bg-cmt-navy transition-all duration-200 active:scale-[0.98]"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className={`absolute -top-2 -right-2 bg-cmt-gold text-white text-[10px] 
                                  font-bold rounded-full w-5 h-5 flex items-center justify-center
                                  ${badgePulse ? 'animate-ping' : ''}`}>
                  {totalCount}
                </span>
                {!badgePulse && (
                  <span className="absolute -top-2 -right-2 bg-cmt-gold text-white text-[10px] 
                                   font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalCount}
                  </span>
                )}
              </div>
              <div className="text-left">
                <div className="text-xs text-cmt-gold/80 font-medium">
                  {totalCount} {totalCount === 1 ? 'Item' : 'Items'} Selected
                </div>
                <div className="text-sm font-bold">
                  ₹{totalPrice.toLocaleString()}/-
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-cmt-gold font-semibold text-sm">
              View Cart
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      </div>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
