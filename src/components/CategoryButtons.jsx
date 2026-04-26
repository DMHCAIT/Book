import { useNavigate } from 'react-router-dom'

const categories = [
  {
    id: 'mens',
    label: "Men's Tailoring",
    desc: 'Coat Pant, Kurta Pajama, Pant Shirt and all formal and Party Wear',
    path: '/mens',
    image: '/images/home-mens.jpg',
    fallback: '/images/mens/sherwani.jpg',
    color: 'border-cmt-navy',
  },
  {
    id: 'womens',
    label: "Women's Tailoring",
    desc: 'Salwar Suits, Gowns, Anarkali, Lehengas, Western & Traditional Wear',
    path: '/womens',
    image: '/images/home-womens.jpg',
    fallback: '/images/womens/lehenga-choli.jpg',
    color: 'border-pink-600',
  },
  {
    id: 'alteration',
    label: 'Alteration & Repair',
    desc: 'Length adjustments, waist and shoulder fitting, sleeve corrections, and all kind of alterations.',
    path: '/alteration',
    image: '/images/home-alteration.jpg',
    fallback: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
    color: 'border-emerald-600',
  },
]

const steps = [
  {
    num: '1',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: 'SELECT YOUR PRODUCT',
    sub: 'Or Upload Your Design',
  },
  {
    num: '2',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'BOOK YOUR HOME VISIT',
    sub: 'And Place Your Order',
  },
  {
    num: '3',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'GET MEASURED AT HOME',
    sub: 'And Choose Your Fabrics',
  },
]

export default function CategoryButtons() {
  const navigate = useNavigate()

  return (
    <>
      {/* ── Select Your Category ── */}
      <section id="select-category" className="py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading font-bold text-cmt-navy text-3xl md:text-4xl tracking-tight">What are you <span className="text-orange-500">looking for?</span></h2>
            <p className="text-gray-500 text-base mt-3">Choose the tailoring service that suits your style and needs.</p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="block w-12 h-px bg-cmt-gold/40" />
              <span className="text-cmt-gold text-xs">✦</span>
              <span className="block w-12 h-px bg-cmt-gold/40" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => navigate(cat.path)}
                className="group relative overflow-hidden text-left cursor-pointer"
              >
                {/* Image */}
                <div className="h-[280px] sm:h-[320px] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    onError={e => { e.target.src = cat.fallback }}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    style={{ transitionTimingFunction: 'cubic-bezier(.25,.46,.45,.94)' }}
                  />
                </div>
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1525]/90 via-[#0d1525]/30 to-transparent" />
                {/* Gold top-left corner accent */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cmt-gold opacity-70
                                group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cmt-gold opacity-70
                                group-hover:opacity-100 transition-opacity" />
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-heading font-extrabold text-white text-2xl tracking-wide leading-none mb-1">{cat.label}</p>
                  <p className="text-white/60 text-xs tracking-widest mb-4">{cat.desc}</p>
                  <div className="inline-flex items-center gap-2 bg-cmt-gold hover:bg-cmt-goldLight
                                  text-white text-xs font-heading font-bold uppercase tracking-widest
                                  px-5 py-2 transition-colors duration-200">
                    Explore
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-cmt-navy py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: '5,485+',  label: 'Happy Clients' },
              { value: '15',      label: 'Year Experience' },
              { value: '250+',    label: 'Tailors & Designers' },
              { value: '14,580+', label: 'Products Delivered' },
            ].map(s => (
              <div key={s.label}>
                <p className="font-heading font-extrabold text-3xl md:text-4xl text-cmt-gold leading-none">{s.value}</p>
                <p className="text-white/60 text-xs uppercase tracking-widest mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="sec-label mb-3">Simple Process</p>
            <h2 className="font-heading font-bold text-cmt-navy text-3xl md:text-4xl tracking-tight">How It Works</h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="block w-12 h-px bg-cmt-gold/40" />
              <span className="text-cmt-gold text-xs">✦</span>
              <span className="block w-12 h-px bg-cmt-gold/40" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 relative">
            <div className="hidden sm:block absolute top-10 left-[16.67%] right-[16.67%] h-px bg-cmt-gold/20" />
            {steps.map(s => (
              <div key={s.num} className="flex flex-col items-center text-center px-8 pb-10 relative">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full border-2 border-cmt-gold/30 bg-cmt-cream
                                  flex items-center justify-center text-cmt-gold shadow-sm">
                    {s.icon}
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-cmt-gold
                                   text-white text-[11px] font-heading font-bold flex items-center justify-center">
                    {s.num}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-cmt-navy text-sm tracking-widest mb-2 uppercase">{s.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed max-w-[160px]">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features strip ── */}
      <section className="bg-cmt-navy py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-16 h-px bg-cmt-gold mx-auto mb-10 opacity-60" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { icon: '🧵', title: '2000+ Fabrics', sub: 'For every occasion' },
              { icon: '✂️', title: 'Expert Tailors', sub: '30+ years experience' },
              { icon: '🎨', title: 'Fully Custom', sub: 'Designed by you' },
              { icon: '🧶', title: 'Fine Stitching', sub: 'Latest techniques' },
              { icon: '📦', title: '7-Day Delivery', sub: 'Guaranteed on-time' },
              { icon: '🏠', title: 'Home Visit', sub: 'No travel needed' },
            ].map(f => (
              <div key={f.title} className="text-center group">
                <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">{f.icon}</div>
                <p className="font-heading font-semibold text-white text-sm tracking-wide">{f.title}</p>
                <p className="text-white/40 text-xs mt-1">{f.sub}</p>
              </div>
            ))}
          </div>
          <div className="w-16 h-px bg-cmt-gold mx-auto mt-10 opacity-60" />
        </div>
      </section>
    </>
  )
}
