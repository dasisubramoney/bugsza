import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import bugsLogo from '../assets/Bugz_co_za_Updated_Logo.webp'
import goingSmartLogo from '../assets/Going_Smart-badge.webp'
import innovationCentreLogo from '../assets/Innovation_Centre_Logo-badge.webp'
import innovationCentreLogoSm from '../assets/Innovation_Centre_Logo-badge-sm.webp'

const cardSizeClass = 'h-44 w-full max-w-xs sm:h-48 lg:w-72'
const cardClass = `group relative flex ${cardSizeClass} flex-col items-center justify-center gap-3 overflow-hidden border-4 border-bugs-black bg-white p-6 shadow-hard-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_#0A0A0A]`
// The outer wrapper needs the same width as the card itself — without it,
// this div has no definite width in the flex-col mobile layout, so it
// shrinks to fit its content instead of filling up to max-w-xs, and two
// cards with differently-sized logos end up visibly different widths.
const cardWrapperClass = 'w-full max-w-xs lg:w-72'

function PartnerBadge() {
  return (
    <span className="absolute left-3 top-3 -skew-x-12 border-2 border-bugs-black bg-bugs-black px-3 py-1">
      <span className="inline-block skew-x-12 font-display text-[10px] uppercase tracking-wider text-white">
        Partner
      </span>
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
        <div className={cardWrapperClass}>
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
              width={500}
              height={156}
              className="h-20 w-full max-w-[220px] object-contain sm:h-24"
            />
            <VisitHint />
          </Link>
        </div>

        <div
          className={`relative flex ${cardSizeClass} items-center justify-center overflow-hidden border-4 border-bugs-black bg-bugs-orange p-4 shadow-hard-lg`}
        >
          <img
            src={bugsLogo}
            alt="BUGZ — portable backup power for gates and garages. Keep Rollin'."
            width={440}
            height={239}
            className="h-full w-full object-contain"
          />
        </div>

        <div className={cardWrapperClass}>
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
              srcSet={`${innovationCentreLogoSm} 160w, ${innovationCentreLogo} 300w`}
              sizes="(min-width: 640px) 96px, 80px"
              alt="The Innovation Centre"
              loading="lazy"
              width={300}
              height={300}
              className="h-20 w-20 rounded-full object-contain sm:h-24 sm:w-24"
            />
            <VisitHint />
          </Link>
        </div>
      </div>
    </m.div>
  )
}
