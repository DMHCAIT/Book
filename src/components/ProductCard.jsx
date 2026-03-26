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
  const { addToCart, cart } = useCart()
  const [added, setAdded]   = useState(false)

  const inCart = cart.some(i => i.id === product.id)

  const handleSelect = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="pcard group">
      {/* Image — full garment visible, white bg */}
      <div className="relative bg-[#f7f5f2] border-b border-gray-100" style={{ aspectRatio: '3/4' }}>
        <img
          src={product.image}
          alt={product.title}
          onError={e => { if (product.fallback) e.target.src = product.fallback }}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
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
        <h3 className="font-heading font-semibold text-cmt-navy text-sm leading-tight mb-2 min-h-[2.2rem]">
          {product.title}
        </h3>

        <div className="space-y-0.5 mb-3 flex-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Stitching</span>
            <span className="font-body font-bold text-cmt-navy">₹{product.stitching.toLocaleString()}/-</span>
          </div>
          {product.fabricFrom > 0 && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Fabric from</span>
              <span className="font-body font-semibold text-gray-500">₹{product.fabricFrom.toLocaleString()}/-</span>
            </div>
          )}
        </div>

        <button
          onClick={handleSelect}
          disabled={inCart}
          className={`w-full py-2 font-body font-semibold text-[11px] uppercase tracking-widest
            transition-all duration-200 active:scale-95
            ${
              inCart
                ? 'bg-cmt-gold/10 text-cmt-gold border border-cmt-gold/40 cursor-default'
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
