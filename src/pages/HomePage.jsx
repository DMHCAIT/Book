import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import CategoryButtons from '../components/CategoryButtons'

const testimonials = [
  {
    name: 'Ankit Kasana',
    role: 'Businessman (Real Estate)',
    text: 'Awesome experience with call my tailor.. nice fitting with efficient work.',
    avatar: 'https://callmytailor.com/image/catalog/testimonial/ankit-kasana-min.jpg',
  },
  {
    name: 'Vineet Basist',
    role: 'Businessman',
    text: 'I have ordered and received several items now. Everything I received fit perfectly, and is good quality.',
    avatar: 'https://callmytailor.com/image/catalog/testimonial/happclint-min.jpg',
  },
  {
    name: 'Mohit Arya',
    role: 'Builder',
    text: 'Awesome fabrics plus fitting worth, liked a lot, and i will surely recommend to my all relatives.',
    avatar: 'https://callmytailor.com/image/catalog/testimonial/mohit-arya-min.jpg',
  },
  {
    name: 'Sudhir Dayma',
    role: 'Businessman',
    text: 'Incredible service, Really impressed with nice fitting, fine fabric. I recommend you give a chance to callmytailor.',
    avatar: 'https://callmytailor.com/image/catalog/testimonial/sudhir-dayma-min.jpg',
  },
  {
    name: 'Prateek Bhardwaj',
    role: 'Journalist, India TV',
    text: 'Best service, awesome clothes.',
    avatar: 'https://callmytailor.com/image/catalog/testimonial/prateek-min.jpg',
  },
  {
    name: 'Rahul Basist',
    role: 'Interior Designer',
    text: 'Well designed indo western about fitting and fabrics. I am 100% satisfied with callmytailor.',
    avatar: 'https://callmytailor.com/image/catalog/testimonial/rahul-basist-2-min.jpg',
  },
]

export default function HomePage() {
  return (
    <main className="page-fade">
      <Hero />
      <CategoryButtons />

      {/* ── Why Choose Us banner ── */}
      <section className="relative py-24 overflow-hidden bg-[#0d1525]">
        {/* Background texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80')" }}
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1525]/80 via-transparent to-[#0d1525]/80" />
        {/* Gold rule top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cmt-gold to-transparent opacity-50" />

        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <p className="sec-label mb-4">Why Choose Us</p>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white mb-2 leading-tight tracking-tight">
            Made for You,
          </h2>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-cmt-gold italic mb-6 leading-tight">
            Designed by You
          </h2>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="block w-12 h-px bg-cmt-gold/40" />
            <span className="text-cmt-gold text-xs">✦</span>
            <span className="block w-12 h-px bg-cmt-gold/40" />
          </div>
          <p className="text-white/60 text-base mb-10 leading-relaxed max-w-xl mx-auto">
            Premium fabric selection, expert master tailors, and a perfect fit — all delivered to your doorstep.
          </p>
          {/* 4 USPs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
            {[
              { icon: '✦', text: 'Free Home Visit' },
              { icon: '✦', text: 'Premium Fabrics' },
              { icon: '✦', text: '7-Day Delivery' },
              { icon: '✦', text: 'Perfect Fit Guarantee' },
            ].map(u => (
              <div key={u.text} className="flex flex-col items-center gap-2">
                <span className="text-cmt-gold text-sm">{u.icon}</span>
                <p className="text-white/80 text-xs font-heading uppercase tracking-wide">{u.text}</p>
              </div>
            ))}
          </div>
          <Link
            to="/booking"
            className="inline-flex items-center gap-3 bg-cmt-gold hover:bg-cmt-goldLight text-white
                       font-heading font-semibold text-sm uppercase tracking-widest px-10 py-4
                       transition-all duration-200 shadow-lg shadow-cmt-gold/20"
            style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 100%, 12px 100%)' }}
          >
            Book Visit & Order Now
          </Link>
        </div>
        {/* Gold rule bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cmt-gold to-transparent opacity-50" />
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="sec-label mb-3">Client Reviews</p>
            <h2 className="font-heading font-bold text-cmt-navy text-3xl md:text-4xl tracking-tight">What Our Clients Say</h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="block w-12 h-px bg-cmt-gold/40" />
              <span className="text-cmt-gold text-xs">✦</span>
              <span className="block w-12 h-px bg-cmt-gold/40" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name}
                className="bg-white border border-gray-100 p-8 flex flex-col
                           hover:shadow-lg transition-shadow duration-300
                           relative">
                {/* Top gold accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-cmt-gold/30" />
                {/* Quote mark */}
                <div className="text-cmt-gold/20 font-heading font-black text-7xl leading-none absolute top-4 right-6 select-none">&ldquo;</div>
                <div className="flex text-cmt-gold text-sm mb-4 tracking-widest">★★★★★</div>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 italic mb-6 relative z-10">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    onError={e => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                    className="w-11 h-11 rounded-full object-cover flex-shrink-0 border-2 border-cmt-gold/40"
                  />
                  <div
                    className="w-11 h-11 rounded-full bg-cmt-navy flex-shrink-0 items-center justify-center
                               font-heading font-bold text-white text-base border-2 border-cmt-gold/40"
                    style={{ display: 'none' }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-cmt-navy text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
