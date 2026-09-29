import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import bugsLogo from '../assets/Bugz_co_za_Updated_Logo.webp'
import goingSmartLogo from '../assets/Going_Smart.webp'
import innovationCentreLogo from '../assets/Innovation_Centre_Logo.webp'

const cardSizeClass = 'h-44 w-full max-w-xs sm:h-48 lg:w-72'
const cardClass = `group relative flex ${cardSizeClass} flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-4 border-bugs-black bg-white p-6 shadow-hard-lg transition-transform duration-300`

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
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.65 }}
      className="mt-16 w-full"
    >
      <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:flex-nowrap">
        <m.div
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
              className="h-20 w-full max-w-[220px] rounded-lg object-contain sm:h-24"
            />
            <VisitHint />
          </Link>
        </m.div>

        <div
          className={`relative flex ${cardSizeClass} items-center justify-center overflow-hidden rounded-2xl border-4 border-bugs-black bg-bugs-orange p-4 shadow-hard-lg`}
        >
          <img
            src={bugsLogo}
            alt="BUGZ — portable backup power for gates and garages. Keep Rollin'."
            className="h-full w-full rounded-xl object-contain"
          />
        </div>

        <m.div
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
            <img
              src={innovationCentreLogo}
              alt="The Innovation Centre"
              loading="lazy"
              className="h-20 w-20 rounded-full object-contain sm:h-24 sm:w-24"
            />
            <VisitHint />
          </Link>
        </m.div>
      </div>
    </m.div>
  )
}
