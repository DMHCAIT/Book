import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AdminProvider } from './context/AdminContext'
import Header        from './components/Header'
import Footer        from './components/Footer'
import AdminLayout   from './components/admin/AdminLayout'
import HomePage      from './pages/HomePage'
import MensPage      from './pages/MensPage'
import WomensPage    from './pages/WomensPage'
import AlterationPage from './pages/AlterationPage'
import BookingPage   from './pages/BookingPage'
import AdminLogin    from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminBookings from './pages/admin/AdminBookings'
import AdminSettings from './pages/admin/AdminSettings'

export default function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <Routes>
          {/* ── Admin routes (no site header/footer) ── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products"  element={<AdminProducts />} />
            <Route path="bookings"  element={<AdminBookings />} />
            <Route path="settings"  element={<AdminSettings />} />
          </Route>

          {/* ── Main site routes ── */}
          <Route path="/*" element={
            <CartProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-1">
                  <Routes>
                    <Route path="/"           element={<HomePage />} />
                    <Route path="/mens"       element={<MensPage />} />
                    <Route path="/womens"     element={<WomensPage />} />
                    <Route path="/alteration" element={<AlterationPage />} />
                    <Route path="/booking"    element={<BookingPage />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            </CartProvider>
          } />
        </Routes>
      </AdminProvider>
    </BrowserRouter>
  )
}
