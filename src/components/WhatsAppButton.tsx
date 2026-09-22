import { motion } from 'framer-motion'
import { WhatsAppIcon } from './icons'
import { WHATSAPP_URL } from '../lib/businessInfo'
import { useCookieConsent } from '../lib/useCookieConsent'

export function WhatsAppButton() {
  const { showBanner } = useCookieConsent()

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        // Step up above the cookie banner while it's showing, rather than
        // sitting underneath it.
        y: showBanner ? -84 : 0,
      }}
      transition={{
        opacity: { delay: 1, duration: 0.4 },
        scale: { delay: 1, duration: 0.4, ease: 'backOut' },
        y: { duration: 0.3, ease: 'easeOut' },
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-bugs-black bg-[#25D366] text-white shadow-hard sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </motion.a>
  )
}
