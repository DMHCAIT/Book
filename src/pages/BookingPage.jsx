import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAdmin } from '../context/AdminContext'

const timeSlots = [
  '09:00 AM – 11:00 AM',
  '11:00 AM – 01:00 PM',
  '02:00 PM – 04:00 PM',
  '04:00 PM – 06:00 PM',
  '06:00 PM – 08:00 PM',
]

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  date: '',
  time: '',
  notes: '',
}

export default function BookingPage() {
  const { cart, totalPrice, clearCart } = useCart()
  const { addBooking } = useAdmin()
  const navigate = useNavigate()
  const [form, setForm]           = useState(INITIAL_FORM)
  const [errors, setErrors]       = useState({})
  const [submitted, setSubmitted]  = useState(false)
  const [loading, setLoading]      = useState(false)
  const [designFiles, setDesignFiles] = useState([])   // File[]
  const [designPreviews, setDesignPreviews] = useState([])  // dataURL[]

  const handleDesignFiles = (files) => {
    const valid = Array.from(files).filter(f => f.type.startsWith('image/') || f.type === 'application/pdf')
    setDesignFiles(prev => [...prev, ...valid])
    valid.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = e => setDesignPreviews(prev => [...prev, { name: file.name, url: e.target.result }])
        reader.readAsDataURL(file)
      } else {
        setDesignPreviews(prev => [...prev, { name: file.name, url: null }])
      }
    })
  }

  const removeDesign = (idx) => {
    setDesignFiles(prev => prev.filter((_, i) => i !== idx))
    setDesignPreviews(prev => prev.filter((_, i) => i !== idx))
  }

  const today = new Date().toISOString().split('T')[0]

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = 'Enter a valid 10-digit phone number'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.city.trim())    e.city    = 'City is required'
    if (!form.date)           e.date    = 'Please select a date'
    if (!form.time)           e.time    = 'Please select a time slot'
    return e
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: undefined }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      addBooking({
        ...form,
        items: cart.map(({ id, title, category, price, qty, image, fallback }) => ({ id, title, category, price, qty, image, fallback })),
        totalPrice,
        designFiles: designFiles.map(f => f.name),
      })
      setLoading(false)
      setSubmitted(true)
      clearCart()
    }, 1800)
  }

  if (submitted) {
    return (
      <main className="page-fade pt-20 min-h-screen bg-cmt-cream flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-heading text-3xl font-bold text-cmt-navy mb-3">Booking Confirmed!</h2>
          <p className="text-gray-500 leading-relaxed mb-2">
            Thank you, <strong>{form.name}</strong>! Your home visit has been scheduled.
          </p>
          <p className="text-gray-500 text-sm mb-1">
            📅 {new Date(form.date).toDateString()} · {form.time}
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Our tailor will call you at <strong>{form.phone}</strong> before the visit.
          </p>
          <div className="bg-cmt-cream rounded-2xl p-4 mb-8 text-left">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">What's next?</p>
            {['Confirmation SMS sent to your phone', 'Tailor assigned within 2 hours', 'Visit on your scheduled date', 'Delivery in 7–10 business days'].map(s => (
              <div key={s} className="flex items-center gap-2 text-sm text-gray-600 py-1">
                <span className="text-cmt-gold">✓</span> {s}
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/')} className="btn-cmt w-full">
            Back to Home
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="page-fade pt-20 min-h-screen bg-cmt-cream">
      {/* Banner */}
      <div className="bg-cmt-navyDark py-12 text-center">
        <p className="sec-label text-cmt-gold mb-2">Schedule Your Appointment</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">Book a Home Visit</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ─── Left: Order summary + notice ─── */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="font-heading text-xl font-bold text-cmt-navy mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-cmt-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Selected Items
              </h2>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-cmt-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7 text-cmt-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <p className="text-cmt-navy font-semibold text-sm mb-1">Home Visit Booking</p>
                  <p className="text-gray-400 text-xs leading-relaxed max-w-xs mx-auto">
                    Our tailor will visit your home and help you choose fabrics & styles on the spot. No need to pre-select items!
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-3">
                        <img src={item.image} alt={item.title}
                          className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-cmt-navy truncate">{item.title}</p>
                          <p className="text-xs text-gray-400 capitalize">{item.category}</p>
                          <p className="text-cmt-gold text-sm font-bold">
                            ₹{item.price.toLocaleString()} × {item.qty}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Stitching Estimate</span>
                      <span className="font-body font-semibold text-cmt-navy">₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-100">
                      <span className="text-gray-700 font-semibold">Total Estimate</span>
                      <span className="font-heading text-xl font-bold text-cmt-navy">
                        ₹{totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Notice card */}
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
              <svg className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-amber-800">
                A <span className="font-bold">₹200 home visit charge</span> will be applied at the time of booking. This amount will be adjusted in your final bill.
              </p>
            </div>
          </div>

          {/* ─── Right: Booking form ─── */}
          <div>
            <form onSubmit={handleSubmit} noValidate
              className="bg-white rounded-2xl shadow-md p-8 space-y-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-cmt-navy">Your Details</h2>
              </div>

              {/* Row: name + phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Full Name" name="name" type="text" placeholder="Priya Sharma"
                  value={form.name} onChange={handleChange} error={errors.name} />
                <Field label="Phone Number" name="phone" type="tel" placeholder="98765 43210"
                  value={form.phone} onChange={handleChange} error={errors.phone} />
              </div>

              {/* Email */}
              <Field label="Email Address" name="email" type="email" placeholder="you@example.com"
                value={form.email} onChange={handleChange} error={errors.email} />

              {/* Address */}
              <Field label="Full Address" name="address" type="textarea"
                placeholder="Flat no., Building, Street, Area..."
                value={form.address} onChange={handleChange} error={errors.address} />

              {/* Row: city + date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="City" name="city" type="text" placeholder="Mumbai"
                  value={form.city} onChange={handleChange} error={errors.city} />
                <Field label="Preferred Date" name="date" type="date" min={today}
                  value={form.date} onChange={handleChange} error={errors.date} />
              </div>

              {/* Time slot */}
              <div>
                <label className="block text-sm font-semibold text-cmt-navy mb-2">
                  Preferred Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {timeSlots.map(slot => (
                    <label key={slot} className="cursor-pointer">
                      <input
                        type="radio"
                        name="time"
                        value={slot}
                        checked={form.time === slot}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all
                        ${form.time === slot
                          ? 'border-cmt-gold bg-cmt-gold/10 text-cmt-navy'
                          : 'border-gray-200 hover:border-cmt-gold text-gray-600'}`}>
                        {slot}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-cmt-navy mb-2">
                  Additional Notes <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any special requests or fabric preferences..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                             focus:outline-none focus:ring-2 focus:ring-cmt-gold
                             placeholder-gray-300 resize-none"
                />
              </div>

              {/* Design Upload */}
              <div>
                <label className="block text-sm font-semibold text-cmt-navy mb-2">
                  Upload Your Design <span className="font-normal text-gray-400">(optional · images or PDF)</span>
                </label>
                <label
                  htmlFor="design-upload"
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); handleDesignFiles(e.dataTransfer.files) }}
                  className="flex flex-col items-center justify-center gap-2 border-2 border-dashed
                             border-cmt-gold/40 hover:border-cmt-gold rounded-xl px-4 py-6 cursor-pointer
                             bg-cmt-gold/5 hover:bg-cmt-gold/10 transition-colors text-center"
                >
                  <svg className="w-8 h-8 text-cmt-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-cmt-navy">Click to upload</span> or drag &amp; drop
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG, WEBP, PDF — share your design reference</p>
                  <input
                    id="design-upload"
                    type="file"
                    multiple
                    accept="image/*,application/pdf"
                    className="sr-only"
                    onChange={e => handleDesignFiles(e.target.files)}
                  />
                </label>

                {/* Previews */}
                {designPreviews.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {designPreviews.map((p, i) => (
                      <div key={i} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                        {p.url ? (
                          <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-2">
                            <svg className="w-7 h-7 text-red-400 mb-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 4h5v7h7v9H6V4z"/>
                            </svg>
                            <p className="text-xs text-gray-500 truncate w-full text-center">{p.name}</p>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeDesign(i)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5
                                     flex items-center justify-center text-xs opacity-0 group-hover:opacity-100
                                     transition-opacity shadow"
                          aria-label="Remove"
                        >✕</button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px]
                                        truncate px-1 py-0.5 translate-y-full group-hover:translate-y-0
                                        transition-transform">{p.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full btn-cmt text-base py-4 flex items-center justify-center gap-3
                  ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Confirming...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Confirm Booking
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

// Reusable form field component
function Field({ label, name, type, placeholder, value, onChange, error, min }) {
  const baseClass = `w-full border rounded-xl px-4 py-3 text-sm
    focus:outline-none focus:ring-2 focus:ring-cmt-gold placeholder-gray-300
    transition-colors
    ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-cmt-gold'}`

  return (
    <div>
      <label className="block text-sm font-semibold text-cmt-navy mb-2">{label}</label>
      {type === 'textarea' ? (
        <textarea name={name} rows={3} value={value} onChange={onChange}
          placeholder={placeholder} className={`${baseClass} resize-none`} />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange}
          placeholder={placeholder} min={min} className={baseClass} />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
