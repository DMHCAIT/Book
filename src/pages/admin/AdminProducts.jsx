import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'

const CATEGORY_CONFIG = {
  mens: {
    label: "Men's Collection",
    key: 'mensProducts',
    subcategories: ['Suits/Blazer', 'Kurta Pajama', 'Formal Wear', 'Ethnic Wear'],
  },
  womens: {
    label: "Women's Collection",
    key: 'womensProducts',
    subcategories: ['Saree & Blouse', 'Suit/Salwar', 'Ethnic Wear', 'Western Wear'],
  },
  alteration: {
    label: 'Alteration Services',
    key: 'alterationServices',
    subcategories: ['Basic', 'Garment', 'Special'],
  },
}

const EMPTY_PRODUCT = {
  title: '',
  subcategory: '',
  stitching: '',
  fabricFrom: '0',
  price: '',
  badge: '',
  image: '',
  fallback: '',
}

function ProductModal({ product, category, onSave, onClose }) {
  const { subcategories } = CATEGORY_CONFIG[category]
  const [form, setForm] = useState(
    product
      ? { ...product, stitching: String(product.stitching), fabricFrom: String(product.fabricFrom ?? 0), price: String(product.price) }
      : { ...EMPTY_PRODUCT }
  )
  const [errors, setErrors] = useState({})

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }))
    // Auto-sync price with stitching
    if (k === 'stitching' && !product) setForm(f => ({ ...f, stitching: v, price: v }))
  }

  const validate = () => {
    const e = {}
    if (!form.title.trim())     e.title     = 'Required'
    if (!form.subcategory)       e.subcategory = 'Required'
    if (!form.stitching || isNaN(+form.stitching)) e.stitching = 'Enter a number'
    if (!form.price || isNaN(+form.price))         e.price     = 'Enter a number'
    return e
  }

  const handleSave = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSave({
      ...form,
      stitching:  +form.stitching,
      fabricFrom: +form.fabricFrom || 0,
      price:      +form.price,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-[#1a2744] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h3 className="font-heading font-bold text-white text-lg">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors text-xl leading-none">
            ✕
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Product Title <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="e.g. Blazer"
              className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400
                ${errors.title ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subcategory <span className="text-red-400">*</span></label>
            <select
              value={form.subcategory}
              onChange={e => set('subcategory', e.target.value)}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400
                ${errors.subcategory ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
            >
              <option value="">Select subcategory</option>
              {subcategories.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.subcategory && <p className="text-red-500 text-xs mt-1">{errors.subcategory}</p>}
          </div>

          {/* Prices */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Stitching ₹ <span className="text-red-400">*</span></label>
              <input
                type="number"
                min="0"
                value={form.stitching}
                onChange={e => set('stitching', e.target.value)}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400
                  ${errors.stitching ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
              />
              {errors.stitching && <p className="text-red-500 text-xs mt-1">{errors.stitching}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Fabric from ₹</label>
              <input
                type="number"
                min="0"
                value={form.fabricFrom}
                onChange={e => set('fabricFrom', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price ₹ <span className="text-red-400">*</span></label>
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={e => set('price', e.target.value)}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400
                  ${errors.price ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
          </div>

          {/* Badge */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Badge <span className="text-gray-400 font-normal">(optional)</span></label>
            <input
              type="text"
              value={form.badge || ''}
              onChange={e => set('badge', e.target.value)}
              placeholder="e.g. Bestseller, Premium, New"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Image URL <span className="text-gray-400 font-normal">(optional)</span></label>
            <input
              type="url"
              value={form.image || ''}
              onChange={e => set('image', e.target.value)}
              placeholder="https://callmytailor.com/custom/..."
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Fallback URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Fallback Image URL <span className="text-gray-400 font-normal">(optional)</span></label>
            <input
              type="url"
              value={form.fallback || ''}
              onChange={e => set('fallback', e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 flex-shrink-0 border-t border-gray-100">
          <button onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave}
            className="px-5 py-2.5 rounded-lg bg-[#1a2744] hover:bg-[#111c35] text-white text-sm font-semibold transition-colors">
            {product ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminProducts() {
  const { mensProducts, womensProducts, alterationServices, setProducts } = useAdmin()
  const [category, setCategory] = useState('mens')
  const [modal, setModal] = useState(null) // null | { mode: 'add' | 'edit', product?: obj }
  const [deleteId, setDeleteId] = useState(null)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')

  const cfg = CATEGORY_CONFIG[category]
  const products = { mens: mensProducts, womens: womensProducts, alteration: alterationServices }[category]

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.subcategory.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = (formData) => {
    if (modal.mode === 'add') {
      const newProduct = {
        ...formData,
        id: `${category[0]}${Date.now()}`,
        category,
      }
      setProducts(category, [...products, newProduct])
      showToast('Product added successfully')
    } else {
      const updated = products.map(p =>
        p.id === modal.product.id ? { ...p, ...formData } : p
      )
      setProducts(category, updated)
      showToast('Product updated successfully')
    }
    setModal(null)
  }

  const handleDelete = (id) => {
    setProducts(category, products.filter(p => p.id !== id))
    setDeleteId(null)
    showToast('Product deleted')
  }

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg z-50 text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-gray-800">Products</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage your product catalogue</p>
        </div>
        <button
          onClick={() => setModal({ mode: 'add' })}
          className="flex items-center gap-2 bg-[#1a2744] hover:bg-[#111c35] text-white
                     font-heading font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Category tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="flex border-b border-gray-100">
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => {
            const count = { mens: mensProducts.length, womens: womensProducts.length, alteration: alterationServices.length }[key]
            return (
              <button
                key={key}
                onClick={() => { setCategory(key); setSearch('') }}
                className={`flex-1 py-3.5 text-sm font-heading font-medium transition-colors
                  ${category === key
                    ? 'border-b-2 border-[#1a2744] text-[#1a2744]'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {cfg.label}
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full
                  ${category === key ? 'bg-[#1a2744] text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="relative max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm
                         focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {['Product', 'Subcategory', 'Stitching', 'Fabric from', 'Price', 'Badge', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    {search ? 'No products match your search' : 'No products yet'}
                  </td>
                </tr>
              ) : filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image || p.fallback}
                        alt={p.title}
                        onError={e => { e.target.src = p.fallback || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&q=60' }}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                      />
                      <span className="font-medium text-gray-800">{p.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{p.subcategory}</td>
                  <td className="px-5 py-3 text-gray-800 font-medium">₹{p.stitching?.toLocaleString()}</td>
                  <td className="px-5 py-3 text-gray-500">{p.fabricFrom ? `₹${p.fabricFrom.toLocaleString()}` : '—'}</td>
                  <td className="px-5 py-3 text-gray-800 font-medium">₹{p.price?.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    {p.badge ? (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {p.badge}
                      </span>
                    ) : <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModal({ mode: 'edit', product: p })}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product modal */}
      {modal && (
        <ProductModal
          product={modal.product || null}
          category={category}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-lg text-gray-800 text-center mb-2">Delete Product?</h3>
            <p className="text-gray-500 text-sm text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-white text-sm font-semibold transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
