import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Completed', 'Cancelled']

const STATUS_STYLES = {
  Pending:   { badge: 'bg-yellow-100 text-yellow-800 border-yellow-200', dot: 'bg-yellow-500' },
  Confirmed: { badge: 'bg-blue-100 text-blue-800 border-blue-200',       dot: 'bg-blue-500'   },
  Completed: { badge: 'bg-green-100 text-green-800 border-green-200',    dot: 'bg-green-500'  },
  Cancelled: { badge: 'bg-red-100 text-red-800 border-red-200',          dot: 'bg-red-500'    },
}

const FILTERS = ['All', ...STATUS_OPTIONS]

export default function AdminBookings() {
  const { bookings, updateBooking, deleteBooking, clearBookings } = useAdmin()
  const [filter, setFilter]       = useState('All')
  const [expanded, setExpanded]   = useState(null)
  const [deleteId, setDeleteId]   = useState(null)
  const [clearConfirm, setClearConfirm] = useState(false)
  const [search, setSearch]       = useState('')
  const [toast, setToast]         = useState('')

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const filtered = bookings
    .filter(b => filter === 'All' || b.status === filter)
    .filter(b =>
      !search ||
      b.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.phone?.includes(search) ||
      b.city?.toLowerCase().includes(search.toLowerCase()) ||
      b.id?.toLowerCase().includes(search.toLowerCase())
    )

  const handleStatusChange = (id, status) => {
    updateBooking(id, { status })
    showToast(`Status updated to ${status}`)
  }

  const handleDelete = (id) => {
    deleteBooking(id)
    setDeleteId(null)
    if (expanded === id) setExpanded(null)
    showToast('Booking deleted')
  }

  const handleClearAll = () => {
    clearBookings()
    setClearConfirm(false)
    showToast('All bookings cleared')
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
          <h1 className="font-heading font-bold text-2xl text-gray-800">Bookings</h1>
          <p className="text-gray-500 text-sm mt-0.5">{bookings.length} total booking{bookings.length !== 1 ? 's' : ''}</p>
        </div>
        {bookings.length > 0 && (
          <button
            onClick={() => setClearConfirm(true)}
            className="flex items-center gap-2 text-red-500 border border-red-200 hover:bg-red-50
                       font-heading font-medium px-4 py-2.5 rounded-xl text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear All
          </button>
        )}
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {STATUS_OPTIONS.map(s => {
          const count = bookings.filter(b => b.status === s).length
          const st = STATUS_STYLES[s]
          return (
            <button
              key={s}
              onClick={() => setFilter(filter === s ? 'All' : s)}
              className={`bg-white rounded-xl p-4 shadow-sm border text-left transition-all
                ${filter === s ? 'ring-2 ring-[#1a2744]' : 'border-gray-100 hover:shadow-md'}`}
            >
              <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full border ${st.badge} mb-2`}>
                <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                {s}
              </div>
              <p className="font-heading font-bold text-2xl text-gray-800">{count}</p>
            </button>
          )
        })}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filter bar */}
        <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center gap-3">
          <div className="flex gap-1 flex-wrap">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-colors
                  ${filter === f
                    ? 'bg-[#1a2744] text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                  }`}
              >
                {f}
                <span className="ml-1 text-[10px]">
                  ({f === 'All' ? bookings.length : bookings.filter(b => b.status === f).length})
                </span>
              </button>
            ))}
          </div>
          <div className="ml-auto relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, phone, city..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm
                         focus:outline-none focus:ring-2 focus:ring-yellow-400 w-56"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500 font-medium">No bookings found</p>
            <p className="text-gray-400 text-sm mt-1">
              {search || filter !== 'All' ? 'Try changing your filters' : 'Bookings will appear here when customers submit the form'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Booking ID', 'Customer', 'Date / Time', 'City', 'Items', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(b => {
                  const st = STATUS_STYLES[b.status] || STATUS_STYLES.Pending
                  const isExp = expanded === b.id
                  return (
                    <>
                      <tr key={b.id} className={`hover:bg-gray-50 transition-colors ${isExp ? 'bg-blue-50/30' : ''}`}>
                        <td className="px-5 py-3 font-mono text-xs text-gray-500">{b.id}</td>
                        <td className="px-5 py-3">
                          <p className="font-medium text-gray-800">{b.name}</p>
                          <p className="text-gray-400 text-xs">{b.phone}</p>
                        </td>
                        <td className="px-5 py-3 text-gray-600">
                          <p>{b.date ? new Date(b.date).toLocaleDateString('en-IN') : '—'}</p>
                          <p className="text-xs text-gray-400">{b.time || '—'}</p>
                        </td>
                        <td className="px-5 py-3 text-gray-600">{b.city || '—'}</td>
                        <td className="px-5 py-3 text-gray-600">
                          {b.items?.length || 0} item{(b.items?.length || 0) !== 1 ? 's' : ''}
                        </td>
                        <td className="px-5 py-3">
                          <select
                            value={b.status}
                            onChange={e => handleStatusChange(b.id, e.target.value)}
                            className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border cursor-pointer
                              focus:outline-none focus:ring-2 focus:ring-yellow-400 ${st.badge}`}
                          >
                            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setExpanded(isExp ? null : b.id)}
                              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                              title="View details"
                            >
                              <svg className={`w-4 h-4 transition-transform ${isExp ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => setDeleteId(b.id)}
                              className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
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

                      {/* Expanded detail row */}
                      {isExp && (
                        <tr key={`${b.id}-detail`} className="bg-blue-50/20">
                          <td colSpan={7} className="px-5 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Customer Info</p>
                                <p><span className="text-gray-400">Email:</span> <span className="text-gray-700">{b.email || '—'}</span></p>
                                <p className="mt-1"><span className="text-gray-400">Address:</span> <span className="text-gray-700">{b.address || '—'}</span></p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Booking Details</p>
                                <p><span className="text-gray-400">Booked on:</span> <span className="text-gray-700">{new Date(b.createdAt).toLocaleString('en-IN')}</span></p>
                                {b.notes && <p className="mt-1"><span className="text-gray-400">Notes:</span> <span className="text-gray-700 italic">"{b.notes}"</span></p>}
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Selected Items</p>
                                {b.items?.length ? (
                                  <div className="space-y-1">
                                    {b.items.map((item, i) => (
                                      <div key={i} className="flex justify-between text-xs">
                                        <span className="text-gray-700">{item.title} ×{item.qty}</span>
                                        <span className="text-gray-800 font-medium">₹{(item.price * item.qty).toLocaleString()}</span>
                                      </div>
                                    ))}
                                    <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-semibold">
                                      <span className="text-gray-600">Total</span>
                                      <span className="text-gray-800">₹{b.totalPrice?.toLocaleString() || '—'}</span>
                                    </div>
                                  </div>
                                ) : <p className="text-gray-400 text-xs">No items recorded</p>}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-heading font-bold text-lg text-gray-800 text-center mb-2">Delete Booking?</h3>
            <p className="text-gray-500 text-sm text-center mb-6">Booking <span className="font-mono font-bold">{deleteId}</span> will be permanently deleted.</p>
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

      {/* Clear all confirm */}
      {clearConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-lg text-gray-800 text-center mb-2">Clear All Bookings?</h3>
            <p className="text-gray-500 text-sm text-center mb-6">All {bookings.length} bookings will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => setClearConfirm(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleClearAll}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-white text-sm font-semibold transition-colors">
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
