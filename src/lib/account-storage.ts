/**
 * Lightweight client-side account state for demo / until Shopify Customer API is wired.
 */

export type ProfileGender = 'male' | 'female' | 'other'

export interface StoredProfile {
  firstName: string
  lastName: string
  phone: string
  email: string
  birthDay: string
  birthMonth: string
  birthYear: string
  gender: ProfileGender | ''
}

export type AccountStep = 'login' | 'setup' | 'dashboard'

export interface AccountState {
  step: AccountStep
  /** Set after "OTP" step so we know user progressed */
  phoneVerified: boolean
  profile: StoredProfile
}

const KEY = 'serwa_account_v1'

const defaultProfile = (): StoredProfile => ({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  birthDay: '',
  birthMonth: '',
  birthYear: '',
  gender: '',
})

export function loadAccountState(): AccountState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) {
      return {
        step: 'login',
        phoneVerified: false,
        profile: defaultProfile(),
      }
    }
    const parsed = JSON.parse(raw) as Partial<AccountState>
    return {
      step: parsed.step === 'setup' || parsed.step === 'dashboard' ? parsed.step : 'login',
      phoneVerified: Boolean(parsed.phoneVerified),
      profile: { ...defaultProfile(), ...parsed.profile },
    }
  } catch {
    return {
      step: 'login',
      phoneVerified: false,
      profile: defaultProfile(),
    }
  }
}

export function saveAccountState(state: AccountState) {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function clearAccountState() {
  localStorage.removeItem(KEY)
}
