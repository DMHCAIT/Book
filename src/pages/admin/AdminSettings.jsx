import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="font-heading font-bold text-gray-700">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function Field({ label, name, value, onChange, type = 'text', placeholder, hint }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm
                   focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}

export default function AdminSettings() {
  const { settings, updateSettings } = useAdmin()
  const [form, setForm]     = useState({ ...settings })
  const [saved, setSaved]   = useState(false)
  const [changed, setChanged] = useState(false)

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    setChanged(true)
    setSaved(false)
  }

  const handleChange = (e) => set(e.target.name, e.target.value)

  const handleSave = () => {
    updateSettings(form)
    setSaved(true)
    setChanged(false)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    setForm({ ...settings })
    setChanged(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-gray-800">Settings</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage site-wide content and contact information</p>
        </div>
        <div className="flex items-center gap-3">
          {changed && (
            <button onClick={handleReset}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
              Reset
            </button>
          )}
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors
              ${saved
                ? 'bg-green-600 text-white'
                : 'bg-[#1a2744] hover:bg-[#111c35] text-white'
              }`}
          >
            {saved ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Saved!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Hero Section */}
        <Section title="Hero Section">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              label="Hero Title"
              name="heroTitle"
              value={form.heroTitle}
              onChange={handleChange}
              placeholder="Book a Home Visit"
            />
            <Field
              label="Hero Subtitle (gold label above title)"
              name="heroSubtitle"
              value={form.heroSubtitle}
              onChange={handleChange}
              placeholder="Premium Home Tailoring Service"
            />
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Hero Body Text</label>
              <textarea
                name="heroBody"
                value={form.heroBody}
                onChange={handleChange}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm
                           focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              />
            </div>
          </div>
        </Section>

        {/* Stats */}
        <Section title="Hero Stats">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            <Field
              label="Happy Clients"
              name="clientsCount"
              value={form.clientsCount}
              onChange={handleChange}
              placeholder="5485+"
            />
            <Field
              label="Experience"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="15 Yrs"
            />
            <Field
              label="Tailors & Designers"
              name="tailorsCount"
              value={form.tailorsCount}
              onChange={handleChange}
              placeholder="250+"
            />
            <Field
              label="Products Delivered"
              name="productsCount"
              value={form.productsCount}
              onChange={handleChange}
              placeholder="14580+"
            />
          </div>
        </Section>

        {/* Contact */}
        <Section title="Contact Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 88822 22900"
              hint="Displayed in header and hero section"
            />
            <Field
              label="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="info@callmytailor.com"
              type="email"
            />
            <Field
              label="WhatsApp Number"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              placeholder="918882222900"
              hint="Enter country code + number (no +, spaces, or dashes)"
            />
            <div className="sm:col-span-2">
              <Field
                label="Cities Served"
                name="cities"
                value={form.cities}
                onChange={handleChange}
                placeholder="Delhi · Noida · Gurgaon · Mumbai · Pune"
                hint="Displayed in the header info bar"
              />
            </div>
          </div>
        </Section>

        {/* Preview */}
        <Section title="Live Preview">
          <p className="text-xs text-gray-400 mb-4">This shows how your changes will appear on the site</p>
          <div className="rounded-xl overflow-hidden border border-gray-200">
            {/* Header preview */}
            <div className="bg-[#111c35] text-white text-xs px-4 py-2 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                {form.phone}
              </span>
              <span className="text-white/50">{form.cities}</span>
            </div>
            {/* Hero preview */}
            <div className="bg-[#1a2744] px-6 py-8 text-center">
              <p className="text-yellow-400 font-semibold text-xs uppercase tracking-widest mb-2">{form.heroSubtitle}</p>
              <h2 className="font-heading font-extrabold text-2xl text-white mb-2">{form.heroTitle}</h2>
              <p className="text-white/60 text-xs max-w-sm mx-auto">{form.heroBody}</p>
              <div className="flex justify-center gap-8 mt-6 pt-4 border-t border-white/10">
                {[
                  { v: form.clientsCount, l: 'Happy Clients' },
                  { v: form.experience, l: 'Experience' },
                  { v: form.tailorsCount, l: 'Tailors' },
                  { v: form.productsCount, l: 'Products' },
                ].map(s => (
                  <div key={s.l} className="text-center">
                    <p className="font-heading font-bold text-yellow-400 text-sm">{s.v}</p>
                    <p className="text-white/50 text-[10px] uppercase tracking-wide">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
