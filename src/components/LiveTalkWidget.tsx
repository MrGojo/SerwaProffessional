/**
 * Floating Live Talk widget — collapsed pill + multi-tab consultation panel.
 * Tabs: Video | Schedule | Chat | Call | WhatsApp
 */

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { contactConfig, openExternal, telUrl, whatsappUrl } from '../config/contact'

type SupportTab = 'video' | 'calendar' | 'chat' | 'phone' | 'whatsapp'

const tabTitles: Record<SupportTab, string> = {
  video: 'Video chat',
  calendar: 'Schedule Meeting',
  chat: 'Chat',
  phone: 'Call us',
  whatsapp: 'Whatsapp',
}

const tabFooterLabels: Record<SupportTab, string> = {
  video: 'Video',
  calendar: 'Schedule',
  chat: 'Chat',
  phone: 'Phone',
  whatsapp: 'WhatsApp',
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const

function ExpertAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const [error, setError] = useState(false)
  const sizes = { sm: 'w-11 h-11', md: 'w-14 h-14', lg: 'w-16 h-16' }

  return (
    <div
      className={`${sizes[size]} rounded-full border-2 border-white bg-serwa-secondary shrink-0 overflow-hidden shadow-[0_0_18px_rgba(46,46,74,0.45)]`}
    >
      {!error ? (
        <img
          src={contactConfig.avatar}
          alt={contactConfig.expertName}
          className="w-full h-full object-cover object-top"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-serwa-secondary">
          <svg className="w-1/2 h-1/2 text-serwa-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )}
    </div>
  )
}

function WidgetHeader({
  title,
  onClose,
}: {
  title: string
  onClose: () => void
}) {
  return (
    <div className="relative bg-serwa-accent text-serwa-primary px-5 pt-4 pb-5 overflow-hidden">
      <div className="absolute inset-0 opacity-20" aria-hidden>
        <span className="absolute top-3 left-8 w-10 h-10 rounded-full border border-white/40" />
        <span className="absolute top-10 right-12 w-16 h-16 rounded-full border border-white/30" />
        <span className="absolute -bottom-4 left-1/3 w-20 h-20 rounded-full border border-white/25" />
        <span className="absolute top-16 left-1/2 w-6 h-6 rounded-full border border-white/20" />
      </div>

      <div className="relative flex items-center justify-between mb-4">
        <p className="font-semibold text-sm tracking-wide flex-1 text-center pr-6">{title}</p>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-0 p-1 rounded-full hover:bg-white/15 transition-colors"
          aria-label="Minimize live talk"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="relative flex items-center gap-3">
        <ExpertAvatar size="lg" />
        <div>
          <p className="font-semibold text-base">{contactConfig.expertName}</p>
          <p className="flex items-center gap-1.5 text-xs text-serwa-primary/80">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" aria-hidden />
            Online now
          </p>
        </div>
      </div>
    </div>
  )
}

function IconVideo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  )
}

function IconPhone({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function IconCalendar({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function IconChat({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}

function IconWhatsApp({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const footerTabs: { id: SupportTab; label: string; icon: typeof IconVideo }[] = [
  { id: 'video', label: 'Video', icon: IconVideo },
  { id: 'calendar', label: 'Schedule', icon: IconCalendar },
  { id: 'chat', label: 'Chat', icon: IconChat },
  { id: 'phone', label: 'Call', icon: IconPhone },
  { id: 'whatsapp', label: 'WhatsApp', icon: IconWhatsApp },
]

function PrimaryButton({
  children,
  onClick,
  type = 'button',
}: {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full rounded-full bg-serwa-accent text-serwa-primary py-3.5 font-semibold text-sm hover:brightness-105 transition"
    >
      {children}
    </button>
  )
}

function MiniCalendar({
  month,
  selected,
  onSelect,
  onPrevMonth,
  onNextMonth,
}: {
  month: Date
  selected: Date | null
  onSelect: (date: Date) => void
  onPrevMonth: () => void
  onNextMonth: () => void
}) {
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const { days, monthLabel } = useMemo(() => {
    const year = month.getFullYear()
    const m = month.getMonth()
    const firstDay = new Date(year, m, 1).getDay()
    const daysInMonth = new Date(year, m + 1, 0).getDate()
    const cells: (Date | null)[] = []

    for (let i = 0; i < firstDay; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, m, d))

    return {
      days: cells,
      monthLabel: month.toLocaleString('en-US', { month: 'long' }),
    }
  }, [month])

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

  return (
    <div className="rounded-xl border border-serwa-secondary/10 bg-serwa-primary/40 p-3 text-left">
      <div className="flex items-center justify-between mb-3 px-1">
        <button type="button" onClick={onPrevMonth} className="p-1 text-serwa-secondary/50 hover:text-serwa-secondary" aria-label="Previous month">
          ‹
        </button>
        <span className="text-sm font-semibold text-serwa-secondary">{monthLabel}</span>
        <button type="button" onClick={onNextMonth} className="p-1 text-serwa-secondary/50 hover:text-serwa-secondary" aria-label="Next month">
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-serwa-secondary/45 mb-1">
        {WEEKDAYS.map((d, i) => (
          <span key={`${d}-${i}`}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, i) => {
          if (!date) return <span key={`empty-${i}`} />
          const past = date < today
          const selectedDay = selected && isSameDay(date, selected)
          const isToday = isSameDay(date, today)
          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={past}
              onClick={() => onSelect(date)}
              className={`aspect-square rounded-lg text-xs font-medium transition-colors ${
                past
                  ? 'text-serwa-secondary/25 cursor-not-allowed'
                  : selectedDay
                    ? 'border-2 border-serwa-accent text-serwa-secondary bg-white'
                    : isToday
                      ? 'text-serwa-accent font-semibold hover:bg-serwa-accent/10'
                      : 'text-serwa-secondary/70 hover:bg-serwa-accent/10'
              }`}
            >
              {date.getDate()}
              {selectedDay && (
                <span className="block w-1 h-1 rounded-full bg-serwa-secondary mx-auto mt-0.5" aria-hidden />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function VideoTab() {
  return (
    <div className="text-center">
      <h3 className="font-serif text-xl leading-snug text-serwa-secondary mb-6">
        Hi, let&apos;s chat and solve all your hair concerns
      </h3>
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => openExternal(whatsappUrl('Hi SERWA, I would like a video consultation about professional treatments.'))}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-serwa-accent text-serwa-primary py-3.5 font-semibold text-sm hover:brightness-105 transition"
        >
          <IconVideo className="w-5 h-5" />
          Video Call
        </button>
        <button
          type="button"
          onClick={() => openExternal(telUrl())}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-serwa-accent/10 text-serwa-secondary py-3.5 font-semibold text-sm hover:bg-serwa-accent/15 transition"
        >
          <IconPhone className="w-5 h-5" />
          Audio call
        </button>
      </div>
    </div>
  )
}

function ScheduleTab() {
  const [month, setMonth] = useState(() => new Date())
  const [selected, setSelected] = useState<Date | null>(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  })

  const handleNext = () => {
    if (!selected) return
    const label = selected.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    openExternal(
      whatsappUrl(`Hi SERWA, I would like to schedule a consultation on ${label}. (${contactConfig.timezone})`),
    )
  }

  return (
    <div className="text-left">
      <h3 className="font-serif text-lg text-serwa-secondary mb-4">Let&apos;s schedule a meeting</h3>
      <MiniCalendar
        month={month}
        selected={selected}
        onSelect={setSelected}
        onPrevMonth={() => setMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
        onNextMonth={() => setMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
      />
      <div className="flex items-center gap-2 mt-4 text-xs text-serwa-secondary/70">
        <svg className="w-4 h-4 text-serwa-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{contactConfig.timezone}</span>
      </div>
      <div className="mt-5">
        <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
      </div>
    </div>
  )
}

function ChatTab() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = [
      'Hi SERWA, I would like a free one-on-one consultation.',
      name && `Name: ${name}`,
      email && `Email: ${email}`,
      phone && `Phone: +91 ${phone}`,
    ]
      .filter(Boolean)
      .join('\n')
    openExternal(whatsappUrl(msg))
  }

  return (
    <form onSubmit={handleSend} className="text-left">
      <p className="text-sm text-serwa-secondary/80 leading-relaxed mb-4">
        Please provide your name, number, and email to schedule a free one-on-one consultation for all your
        hair concerns.
      </p>
      <div className="rounded-xl border border-serwa-secondary/10 bg-serwa-primary/30 p-4 space-y-3">
        <p className="font-semibold text-serwa-secondary text-sm">Live Talk</p>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-serwa-secondary/15 bg-white text-sm text-serwa-secondary placeholder:text-serwa-secondary/40 focus:outline-none focus:ring-2 focus:ring-serwa-accent/30"
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-serwa-secondary/15 bg-white text-sm text-serwa-secondary placeholder:text-serwa-secondary/40 focus:outline-none focus:ring-2 focus:ring-serwa-accent/30"
        />
        <div className="flex rounded-lg border border-serwa-secondary/15 bg-white overflow-hidden">
          <span className="flex items-center gap-1.5 px-3 text-sm text-serwa-secondary/70 border-r border-serwa-secondary/10 shrink-0">
            <span aria-hidden>🇮🇳</span> +91
          </span>
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className="flex-1 px-3 py-2.5 text-sm text-serwa-secondary placeholder:text-serwa-secondary/40 focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-5">
        <PrimaryButton type="submit">Send</PrimaryButton>
      </div>
    </form>
  )
}

function CallTab() {
  return (
    <div className="text-center">
      <h3 className="font-serif text-xl text-serwa-secondary mb-6">Want to hear my voice?</h3>
      <div className="relative mx-auto w-36 h-36 mb-6">
        <span className="absolute top-2 left-2 w-8 h-8 rounded-full bg-serwa-accent/10 flex items-center justify-center text-serwa-secondary/30" aria-hidden>
          <IconPhone className="w-4 h-4" />
        </span>
        <span className="absolute bottom-4 right-0 w-7 h-7 rounded-full bg-serwa-accent/10 flex items-center justify-center text-serwa-secondary/25" aria-hidden>
          <IconPhone className="w-3.5 h-3.5" />
        </span>
        <span className="absolute top-1/2 -left-1 w-6 h-6 rounded-full bg-serwa-accent/10 flex items-center justify-center text-serwa-secondary/20" aria-hidden>
          <IconPhone className="w-3 h-3" />
        </span>
        <div className="absolute inset-4 rounded-full bg-serwa-accent/15 flex items-center justify-center">
          <IconPhone className="w-10 h-10 text-serwa-secondary" />
        </div>
      </div>
      <p className="flex items-center justify-center gap-2 text-serwa-secondary font-medium mb-6">
        <span aria-hidden>🇮🇳</span>
        {contactConfig.phoneDisplay}
      </p>
      <PrimaryButton onClick={() => openExternal(telUrl())}>Call now</PrimaryButton>
    </div>
  )
}

function WhatsAppTab() {
  return (
    <div className="text-center">
      <div className="relative mx-auto w-40 h-32 mb-6">
        <span className="absolute top-0 left-6 w-8 h-8 rounded-full bg-[#25D366]/15 flex items-center justify-center" aria-hidden>
          <IconWhatsApp className="w-4 h-4 text-[#25D366]/60" />
        </span>
        <span className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#25D366]/10 flex items-center justify-center" aria-hidden>
          <IconWhatsApp className="w-3 h-3 text-[#25D366]/50" />
        </span>
        <span className="absolute bottom-2 left-10 w-7 h-7 rounded-full bg-[#25D366]/10 flex items-center justify-center" aria-hidden>
          <IconWhatsApp className="w-3.5 h-3.5 text-[#25D366]/45" />
        </span>
        <div className="absolute inset-x-8 top-6 bottom-2 rounded-full bg-[#25D366]/20 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg">
            <IconWhatsApp className="w-9 h-9 text-white" />
          </div>
        </div>
      </div>
      <h3 className="font-serif text-xl text-serwa-secondary mb-6">Let&apos;s start Whatsapp chat</h3>
      <PrimaryButton onClick={() => openExternal(whatsappUrl())}>Start Chat</PrimaryButton>
    </div>
  )
}

function TabBody({ tab }: { tab: SupportTab }) {
  switch (tab) {
    case 'video':
      return <VideoTab />
    case 'calendar':
      return <ScheduleTab />
    case 'chat':
      return <ChatTab />
    case 'phone':
      return <CallTab />
    case 'whatsapp':
      return <WhatsAppTab />
  }
}

export default function LiveTalkWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<SupportTab>('video')

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="pointer-events-auto w-[min(100vw-2rem,340px)] rounded-[1.75rem] overflow-hidden bg-white shadow-[0_20px_60px_rgba(46,46,74,0.28)] border border-serwa-secondary/10"
          >
            <WidgetHeader title={tabTitles[activeTab]} onClose={() => setIsOpen(false)} />

            <div className="px-5 py-5 min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <TabBody tab={activeTab} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="px-4 pb-4 pt-1 border-t border-serwa-secondary/5">
              <p className="text-[10px] text-center text-serwa-secondary/40 mb-1 uppercase tracking-wider">
                {tabFooterLabels[activeTab]}
              </p>
              <div className="flex items-center justify-between gap-1 py-1">
                {footerTabs.map(tab => {
                  const Icon = tab.icon
                  const active = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center gap-1 flex-1 py-1.5 rounded-lg transition-colors ${
                        active ? 'text-serwa-accent' : 'text-serwa-secondary/45 hover:text-serwa-secondary/70'
                      }`}
                      aria-label={tab.label}
                      aria-current={active ? 'page' : undefined}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  )
                })}
              </div>
              <p className="text-[10px] text-center text-serwa-secondary/35 tracking-wide mt-1">
                Powered by{' '}
                <Link to="/help#contact" className="hover:text-serwa-accent transition-colors">
                  SERWA Support
                </Link>
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="pill"
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(true)}
            className="pointer-events-auto group relative flex items-center pl-5 pr-2 py-2 rounded-full bg-gradient-to-r from-serwa-secondary to-[#3f3f62] text-serwa-primary shadow-[0_8px_30px_rgba(46,46,74,0.35)] hover:shadow-[0_12px_36px_rgba(46,46,74,0.42)] transition-shadow"
            aria-label="Open live talk"
          >
            <span className="font-semibold text-sm pr-14 whitespace-nowrap">Live Talk</span>
            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1">
              <ExpertAvatar size="md" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
