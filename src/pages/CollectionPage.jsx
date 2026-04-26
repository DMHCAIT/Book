import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'

export default function CollectionPage({ title, subtitle, products, heroImage, heroFallback }) {
  const [activeTab, setActiveTab] = useState('All Item')
  const { cart, totalCount, totalPrice, removeFromCart, setFabric } = useCart()
  const navigate = useNavigate()

  const tabs = ['All Item', ...new Set(products.map(p => p.subcategory))]
  const visible = activeTab === 'All Item'
    ? products
    : products.filter(p => p.subcategory === activeTab)

  const hasItems = cart.length > 0

  return (
    <main className="page-fade">
      {/* Page Banner */}
      <div
        className="relative h-52 md:h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('${heroImage}')` }}
      >
        <div className="absolute inset-0 bg-cmt-navyDark/70" />
        <div className="relative z-10 text-center px-4">
          <p className="text-cmt-gold font-heading font-semibold text-xs uppercase tracking-widest mb-2">
            {subtitle}
          </p>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-white uppercase tracking-wide">
            {title}
          </h1>
          <div className="w-12 h-0.5 bg-cmt-gold mx-auto mt-3" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-cmt-cream border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-gray-500 font-heading">
          <button onClick={() => navigate('/')} className="hover:text-cmt-navy transition-colors">Home</button>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-cmt-navy font-semibold">{title}</span>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className={hasItems ? 'lg:flex lg:gap-12 lg:items-start' : ''}>

          {/* ── Left: product area ── */}
          <div className="flex-1 min-w-0">
            {/* Section heading */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-cmt-gold rounded" />
              <div>
                <h2 className="sec-heading">SELECT YOUR ITEM</h2>
                <p className="text-gray-400 text-xs mt-0.5">{visible.length} items available</p>
              </div>
            </div>

            {/* Tab bar */}
            <div className="sticky top-[70px] z-30 bg-white flex flex-wrap gap-2 mb-8 py-3 border-b border-gray-200 shadow-sm">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cat-tab ${activeTab === tab ? 'cat-tab-active' : 'cat-tab-inactive'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Product grid — shrinks when side panel is open */}
            <div className={`grid gap-2 sm:gap-3 ${
              hasItems
                ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
            }`}>
              {visible.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Upload design CTA */}
            <div className="mt-10 p-6 bg-cmt-cream border border-gray-200 flex flex-col sm:flex-row
                            items-center justify-between gap-4">
              <div>
                <p className="font-heading font-bold text-cmt-navy text-base">Upload Your Design</p>
                <p className="text-gray-500 text-sm mt-1">Have your own design? Upload it and we'll stitch it for you.</p>
              </div>
              <button onClick={() => navigate('/booking')} className="btn-cmt flex-shrink-0">
                Upload & Book
              </button>
            </div>
          </div>

          {/* ── Right: sticky selection panel (desktop) ── */}
          {hasItems && (
            <div className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 sticky top-24 self-start
                            border border-gray-200 shadow-xl bg-white overflow-hidden">
              {/* Panel header */}
              <div className="bg-cmt-navy px-4 py-3 flex items-center justify-between">
                <h3 className="font-heading font-bold text-sm text-white tracking-wide">My Selection</h3>
                <span className="bg-cmt-gold text-white text-[10px] font-body font-bold px-2 py-0.5 tracking-widest">
                  {cart.length} ITEM{cart.length !== 1 ? 'S' : ''}
                </span>
              </div>

              {/* Items list — scrollable, no visible scrollbar */}
              <div
                className="px-3 py-3 space-y-2 overflow-y-auto max-h-[52vh]"
                style={{ scrollbarWidth: 'none' }}
              >
                {cart.map(item => (
                  <div key={item.id} className="bg-gray-50 border border-gray-100 p-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-11 h-14 object-contain bg-[#f7f5f2] flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-heading font-semibold text-cmt-navy leading-tight line-clamp-2">
                          {item.title}
                        </p>
                        <p className="text-cmt-gold text-[11px] font-body font-bold mt-0.5">
                          ₹{item.price.toLocaleString()}/-
                        </p>
                        {item.qty > 1 && (
                          <p className="text-gray-400 text-[10px]">Qty: {item.qty}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-300 hover:text-red-400 text-xl leading-none flex-shrink-0 transition-colors"
                        aria-label="Remove"
                      >
                        ×
                      </button>
                    </div>
                    {/* Fabric Yes/No */}
                    <div className="mt-2 border border-dashed border-gray-300 rounded px-2 py-1.5">
                      <p className="text-[10px] font-body text-gray-500 mb-1">Do you have fabric?</p>
                      <div className="flex gap-3">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name={`fabric-${item.id}`}
                            checked={item.hasFabric === 'yes'}
                            onChange={() => setFabric(item.id, 'yes')}
                            className="accent-cmt-gold cursor-pointer"
                          />
                          <span className="text-[10px] font-body text-gray-600">Yes</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name={`fabric-${item.id}`}
                            checked={item.hasFabric === 'no'}
                            onChange={() => setFabric(item.id, 'no')}
                            className="accent-cmt-gold cursor-pointer"
                          />
                          <span className="text-[10px] font-body text-gray-600">No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total + Book Visit button */}
              <div className="px-4 py-4 border-t border-gray-100 space-y-3 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-[10px] font-body tracking-widest uppercase">Total Estimate</span>
                  <span className="font-heading font-bold text-cmt-navy text-sm">₹{totalPrice.toLocaleString()}/-</span>
                </div>
                <button
                  onClick={() => navigate('/booking')}
                  className="w-full bg-cmt-navy text-white font-body font-semibold text-[11px]
                             uppercase tracking-widest py-3 hover:bg-cmt-gold transition-colors duration-200
                             flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Proceed To Book
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile: sticky bottom bar */}
        {totalCount > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-cmt-navy text-white py-4 px-6 z-40
                          flex items-center justify-between shadow-2xl lg:hidden">
            <div>
              <p className="font-heading font-bold text-base">
                {totalCount} item{totalCount !== 1 ? 's' : ''} selected
              </p>
              <p className="text-cmt-gold text-xs">Ready to book your home visit</p>
            </div>
            <button
              onClick={() => navigate('/booking')}
              className="btn-cmt py-3 px-6 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Visit
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
