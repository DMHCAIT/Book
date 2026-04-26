import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'

function PasswordSection({ changePassword }) {
  const [form, setForm] = useState({ username: '', current: '', newPass: '', confirm: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false })

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
    setSuccess(false)
  }

  const handleSave = () => {
    if (!form.username.trim()) return setError('Username is required')
    if (!form.current.trim()) return setError('Current password is required')
    if (form.newPass.length < 6) return setError('New password must be at least 6 characters')
    if (form.newPass !== form.confirm) return setError('Passwords do not match')

    // Verify current password
    const stored = (() => { try { const v = localStorage.getItem('admin_creds'); return v ? JSON.parse(v) : { username: 'admin', password: 'admin123' } } catch { return { username: 'admin', password: 'admin123' } } })()
    if (form.current !== stored.password) return setError('Current password is incorrect')

    changePassword(form.username.trim(), form.newPass)
    setSuccess(true)
    setForm({ username: '', current: '', newPass: '', confirm: '' })
    setTimeout(() => setSuccess(false), 4000)
  }

  const Eye = ({ field }) => (
    <button type="button" onClick={() => setShow(s => ({ ...s, [field]: !s[field] }))}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
      {show[field]
        ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
        : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
      }
    </button>
  )

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="font-heading font-bold text-gray-700">Change Admin Password</h2>
      </div>
      <div className="p-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Password updated successfully!
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Username</label>
            <input type="text" name="username" value={form.username} onChange={handleChange}
              placeholder="admin"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Password</label>
            <div className="relative">
              <input type={show.current ? 'text' : 'password'} name="current" value={form.current} onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
              <Eye field="current" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Password</label>
            <div className="relative">
              <input type={show.newPass ? 'text' : 'password'} name="newPass" value={form.newPass} onChange={handleChange}
                placeholder="Min. 6 characters"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
              <Eye field="newPass" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm New Password</label>
            <div className="relative">
              <input type={show.confirm ? 'text' : 'password'} name="confirm" value={form.confirm} onChange={handleChange}
                placeholder="Re-enter new password"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" />
              <Eye field="confirm" />
            </div>
          </div>
        </div>
        <button onClick={handleSave}
          className="mt-5 px-6 py-2.5 bg-[#1a2744] hover:bg-[#111c35] text-white font-semibold text-sm rounded-xl transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Update Password
        </button>
      </div>
    </div>
  )
}

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
                   focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}

export default function AdminSettings() {
  const { settings, updateSettings, changePassword } = useAdmin()
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
                           focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
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

        {/* Change Password */}
        <PasswordSection changePassword={changePassword} />

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
              <p className="text-red-500 font-semibold text-xs uppercase tracking-widest mb-2">{form.heroSubtitle}</p>
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
                    <p className="font-heading font-bold text-red-500 text-sm">{s.v}</p>
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
