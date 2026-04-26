import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-cmt-navyDark text-gray-300">
      {/* Top CTA band */}
      <div className="bg-cmt-gold py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-1">
          <p className="font-heading font-bold text-cmt-navy text-lg">
            Made for You, Designed by You
          </p>
          <p className="text-white/80 text-sm">
            Get customize your dress in Perfect fitting with quality stitching at your doorstep
          </p>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <p className="font-heading font-extrabold text-2xl text-white tracking-tight">
                Vivah <span className="text-cmt-gold">Vastra</span>
              </p>
              <p className="text-cmt-gold/70 text-xs tracking-[0.2em] uppercase mt-0.5">
                Book Home Visit
              </p>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              We are a group of expert tailors providing the best tailoring experience at your doorstep.
              Premium fabric · Expert tailors · 7-day delivery.
            </p>

            <div className="space-y-2.5 text-sm mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-cmt-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <a href="tel:+918882222900" className="text-gray-400 hover:text-cmt-gold transition-colors">
                  +91 88822 22900
                </a>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-cmt-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:info@callmytailor.com" className="text-gray-400 hover:text-cmt-gold transition-colors">
                  info@vivahvastra.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-cmt-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="text-gray-400">Delhi NCR · Noida · Faridabad · Greater Noida · Gurugram</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { label: 'Facebook', href: 'https://www.facebook.com/SmartAddons.page/', icon: 'f' },
                { label: 'Twitter', href: 'https://twitter.com/smartaddons', icon: 't' },
                { label: 'Instagram', href: 'https://www.instagram.com/doorstep_designer_tailor/', icon: 'in' },
                { label: 'Pinterest', href: 'https://www.pinterest.com/smartaddons/', icon: 'p' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded bg-white/10 hover:bg-cmt-gold flex items-center justify-center
                             text-white/70 hover:text-white text-xs font-bold transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5
                           pb-2 border-b border-white/10">
              Information
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', to: '/' },
                { label: 'Why Call My Tailor', to: '/' },
                { label: "FAQ's", to: '/' },
                { label: 'Testimonials', to: '/' },
                { label: 'How It Works', to: '/' },
                { label: 'Price List', to: '/' },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-gray-400 hover:text-cmt-gold text-sm transition-colors flex items-center gap-2 group">
                    <svg className="w-2.5 h-2.5 text-cmt-gold/0 group-hover:text-cmt-gold transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5
                           pb-2 border-b border-white/10">
              Disclaimer
            </h4>
            <ul className="space-y-3">
              {[
                'Terms and Conditions',
                'Privacy Policy',
                'Refund & Replacement',
                'Complaint & Advise',
                'Payment Method',
                'Track My Order',
              ].map(l => (
                <li key={l}>
                  <Link to="/" className="text-gray-400 hover:text-cmt-gold text-sm transition-colors flex items-center gap-2 group">
                    <svg className="w-2.5 h-2.5 text-cmt-gold/0 group-hover:text-cmt-gold transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore More */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-5
                           pb-2 border-b border-white/10">
              Explore More
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Contact Us', to: '/' },
                { label: 'Join Us', to: '/' },
                { label: 'Site Map', to: '/' },
                { label: 'Affiliate', to: '/' },
                { label: 'Customer Support', to: '/' },
                { label: 'Gallery', to: '/' },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-gray-400 hover:text-cmt-gold text-sm transition-colors flex items-center gap-2 group">
                    <svg className="w-2.5 h-2.5 text-cmt-gold/0 group-hover:text-cmt-gold transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* WhatsApp */}
            <a
              href="https://api.whatsapp.com/send?phone=918882222900"
              target="_blank" rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 text-sm text-gray-400 hover:text-cmt-gold transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.12 1.533 5.849L.057 24l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.656-.523-5.168-1.431l-.371-.221-3.841 1.007 1.027-3.748-.24-.384A9.961 9.961 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </div>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-t border-white/10 bg-cmt-navy/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: '5485+', label: 'Happy Clients' },
              { value: '15', label: 'Year Experience' },
              { value: '250+', label: 'Tailors & Designers' },
              { value: '14580+', label: 'Products Delivered' },
            ].map(s => (
              <div key={s.label}>
                <p className="font-heading font-extrabold text-2xl text-cmt-gold">{s.value}</p>
                <p className="text-gray-400 text-xs uppercase tracking-wide mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4
                        flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Call My Tailor. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            <span>We Accept:</span>
            {['Visa', 'MasterCard', 'UPI', 'Paytm', 'Net Banking'].map(p => (
              <span key={p} className="border border-white/20 px-2 py-0.5 rounded text-gray-400 text-[10px] font-medium">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
