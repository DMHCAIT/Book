import { useState } from 'react'
import { useCart } from '../context/CartContext'

const badgeColors = {
  Bestseller: 'bg-amber-500',
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
      <div className="relative bg-[#f7f5f2] border-b border-gray-100 overflow-hidden h-[320px]">
        <img
          src={product.image}
          alt={product.title}
          onError={e => { if (product.fallback) e.target.src = product.fallback }}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <span className={`absolute top-2 left-2 text-white text-[9px] font-body font-semibold
            px-2 py-0.5 tracking-widest uppercase ${badgeColors[product.badge] || 'bg-cmt-gold'}`}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-cmt-navy text-lg leading-tight mb-2">
          {product.title}
        </h3>

        <div className="space-y-[2px] mb-3 flex-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Stitching Price :-</span>
            <span className="font-body font-normal text-gray-400">₹{product.stitching.toLocaleString()}/-</span>
          </div>
          {product.fabricFrom > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Fabric Starts at :-</span>
              <span className="font-body font-normal text-gray-400">₹{product.fabricFrom.toLocaleString()}/-</span>
            </div>
          )}
        </div>

        <button
          onClick={handleSelect}
          className={`w-full py-2 font-body font-semibold text-xs uppercase tracking-widest
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
