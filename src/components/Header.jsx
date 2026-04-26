import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAdmin } from '../context/AdminContext'
import CartDrawer from './CartDrawer'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: "Men's", to: '/mens' },
  { label: "Women's", to: '/womens' },
  { label: 'Alteration', to: '/alteration' },
  { label: 'Book Visit', to: '/booking' },
]

export default function Header() {
  const [menuOpen, setMenuOpen]     = useState(false)
  const [cartOpen, setCartOpen]     = useState(false)
  const [badgePulse, setBadgePulse] = useState(false)
  const { totalCount } = useCart()
  const { settings } = useAdmin()
  const phone    = settings?.phone    || '+91 88822 22900'
  const email    = settings?.email    || 'info@vivahvastra.com'
  const whatsapp = settings?.whatsapp || '918882222900'
  const cities   = settings?.cities   || 'Free Home Visit · Delhi NCR '
  const prevCount = useRef(totalCount)
  const navigate  = useNavigate()
  const location  = useLocation()

  useEffect(() => {
    if (totalCount !== prevCount.current) {
      setBadgePulse(true)
      const t = setTimeout(() => setBadgePulse(false), 400)
      prevCount.current = totalCount
      return () => clearTimeout(t)
    }
  }, [totalCount])

  return (
    <>
      {/* ── Top info bar ── */}
      <div className="bg-cmt-gold text-white text-[11px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2 gap-4">
          <div className="flex items-center gap-5 flex-wrap">
            <a href={`tel:${phone.replace(/\s/g, '')}`}
               className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              {phone}
            </a>
            <a href={`mailto:${email}`}
               className="flex items-center gap-1.5 hover:text-white/80 transition-colors hidden sm:flex">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              {email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-white/80">{cities}</span>
            {/* WhatsApp */}
            <a href={`https://api.whatsapp.com/send?phone=${whatsapp}`}
               target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1 bg-green-600 hover:bg-green-500 transition-colors px-2.5 py-1 rounded text-white text-xs font-semibold">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.12 1.533 5.849L.057 24l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.656-.523-5.168-1.431l-.371-.221-3.841 1.007 1.027-3.748-.24-.384A9.961 9.961 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[70px]">

          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="Call My Tailor"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={
                  link.to === '/booking'
                    ? 'ml-3 border-2 border-cmt-gold text-cmt-gold hover:bg-cmt-gold hover:text-white font-body font-medium text-[11px] tracking-widest uppercase px-5 py-2 self-center transition-colors duration-150'
                    : `font-body font-medium text-[12px] tracking-widest uppercase px-5 py-[26px] transition-colors duration-150 border-b-2 ${location.pathname === link.to ? 'text-cmt-gold border-cmt-gold' : 'text-cmt-navy/70 hover:text-cmt-gold border-transparent hover:border-cmt-gold/60'}`
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-cmt-navy hover:text-cmt-gold transition-colors"
              aria-label="Cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              {totalCount > 0 && (
                <span className={`absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px]
                  bg-cmt-gold text-white text-[10px] font-bold rounded-full
                  flex items-center justify-center px-0.5
                  ${badgePulse ? 'bdg-pulse' : ''}`}>
                  {totalCount}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              className="lg:hidden p-2 text-cmt-navy hover:text-cmt-gold transition-colors"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-100
          ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <nav className="px-4 pb-4 pt-2 flex flex-col border-t border-gray-100">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-sm font-heading font-medium uppercase tracking-wide
                  border-b border-gray-100 transition-colors
                  ${location.pathname === link.to
                    ? 'text-cmt-gold'
                    : 'text-cmt-navy/80 hover:text-cmt-gold'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
