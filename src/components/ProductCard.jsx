import { useState } from 'react'
import { useCart } from '../context/CartContext'

const badgeColors = {
  Bestseller: 'bg-red-600',
  Premium:    'bg-purple-700',
  New:        'bg-green-600',
  Trending:   'bg-blue-600',
  Popular:    'bg-rose-600',
}

export default function ProductCard({ product }) {
  const { addToCart, removeFromCart, cart } = useCart()
  const [added, setAdded]   = useState(false)

  const inCart = cart.some(i => i.id === product.id)

  const handleSelect = () => {
    if (inCart) {
      removeFromCart(product.id)
    } else {
      addToCart(product)
      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
    }
  }

  return (
    <div className="pcard group">
      {/* Image — full garment visible, white bg */}
      <div className="relative border-b border-gray-100 overflow-hidden aspect-[3/4] w-full">
        <img
          src={product.image}
          alt={product.title}
          onError={e => { if (product.fallback) e.target.src = product.fallback }}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <span className={`absolute top-1.5 left-1.5 text-white text-[8px] sm:text-[9px] font-body font-semibold
            px-1.5 py-0.5 tracking-widest uppercase ${badgeColors[product.badge] || 'bg-cmt-gold'}`}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-2 sm:p-3 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-cmt-navy text-xs sm:text-sm lg:text-base leading-tight mb-1.5">
          {product.title}
        </h3>

        <div className="space-y-[2px] mb-2 sm:mb-3 flex-1">
          <div className="flex items-center justify-between text-[10px] sm:text-xs lg:text-sm">
            <span className="text-gray-400">Stitching Price</span>
            <span className="font-body font-normal text-gray-400">₹{product.stitching.toLocaleString()}/-</span>
          </div>
          {product.fabricFrom > 0 && (
            <div className="flex items-center justify-between text-[10px] sm:text-xs lg:text-sm">
              <span className="text-gray-400">Fabric Starts at</span>
              <span className="font-body font-normal text-gray-400">₹{product.fabricFrom.toLocaleString()}/-</span>
            </div>
          )}
        </div>

        <button
          onClick={handleSelect}
          className={`w-full py-1.5 sm:py-2 font-body font-semibold text-[9px] sm:text-[10px] uppercase tracking-widest
            transition-all duration-200 active:scale-95
            ${
              inCart
                ? 'bg-cmt-gold/10 text-cmt-gold border border-cmt-gold/40 hover:bg-red-50 hover:text-red-600 hover:border-red-300'
                : added
                  ? 'bg-cmt-gold text-white'
                  : 'bg-[#0d1525] text-white hover:bg-cmt-gold'
            }`}
        >
          {inCart ? (
            <span className="flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Selected
            </span>
          ) : added ? (
            <span className="flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Added!
            </span>
          ) : 'Select'}
        </button>
      </div>
    </div>
  )
}
