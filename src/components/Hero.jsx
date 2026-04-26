import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'

const BG_IMAGE = '/images/hero-bg.png'
const BG_FALLBACK = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&q=90'

export default function Hero() {
  const navigate = useNavigate()
  const { settings } = useAdmin()
  const s = settings || {}

  return (
    <section className="relative w-full h-screen min-h-[640px] flex items-stretch bg-[#0d1525]" style={{ overflow: 'hidden' }}>

      {/* ── Full-bleed background image with rich layered overlay ── */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-right sm:bg-center"
        style={{ backgroundImage: `url('${BG_IMAGE}'), url('${BG_FALLBACK}')` }}
      />
      {/* Deep left vignette so text pops cleanly */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1525]/95 via-[#0d1525]/75 to-[#0d1525]/30 sm:to-[#0d1525]/10" />
      {/* Subtle bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1525]/60 via-transparent to-transparent" />

      {/* ── Thin gold rule across full top ── */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cmt-gold to-transparent opacity-60" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-8 h-px bg-cmt-gold" />
            <p className="text-cmt-gold font-heading font-semibold text-xs uppercase tracking-[0.35em]">
              {s.heroSubtitle || 'Premium Home Tailoring Service'}
            </p>
          </div>

          {/* Main headline */}
          <h1 className="font-heading font-extrabold leading-[1.1] mb-3 text-white"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
            Book Your Personal <span className="text-cmt-gold italic">Tailor at Home</span>
          </h1>

          {/* Subheading */}
          <p className="text-white/90 text-lg md:text-xl font-medium mb-4">
            No travel. No hassle. Just perfectly tailored outfits made for you.
          </p>

          {/* Ornamental divider */}
          <div className="flex items-center gap-3 mb-5">
            <span className="block h-px flex-1 max-w-[60px] bg-cmt-gold/50" />
            <span className="text-cmt-gold text-sm">✦</span>
            <span className="block h-px flex-1 max-w-[60px] bg-cmt-gold/50" />
          </div>

          {/* Description */}
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-lg font-light">
            Our expert tailors visit your home for measurements, fabric selection, and fittings—making custom clothing easier than ever.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-12">
            <button
              onClick={() => document.getElementById('select-category')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center justify-center gap-2 bg-cmt-gold hover:bg-cmt-goldLight text-white
                         font-heading font-semibold px-8 py-3.5 transition-all duration-200
                         uppercase tracking-widest text-sm shadow-lg shadow-cmt-gold/30 w-full sm:w-auto"
              style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 100%, 12px 100%)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Home Visit
            </button>
            <a
              href={`https://api.whatsapp.com/send?phone=${s.whatsapp || '918882222900'}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-white/30 hover:border-cmt-gold
                         text-white/80 hover:text-cmt-gold font-heading font-semibold px-7 py-3.5
                         transition-all duration-200 uppercase tracking-widest text-sm w-full sm:w-auto"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.12 1.533 5.849L.057 24l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.656-.523-5.168-1.431l-.371-.221-3.841 1.007 1.027-3.748-.24-.384A9.961 9.961 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
            {[
              { value: s.clientsCount  || '5,485+', label: 'Happy Clients' },
              { value: s.experience    || '15 Yrs',  label: 'Experience' },
              { value: s.tailorsCount  || '250+',    label: 'Expert Tailors' },
              { value: s.productsCount || '14,580+', label: 'Garments Delivered' },
            ].map(st => (
              <div key={st.label}>
                <p className="font-heading font-extrabold text-2xl text-cmt-gold leading-none">{st.value}</p>
                <p className="text-white/45 text-[11px] uppercase tracking-widest mt-1">{st.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-white/30 text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <svg className="w-4 h-4 text-cmt-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Bottom gold rule */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cmt-gold to-transparent opacity-40" />
    </section>
  )
}
