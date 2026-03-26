import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'

const STATUS_COLORS = {
  Pending:   'bg-yellow-100 text-yellow-800',
  Confirmed: 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
}

export default function AdminDashboard() {
  const { mensProducts, womensProducts, alterationServices, bookings } = useAdmin()
  const navigate = useNavigate()

  const total     = mensProducts.length + womensProducts.length + alterationServices.length
  const pending   = bookings.filter(b => b.status === 'Pending').length
  const confirmed = bookings.filter(b => b.status === 'Confirmed').length
  const completed = bookings.filter(b => b.status === 'Completed').length
  const recent    = bookings.slice(0, 6)

  const stats = [
    {
      label: 'Total Products',
      value: total,
      sub: `${mensProducts.length} Men · ${womensProducts.length} Women · ${alterationServices.length} Alt`,
      color: 'bg-blue-50 text-blue-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      action: () => navigate('/admin/products'),
    },
    {
      label: 'Pending Bookings',
      value: pending,
      sub: 'Needs attention',
      color: 'bg-yellow-50 text-yellow-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      action: () => navigate('/admin/bookings'),
    },
    {
      label: 'Confirmed',
      value: confirmed,
      sub: 'Scheduled visits',
      color: 'bg-indigo-50 text-indigo-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      action: () => navigate('/admin/bookings'),
    },
    {
      label: 'Completed',
      value: completed,
      sub: 'Total delivered',
      color: 'bg-green-50 text-green-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M5 13l4 4L19 7" />
        </svg>
      ),
      action: () => navigate('/admin/bookings'),
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Welcome back, Admin</p>
        </div>
        <div className="text-sm text-gray-400">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map(s => (
          <button
            key={s.label}
            onClick={s.action}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-left
                       hover:shadow-md transition-shadow group w-full"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-lg ${s.color}`}>{s.icon}</div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="font-heading font-bold text-3xl text-gray-800">{s.value}</p>
            <p className="font-heading font-semibold text-gray-600 text-sm mt-0.5">{s.label}</p>
            <p className="text-gray-400 text-xs mt-1">{s.sub}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent bookings */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-gray-700">Recent Bookings</h2>
            <button onClick={() => navigate('/admin/bookings')}
              className="text-xs text-blue-600 hover:underline">View all</button>
          </div>
          {recent.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <svg className="w-10 h-10 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm">No bookings yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {['ID', 'Customer', 'Date', 'City', 'Status'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recent.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 font-mono text-xs text-gray-500">{b.id}</td>
                      <td className="px-5 py-3">
                        <p className="font-medium text-gray-800">{b.name}</p>
                        <p className="text-gray-400 text-xs">{b.phone}</p>
                      </td>
                      <td className="px-5 py-3 text-gray-600">
                        {b.date ? new Date(b.date).toLocaleDateString('en-IN') : '—'}
                      </td>
                      <td className="px-5 py-3 text-gray-600">{b.city || '—'}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[b.status] || 'bg-gray-100 text-gray-600'}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-gray-700">Quick Actions</h2>
          </div>
          <div className="p-5 space-y-3">
            {[
              { label: 'Add New Product', to: '/admin/products', color: 'bg-blue-600 hover:bg-blue-700' },
              { label: 'View All Bookings', to: '/admin/bookings', color: 'bg-[#1a2744] hover:bg-[#111c35]' },
              { label: 'Edit Site Settings', to: '/admin/settings', color: 'bg-gray-700 hover:bg-gray-800' },
            ].map(a => (
              <button
                key={a.label}
                onClick={() => navigate(a.to)}
                className={`w-full ${a.color} text-white font-heading font-medium py-2.5 px-4
                            rounded-lg text-sm transition-colors text-left flex items-center justify-between`}
              >
                {a.label}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}

            <div className="pt-2">
              <a href="/" target="_blank" rel="noopener noreferrer"
                className="w-full border border-gray-200 text-gray-600 font-heading font-medium py-2.5 px-4
                           rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center justify-between">
                Preview Live Site
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Category breakdown */}
          <div className="px-5 pb-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Product Breakdown</p>
            {[
              { label: "Men's", count: mensProducts.length, color: 'bg-blue-500' },
              { label: "Women's", count: womensProducts.length, color: 'bg-pink-500' },
              { label: 'Alteration', count: alterationServices.length, color: 'bg-purple-500' },
            ].map(c => (
              <div key={c.label} className="mb-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{c.label}</span>
                  <span>{c.count}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${c.color}`}
                    style={{ width: total ? `${(c.count / total) * 100}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
