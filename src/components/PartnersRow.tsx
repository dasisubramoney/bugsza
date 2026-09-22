import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ExternalLink, Lightbulb } from 'lucide-react'
import goingSmartLogo from '../assets/Going_Smart.webp'

const cardClass =
  'group relative flex h-36 w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-4 border-bugs-black bg-white p-6 shadow-hard-lg transition-transform duration-300 sm:h-40 sm:w-80'

function PartnerBadge() {
  return (
    <span className="absolute left-4 top-4 rounded-full bg-bugs-black px-3 py-1 font-display text-[10px] uppercase tracking-wider text-white">
      Partner
    </span>
  )
}

function VisitHint() {
  return (
    <span className="flex items-center gap-1.5 font-display text-xs text-bugs-black/60 transition-colors duration-300 group-hover:text-bugs-orange-text">
      Visit site
      <ExternalLink
        size={13}
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </span>
  )
}

export function PartnersRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.65 }}
      className="mt-16 lg:col-span-2"
    >
      <p className="text-center font-display text-sm uppercase tracking-widest text-bugs-black/60 sm:text-base">
        Our Partners
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:flex-row">
        <motion.div
          whileHover={{ y: -6, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group relative"
        >
          <div className="absolute -inset-2 rounded-2xl bg-bugs-yellow opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-80" />
          <Link
            to="/going-smart"
            target="_blank"
            rel="noopener noreferrer"
            className={cardClass}
            aria-label="Visit Going Smart Energy Solutions (opens in a new tab)"
          >
            <PartnerBadge />
            <img
              src={goingSmartLogo}
              alt="Going Smart Energy Solutions"
              loading="lazy"
              className="h-16 w-full max-w-[220px] rounded-lg object-contain"
            />
            <VisitHint />
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ y: -6, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group relative"
        >
          <div className="absolute -inset-2 rounded-2xl bg-bugs-yellow opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-80" />
          <Link
            to="/innovation-centre"
            target="_blank"
            rel="noopener noreferrer"
            className={cardClass}
            aria-label="Visit The Innovation Centre (opens in a new tab)"
          >
            <PartnerBadge />
            <span className="flex items-center gap-2">
              <Lightbulb size={22} className="text-bugs-orange-dark" strokeWidth={2} />
              <span className="text-center font-display text-xl text-bugs-black">
                The Innovation Centre
              </span>
            </span>
            <VisitHint />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
