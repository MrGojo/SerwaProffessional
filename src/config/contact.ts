/**
 * Contact details for Live Talk widget and support links.
 * Update these when client provides final numbers.
 */

export const contactConfig = {
  expertName: 'Hair Expert',
  expertLabel: 'SERWA Professional',
  avatar: '/images/team/owner.jpg',
  /** E.164 without + — e.g. 919876543210 for India */
  whatsapp: '',
  phone: '',
  /** Shown in Call us tab — e.g. +91 88284-42483 */
  phoneDisplay: '+91 ——— ———',
  timezone: '(GMT+05:30) Asia/Calcutta',
  /** Pre-filled WhatsApp message */
  whatsappMessage: 'Hi SERWA, I would like help choosing the right professional treatment.',
}

export function whatsappUrl(message = contactConfig.whatsappMessage) {
  const { whatsapp } = contactConfig
  if (!whatsapp) return '/help#contact'
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`
}

export function telUrl() {
  const { phone } = contactConfig
  if (!phone) return '/help#contact'
  return `tel:${phone.replace(/\s/g, '')}`
}

export function openExternal(url: string) {
  if (url.startsWith('http') || url.startsWith('tel:')) {
    window.open(url, url.startsWith('tel:') ? '_self' : '_blank')
  } else {
    window.location.href = url
  }
}
