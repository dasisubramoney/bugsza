import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCookieConsent } from '../lib/useCookieConsent'

export function CookieBanner() {
  const { showBanner, accept, decline } = useCookieConsent()

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-x-0 bottom-0 z-[60] border-t-2 border-bugs-orange bg-bugs-black px-4 py-5 sm:px-6 lg:px-8"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="font-body text-sm text-bugs-white/80">
              This site doesn&rsquo;t use tracking cookies yet. If we add
              analytics in future, your choice here decides whether it
              runs. Read our{' '}
              <Link to="/privacy" className="text-bugs-yellow underline">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex flex-shrink-0 items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={decline}
                className="rounded-full border-2 border-bugs-white/30 px-5 py-2.5 font-display text-sm text-bugs-white transition-colors hover:border-bugs-white"
              >
                Decline
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={accept}
                className="rounded-full bg-bugs-yellow px-5 py-2.5 font-display text-sm text-bugs-black shadow-hard"
              >
                Accept
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
