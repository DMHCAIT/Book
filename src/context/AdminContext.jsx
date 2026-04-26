import { createContext, useContext, useReducer } from 'react'
import {
  mensProducts as defaultMens,
  womensProducts as defaultWomens,
  alterationServices as defaultAlt,
} from '../data/products'

const AdminContext = createContext()

const DEFAULT_CREDS = { username: 'admin', password: 'admin123' }
function loadCreds() {
  try {
    const v = localStorage.getItem('admin_creds')
    return v ? JSON.parse(v) : DEFAULT_CREDS
  } catch { return DEFAULT_CREDS }
}

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
}

const initial = {
  authed: load('admin_authed', false),
  creds: loadCreds(),
  mensProducts:      load('admin_mens_v2',    defaultMens),
  womensProducts:    load('admin_womens_v2',  defaultWomens),
  alterationServices:load('admin_alt_v2',     defaultAlt),
  bookings:          load('admin_bookings',   []),
  settings: load('admin_settings', {
    heroTitle: 'Book a Home Visit',
    heroSubtitle: 'Premium Home Tailoring Service',
    heroBody: 'We are a group of expert tailors to provide you the best tailoring experience — at your doorstep.',
    phone: '+91 88822 22900',
    email: 'info@callmytailor.com',
    whatsapp: '918882222900',
    cities: 'Delhi · Noida · Gurgaon · Faridabad · Ghaziabad · Mumbai · Pune',
    clientsCount: '5485+',
    experience: '15 Yrs',
    tailorsCount: '250+',
    productsCount: '14580+',
  }),
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN': {
      save('admin_authed', true)
      return { ...state, authed: true }
    }
    case 'LOGOUT': {
      save('admin_authed', false)
      return { ...state, authed: false }
    }
    case 'SET_PRODUCTS': {
      const storageKey =
        action.cat === 'mens'   ? 'admin_mens_v2'
        : action.cat === 'womens' ? 'admin_womens_v2'
        : 'admin_alt_v2'
      save(storageKey, action.payload)
      const key =
        action.cat === 'mens' ? 'mensProducts'
        : action.cat === 'womens' ? 'womensProducts'
        : 'alterationServices'
      return { ...state, [key]: action.payload }
    }
    case 'ADD_BOOKING': {
      const bookings = [action.payload, ...state.bookings]
      save('admin_bookings', bookings)
      return { ...state, bookings }
    }
    case 'UPDATE_BOOKING': {
      const bookings = state.bookings.map(b =>
        b.id === action.id ? { ...b, ...action.changes } : b
      )
      save('admin_bookings', bookings)
      return { ...state, bookings }
    }
    case 'DELETE_BOOKING': {
      const bookings = state.bookings.filter(b => b.id !== action.id)
      save('admin_bookings', bookings)
      return { ...state, bookings }
    }
    case 'CLEAR_BOOKINGS': {
      save('admin_bookings', [])
      return { ...state, bookings: [] }
    }
    case 'UPDATE_SETTINGS': {
      const settings = { ...state.settings, ...action.payload }
      save('admin_settings', settings)
      return { ...state, settings }
    }
    case 'CHANGE_PASSWORD': {
      const creds = { username: action.username, password: action.password }
      save('admin_creds', creds)
      return { ...state, creds }
    }
    default:
      return state
  }
}

export function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial)

  const login = (user, pass) => {
    const creds = loadCreds()
    if (user === creds.username && pass === creds.password) {
      dispatch({ type: 'LOGIN' })
      return true
    }
    return false
  }

  const changePassword = (username, password) =>
    dispatch({ type: 'CHANGE_PASSWORD', username, password })

  const logout = () => dispatch({ type: 'LOGOUT' })

  const setProducts = (cat, products) =>
    dispatch({ type: 'SET_PRODUCTS', cat, payload: products })

  const addBooking = (data) =>
    dispatch({
      type: 'ADD_BOOKING',
      payload: {
        ...data,
        id: `BK-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'Pending',
      },
    })

  const updateBooking = (id, changes) =>
    dispatch({ type: 'UPDATE_BOOKING', id, changes })

  const deleteBooking = (id) => dispatch({ type: 'DELETE_BOOKING', id })
  const clearBookings = () => dispatch({ type: 'CLEAR_BOOKINGS' })

  const updateSettings = (data) =>
    dispatch({ type: 'UPDATE_SETTINGS', payload: data })

  return (
    <AdminContext.Provider
      value={{
        ...state,
        login,
        logout,
        setProducts,
        addBooking,
        updateBooking,
        deleteBooking,
        clearBookings,
        updateSettings,
        changePassword,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
