/**
 * SERWA Professional - Account / Profile
 *
 * Login (OTP-style) → profile details → dashboard with sidebar (Beauty Garage–inspired, SERWA palette).
 * Persists to localStorage until Shopify Customer Accounts is integrated.
 */

import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  loadAccountState,
  saveAccountState,
  clearAccountState,
  type AccountState,
  type StoredProfile,
  type ProfileGender,
} from '../lib/account-storage'
import { useShopify } from '../lib/shopify'

type DashSection =
  | 'profile'
  | 'addresses'
  | 'orders'
  | 'wishlist'
  | 'recent'
  | 'password'

export default function AccountPage() {
  const { cartCount } = useShopify()
  const [state, setState] = useState<AccountState>(() => loadAccountState())
  const [loginPhone, setLoginPhone] = useState('')
  const [dashSection, setDashSection] = useState<DashSection>('profile')
  const [editing, setEditing] = useState(false)
  const [clock, setClock] = useState(() => new Date().toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', second: '2-digit' }))

  useEffect(() => {
    const t = setInterval(() => setClock(new Date().toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', second: '2-digit' })), 1000)
    return () => clearInterval(t)
  }, [])

  const updateProfile = (patch: Partial<StoredProfile>) => {
    setState(prev => {
      const next = { ...prev, profile: { ...prev.profile, ...patch } }
      saveAccountState(next)
      return next
    })
  }

  const initials = useMemo(() => {
    const a = state.profile.firstName.trim()[0] || ''
    const b = state.profile.lastName.trim()[0] || ''
    return (a + b).toUpperCase() || 'S'
  }, [state.profile.firstName, state.profile.lastName])

  const displayName = [state.profile.firstName, state.profile.lastName].filter(Boolean).join(' ') || 'Serwa guest'

  const requestOtp = () => {
    const digits = loginPhone.replace(/\D/g, '')
    if (digits.length < 10) return
    setState(prev => {
      const next: AccountState = {
        ...prev,
        step: 'setup',
        phoneVerified: true,
        profile: { ...prev.profile, phone: digits.slice(-10) },
      }
      saveAccountState(next)
      return next
    })
  }

  const finishSetup = (e: React.FormEvent) => {
    e.preventDefault()
    setState(prev => {
      const { firstName, lastName, email, phone } = prev.profile
      if (!email.trim() || !email.includes('@')) return prev
      const next: AccountState = {
        ...prev,
        step: 'dashboard',
        profile: {
          ...prev.profile,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.replace(/\D/g, '').slice(-10) || prev.profile.phone,
        },
      }
      saveAccountState(next)
      return next
    })
  }

  const saveProfileEdits = (e: React.FormEvent) => {
    e.preventDefault()
    setState(prev => {
      const { firstName, lastName, email, phone } = prev.profile
      if (!email.trim() || !email.includes('@')) return prev
      const next: AccountState = {
        ...prev,
        profile: {
          ...prev.profile,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.replace(/\D/g, '').slice(0, 10),
        },
      }
      saveAccountState(next)
      return next
    })
    setEditing(false)
  }

  const logout = () => {
    clearAccountState()
    setLoginPhone('')
    setDashSection('profile')
    setEditing(false)
    setState(loadAccountState())
  }

  const divider = (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-serwa-accent/20" />
      <span className="text-xs text-serwa-secondary/50 uppercase tracking-wider">Or</span>
      <div className="flex-1 h-px bg-serwa-accent/20" />
    </div>
  )

  /* ===================== Login (OTP-style) ===================== */
  if (state.step === 'login') {
    return (
      <div className="min-h-[calc(100vh-12rem)] bg-serwa-primary py-12 md:py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <p className="text-center text-sm text-serwa-secondary/60 mb-2">Welcome back</p>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-serwa-secondary text-center mb-2">Login with OTP</h1>
          <p className="text-center text-sm text-serwa-secondary/70 mb-8">Enter your 10-digit mobile number. Demo skips real SMS.</p>

          <div className="rounded-2xl border border-serwa-accent/15 bg-white/70 backdrop-blur-sm shadow-lg p-6 sm:p-8">
            <label className="block text-xs font-semibold uppercase tracking-wider text-serwa-secondary/60 mb-2">Phone number</label>
            <div className="flex rounded-xl border border-serwa-accent/25 overflow-hidden bg-serwa-primary/50 focus-within:ring-2 focus-within:ring-serwa-accent/40">
              <span className="shrink-0 px-3 py-3 text-sm font-medium text-serwa-secondary/80 border-r border-serwa-accent/15 bg-serwa-accent/5">
                +91
              </span>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="98765 43210"
                value={loginPhone}
                onChange={e => setLoginPhone(e.target.value)}
                className="flex-1 min-w-0 px-4 py-3 bg-transparent text-serwa-secondary placeholder:text-serwa-secondary/40 focus:outline-none text-sm"
              />
            </div>
            <button
              type="button"
              onClick={requestOtp}
              className="w-full mt-6 btn-primary rounded-xl py-3.5 text-sm uppercase tracking-wide"
            >
              Request OTP
            </button>
            <p className="text-center text-xs text-serwa-secondary/50 mt-3">A 4-digit OTP would be sent in production.</p>

            {divider}

            <p className="text-center text-xs text-serwa-secondary/50 uppercase tracking-wider mb-4">Sign in with</p>
            <button
              type="button"
              onClick={() =>
                setState(prev => {
                  const next = { ...prev, step: 'setup' as const, phoneVerified: true }
                  saveAccountState(next)
                  return next
                })
              }
              className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-serwa-secondary/25 py-3 text-sm font-medium text-serwa-secondary hover:border-serwa-accent/50 hover:bg-serwa-accent/5 transition-colors"
            >
              <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </button>

            {divider}

            <p className="text-center text-xs text-serwa-secondary/50 uppercase tracking-wider mb-4">Continue with</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setState(prev => {
                    const next = { ...prev, step: 'setup' as const, phoneVerified: true }
                    saveAccountState(next)
                    return next
                  })
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-serwa-accent text-serwa-primary py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <span className="font-bold">f</span>
                Facebook
              </button>
              <button
                type="button"
                onClick={() =>
                  setState(prev => {
                    const next = { ...prev, step: 'setup' as const, phoneVerified: true }
                    saveAccountState(next)
                    return next
                  })
                }
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-serwa-accent/30 bg-white py-3 text-sm font-semibold text-serwa-secondary hover:border-serwa-accent/50 transition-colors"
              >
                <span className="text-serwa-accent font-bold">G</span>
                Google
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-serwa-secondary/45 mt-8">
            <Link to="/shop" className="text-serwa-accent hover:underline">
              Continue shopping
            </Link>
          </p>
        </motion.div>
      </div>
    )
  }

  /* ===================== Profile setup ===================== */
  if (state.step === 'setup') {
    return (
      <div className="min-h-[calc(100vh-12rem)] bg-serwa-primary py-12 md:py-16 px-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto">
          <p className="text-center text-sm text-serwa-secondary/60 mb-2">Hello! We just need a few more details.</p>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-serwa-secondary text-center mb-8">Profile details</h1>

          <form
            onSubmit={finishSetup}
            className="rounded-2xl border border-serwa-accent/15 bg-white/70 backdrop-blur-sm shadow-lg p-6 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-serwa-secondary/70 mb-1.5">First name</label>
                <input
                  required
                  className="w-full rounded-xl border border-serwa-accent/20 bg-serwa-primary/40 px-4 py-3 text-sm text-serwa-secondary placeholder:text-serwa-secondary/40 focus:outline-none focus:ring-2 focus:ring-serwa-accent/35"
                  placeholder="First name"
                  value={state.profile.firstName}
                  onChange={e => updateProfile({ firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-serwa-secondary/70 mb-1.5">Last name</label>
                <input
                  required
                  className="w-full rounded-xl border border-serwa-accent/20 bg-serwa-primary/40 px-4 py-3 text-sm text-serwa-secondary placeholder:text-serwa-secondary/40 focus:outline-none focus:ring-2 focus:ring-serwa-accent/35"
                  placeholder="Last name"
                  value={state.profile.lastName}
                  onChange={e => updateProfile({ lastName: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-serwa-secondary/70 mb-1.5">Phone number</label>
              <div className="flex rounded-xl border border-serwa-accent/20 overflow-hidden bg-serwa-primary/40">
                <span className="shrink-0 px-3 py-3 text-sm border-r border-serwa-accent/15 bg-serwa-accent/5">+91</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  className="flex-1 min-w-0 px-4 py-3 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-serwa-accent/35"
                  value={state.profile.phone}
                  onChange={e => updateProfile({ phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-serwa-secondary/70 mb-1.5">Email</label>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-serwa-accent/20 bg-serwa-primary/40 px-4 py-3 text-sm text-serwa-secondary placeholder:text-serwa-secondary/40 focus:outline-none focus:ring-2 focus:ring-serwa-accent/35"
                placeholder="you@example.com"
                value={state.profile.email}
                onChange={e => updateProfile({ email: e.target.value })}
              />
            </div>
            <button type="submit" className="w-full btn-primary rounded-xl py-3.5 text-sm uppercase tracking-wide mt-2">
              Update and sign in
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  /* ===================== Dashboard ===================== */
  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const sidebarItems: { id: DashSection; label: string; badge?: string | number }[] = [
    { id: 'profile', label: 'My profile' },
    { id: 'addresses', label: 'Delivery address', badge: 0 },
    { id: 'orders', label: 'Order history', badge: 0 },
    { id: 'wishlist', label: 'My wishlist', badge: 0 },
    { id: 'recent', label: 'Recently viewed' },
    { id: 'password', label: 'Change password' },
  ]

  return (
    <div className="bg-serwa-primary min-h-screen py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="rounded-2xl border border-serwa-accent/12 bg-white/60 backdrop-blur-sm shadow-md overflow-hidden">
              <div className="p-4 border-b border-serwa-accent/10 bg-serwa-accent/5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-serwa-secondary text-serwa-primary flex items-center justify-center text-sm font-bold font-serif">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-serwa-secondary truncate text-sm">{displayName}</p>
                    <p className="text-xs text-serwa-secondary/55 flex items-center gap-1 mt-0.5">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {clock}
                    </p>
                  </div>
                </div>
              </div>
              <nav className="p-2" aria-label="Account sections">
                {sidebarItems.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDashSection(item.id)}
                    className={`w-full flex items-center justify-between gap-2 text-left px-3 py-2.5 rounded-xl text-sm transition-colors ${
                      dashSection === item.id
                        ? 'bg-serwa-accent/15 text-serwa-secondary font-semibold border-l-4 border-serwa-accent -ml-0.5 pl-2.5'
                        : 'text-serwa-secondary/75 hover:bg-serwa-accent/8'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded-md bg-serwa-secondary/10 text-serwa-secondary/70">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
                <div className="my-2 border-t border-serwa-accent/10" />
                <div className="px-3 py-2 rounded-xl bg-serwa-primary/50 border border-serwa-accent/10 mb-2">
                  <p className="text-[10px] uppercase tracking-wider text-serwa-secondary/50">Loyalty</p>
                  <p className="text-sm font-semibold text-serwa-secondary">₹0.00</p>
                </div>
                <Link
                  to="/cart"
                  className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm text-serwa-secondary/75 hover:bg-serwa-accent/8 transition-colors"
                >
                  <span>Shopping cart</span>
                  <span className="text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded-md bg-serwa-secondary/10 text-serwa-secondary/70">
                    {cartCount}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-serwa-accent font-medium hover:bg-serwa-accent/10 transition-colors"
                >
                  Log out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            <h1 className="font-serif text-2xl md:text-3xl font-semibold text-serwa-secondary mb-6 text-center lg:text-left">
              {greeting()}! {state.profile.firstName || 'there'}.
            </h1>

            <AnimatePresence mode="wait">
              {dashSection === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="rounded-2xl border border-serwa-accent/12 bg-white/70 backdrop-blur-md shadow-lg overflow-hidden relative"
                >
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      type="button"
                      onClick={() => setEditing(e => !e)}
                      className="p-2 rounded-lg text-serwa-secondary/60 hover:text-serwa-accent hover:bg-serwa-accent/10 transition-colors"
                      aria-label={editing ? 'Done editing' : 'Edit profile'}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>

                  <form onSubmit={saveProfileEdits} className="p-6 sm:p-8">
                    <h2 className="font-semibold text-serwa-secondary mb-6 text-lg">Personal information</h2>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-semibold text-serwa-secondary/60 mb-1.5">First name</label>
                        <input
                          disabled={!editing}
                          className="w-full rounded-xl border border-serwa-accent/20 bg-serwa-primary/35 px-4 py-3 text-sm disabled:opacity-80"
                          value={state.profile.firstName}
                          onChange={e => updateProfile({ firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-serwa-secondary/60 mb-1.5">Last name</label>
                        <input
                          disabled={!editing}
                          className="w-full rounded-xl border border-serwa-accent/20 bg-serwa-primary/35 px-4 py-3 text-sm disabled:opacity-80"
                          value={state.profile.lastName}
                          onChange={e => updateProfile({ lastName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-serwa-secondary/60 mb-1.5">Email</label>
                        <input
                          type="email"
                          disabled={!editing}
                          className="w-full rounded-xl border border-serwa-accent/20 bg-serwa-primary/35 px-4 py-3 text-sm disabled:opacity-80"
                          value={state.profile.email}
                          onChange={e => updateProfile({ email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-serwa-secondary/60 mb-1.5">Contact number</label>
                        <div className="flex rounded-xl border border-serwa-accent/20 overflow-hidden bg-serwa-primary/35">
                          <span className="shrink-0 px-3 py-3 text-xs text-serwa-secondary/60 border-r border-serwa-accent/15 bg-serwa-accent/5">
                            +91
                          </span>
                          <input
                            disabled={!editing}
                            type="tel"
                            inputMode="numeric"
                            className="flex-1 min-w-0 px-4 py-3 text-sm bg-transparent focus:outline-none disabled:opacity-80"
                            value={state.profile.phone}
                            onChange={e => updateProfile({ phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-xs font-semibold text-serwa-secondary/60 mb-1.5">Birthdate</label>
                      <div className="grid grid-cols-3 gap-2 max-w-xs">
                        {(['birthDay', 'birthMonth', 'birthYear'] as const).map((field, i) => (
                          <input
                            key={field}
                            disabled={!editing}
                            placeholder={i === 0 ? 'DD' : i === 1 ? 'MM' : 'YYYY'}
                            className="rounded-xl border border-serwa-accent/20 bg-serwa-primary/35 px-3 py-2.5 text-sm text-center disabled:opacity-80"
                            value={state.profile[field]}
                            onChange={e => updateProfile({ [field]: e.target.value.replace(/\D/g, '').slice(0, i === 2 ? 4 : 2) })}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="block text-xs font-semibold text-serwa-secondary/60 mb-2">Gender</label>
                      <div className="flex flex-wrap gap-4">
                        {(
                          [
                            ['male', 'Male'],
                            ['female', 'Female'],
                            ['other', 'Other'],
                          ] as const
                        ).map(([val, lab]) => (
                          <label key={val} className={`flex items-center gap-2 text-sm ${!editing ? 'opacity-80' : ''}`}>
                            <input
                              type="radio"
                              name="gender"
                              disabled={!editing}
                              checked={state.profile.gender === val}
                              onChange={() => updateProfile({ gender: val as ProfileGender })}
                              className="accent-serwa-accent"
                            />
                            {lab}
                          </label>
                        ))}
                      </div>
                    </div>

                    {editing && (
                      <button type="submit" className="btn-primary rounded-xl px-8 py-3 text-sm uppercase tracking-wide">
                        Save changes
                      </button>
                    )}
                  </form>
                </motion.div>
              )}

              {dashSection !== 'profile' && (
                <motion.div
                  key={dashSection}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="rounded-2xl border border-serwa-accent/12 bg-white/70 backdrop-blur-md shadow-lg p-8 text-center"
                >
                  <p className="text-serwa-secondary/80 text-sm mb-4">
                    {dashSection === 'addresses' && 'Save delivery addresses here once checkout accounts are connected.'}
                    {dashSection === 'orders' && (
                      <>
                        Track purchases from your cart.{' '}
                        <Link to="/cart" className="text-serwa-accent font-medium hover:underline">
                          View cart
                        </Link>
                      </>
                    )}
                    {dashSection === 'wishlist' && 'Wishlist syncs when you sign in with Shopify Customer API.'}
                    {dashSection === 'recent' && 'Recently viewed products will appear after browsing with analytics enabled.'}
                    {dashSection === 'password' && 'Password changes run through your login provider in production.'}
                  </p>
                  <Link to="/shop" className="text-serwa-accent text-sm font-medium hover:underline">
                    Browse the shop
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}
