import { useEffect, useState } from 'react'
import { readStoredConsent, storeConsent, type ConsentChoice } from './cookieConsent'

export function useCookieConsent() {
  // Starts null on the server-rendered/prerendered snapshot and on first
  // client render (no localStorage read during render, to avoid a
  // hydration mismatch); the effect below fills in the real stored value
  // right after mount.
  const [consent, setConsent] = useState<ConsentChoice | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setConsent(readStoredConsent())
    setHydrated(true)
  }, [])

  const respond = (choice: ConsentChoice) => {
    storeConsent(choice)
    setConsent(choice)
  }

  return {
    consent,
    // Only show the banner once we know there's genuinely no stored
    // choice — not during the brief window before the effect runs.
    showBanner: hydrated && consent === null,
    accept: () => respond('accepted'),
    decline: () => respond('declined'),
  }
}
