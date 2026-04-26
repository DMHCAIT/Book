import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, updateQty, toggleFabric, totalPrice } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleProceed = () => {
    onClose()
    navigate('/booking')
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm z-[70] bg-white shadow-2xl
          flex flex-col transition-transform duration-300
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-cmt-navy text-white">
          <h2 className="font-heading font-bold text-lg flex items-center gap-2">
            <svg className="w-5 h-5 text-cmt-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            My Cart
            {cart.length > 0 && (
              <span className="text-sm text-cmt-gold font-normal">
                ({cart.length})
              </span>
            )}
          </h2>
          <button onClick={onClose} className="p-1 hover:text-cmt-gold transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ scrollbarWidth: 'none' }}>
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <svg className="w-16 h-16 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-gray-400 font-medium">Your cart is empty</p>
              <button onClick={onClose} className="btn-cmt-outline">Browse Collections</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="bg-gray-50 rounded-lg border border-gray-100 p-3">
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-sm text-gray-800 truncate">{item.title}</p>
                    <p className="text-cmt-gold text-sm font-bold mt-0.5">₹{item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center
                                   hover:bg-cmt-navy hover:text-white hover:border-cmt-navy text-sm transition-colors"
                      >−</button>
                      <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center
                                   hover:bg-cmt-navy hover:text-white hover:border-cmt-navy text-sm transition-colors"
                      >+</button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors self-start"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                {/* Fabric checkbox */}
                <label className="mt-2 flex items-center gap-2 cursor-pointer border border-dashed border-gray-300 rounded px-3 py-2 hover:border-cmt-gold transition-colors">
                  <input
                    type="checkbox"
                    checked={!!item.hasFabric}
                    onChange={() => toggleFabric(item.id)}
                    className="accent-cmt-gold w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs font-body text-gray-500">Do you have fabric?</span>
                </label>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-200 space-y-3 bg-white">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Total Estimate</span>
              <span className="font-heading text-xl font-bold text-cmt-navy">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 text-left">( Only For Stitching )</p>
            <button onClick={handleProceed} className="w-full btn-cmt py-3 text-base">
              Proceed to Book
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
