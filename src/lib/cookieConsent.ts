/**
 * Single source of truth for the cookie-consent choice, stored in
 * localStorage so it persists across visits without needing a cookie of
 * its own. No analytics/tracking runs on the site yet — this exists so
 * the choice is already in place for whenever that's added; at that
 * point, wrap the analytics script loader in `hasAnalyticsConsent()`
 * rather than loading it unconditionally.
 */
export type ConsentChoice = 'accepted' | 'declined'

const STORAGE_KEY = 'bugs-cookie-consent'

export function readStoredConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'accepted' || value === 'declined' ? value : null
  } catch {
    // Private browsing / storage disabled — treat as "no choice made yet"
    // rather than throwing, so the banner still renders sensibly.
    return null
  }
}

export function storeConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // Nothing we can do if storage is unavailable; the banner will just
    // reappear next visit, which is an acceptable degradation.
  }
}

export function hasAnalyticsConsent(): boolean {
  return readStoredConsent() === 'accepted'
}
