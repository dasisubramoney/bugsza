import { Link } from 'react-router-dom'
import { useSmoothScroll } from '../lib/SmoothScroll'
import { NAV_SECTIONS } from '../lib/sections'
import { WhatsAppIcon } from './icons'
import { WHATSAPP_URL } from '../lib/businessInfo'
import logo from '../assets/Bugz_co_za_Updated_Logo.webp'

const SOCIALS = [
  { icon: WhatsAppIcon, label: 'WhatsApp', href: WHATSAPP_URL, placeholder: false },
]

export function Footer() {
  const { scrollTo } = useSmoothScroll()

  return (
    <footer className="bg-bugs-black py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-center">
          <button onClick={() => scrollTo('#top')} aria-label="Back to top">
            <img src={logo} alt="BUGZ — Keep Rollin'" loading="lazy" className="h-14 w-auto" />
          </button>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(`#${id}`)}
                className="font-body text-sm text-bugs-white/70 hover:text-bugs-white"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, label, href, placeholder }) => (
              <a
                key={label}
                href={href}
                target={placeholder ? undefined : '_blank'}
                rel={placeholder ? undefined : 'noreferrer'}
                aria-label={label}
                title={placeholder ? `${label} — placeholder link` : label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-bugs-white/20 text-bugs-white/70 transition-colors hover:border-bugs-yellow hover:text-bugs-yellow"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-bugs-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between sm:pr-20">
          <p className="font-body text-xs text-bugs-white/40">
            © {new Date().getFullYear()} BUGZ. Back Up Gate Solution. All rights reserved.
          </p>
          <div className="flex items-center gap-4 font-body text-xs text-bugs-white/40">
            <Link to="/privacy" className="hover:text-bugs-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-bugs-white">
              Terms &amp; Conditions
            </Link>
          </div>
          <p className="font-display text-xs text-bugs-orange">Keep Rollin&rsquo;</p>
        </div>
      </div>
    </footer>
  )
}
