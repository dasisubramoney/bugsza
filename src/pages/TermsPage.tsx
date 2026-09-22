import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import {
  BUSINESS_NAME,
  CALLOUT_FEE_DISPLAY,
  INSTALL_NOT_INCLUDED_NOTE,
  PHONE_E164,
  PHONE_E164_SPACED,
  PRICE_DISPLAY,
  PRICE_NOTE,
  SERVICE_AREA,
  WHATSAPP_URL,
} from '../lib/businessInfo'
import logo from '../assets/Bugz_co_za_Updated_Logo.webp'

const h2 = 'font-display text-xl text-bugs-black sm:text-2xl'
const p = 'mt-3 font-body text-bugs-black/70'
const section = 'mt-10'

export function TermsPage() {
  useDocumentMeta({
    title: 'Terms & Conditions | BUGS',
    description:
      'Terms and conditions for using the BUGS website and purchasing the BUGS backup power unit.',
    path: '/terms',
  })

  return (
    <div className="min-h-screen bg-bugs-white">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-sm font-semibold text-bugs-black/60 transition-colors hover:text-bugs-black"
        >
          <ArrowLeft size={16} />
          Back to BUGS
        </Link>
        <img src={logo} alt="BUGZ" className="h-10 w-auto rounded-md" />
      </header>

      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <p className="font-display text-sm uppercase tracking-widest text-bugs-orange-text">
          Terms &amp; Conditions
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight text-bugs-black sm:text-4xl">
          The fine print.
        </h1>
        <p className="mt-4 font-body text-sm text-bugs-black/50">
          Last updated: 22 September 2026.
        </p>

        <div className={section}>
          <h2 className={h2}>Using this website</h2>
          <p className={p}>
            This website provides information about {BUSINESS_NAME}, the
            portable backup power unit it sells, and how to get in touch.
            Product information, pricing, and compatibility details are
            provided in good faith and kept as accurate as possible, but may
            change without notice — always confirm current pricing and
            compatibility with us directly before ordering.
          </p>
        </div>

        <div className={section}>
          <h2 className={h2}>Pricing and installation</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 font-body text-bugs-black/70">
            <li>
              The unit is priced at {PRICE_DISPLAY} ({PRICE_NOTE.toLowerCase()}).
            </li>
            <li>{INSTALL_NOT_INCLUDED_NOTE}</li>
            <li>Installation callout: {CALLOUT_FEE_DISPLAY}</li>
            <li>
              We currently service {SERVICE_AREA}. Delivery cost depends on
              your locality.
            </li>
            <li>
              BUGS currently supports Centurion gate and garage motors only.
              Compatibility with your specific motor should be confirmed
              with us before ordering.
            </li>
          </ul>
        </div>

        <div className={section}>
          <h2 className={h2}>Product warranty</h2>
          <p className={p}>
            The warranty period on the BUGS unit depends on the battery
            used, and is carried by the battery&rsquo;s manufacturer — not
            by {BUSINESS_NAME}. Ask us for the specific battery brand and
            warranty terms that apply to your unit before purchase.
          </p>
        </div>

        <div className={section}>
          <h2 className={h2}>No warranty on website content</h2>
          <p className={p}>
            This website and its content are provided on an
            &ldquo;as is&rdquo; basis for general information. While we try
            to keep everything accurate and up to date, {BUSINESS_NAME}
            makes no warranty, express or implied, regarding the completeness
            or accuracy of the information on this site, and won&rsquo;t be
            liable for any loss arising from reliance on it. This does not
            limit any statutory rights you have as a consumer under South
            African law, including the Consumer Protection Act.
          </p>
        </div>

        <div className={section}>
          <h2 className={h2}>Contact form submissions</h2>
          <p className={p}>
            By submitting the contact form, you consent to {BUSINESS_NAME}
            using the information you provide to respond to your enquiry and
            arrange a quote or installation, as described in our{' '}
            <Link to="/privacy" className="text-bugs-orange-text underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div className={section}>
          <h2 className={h2}>Governing law</h2>
          <p className={p}>
            These terms are governed by the laws of the Republic of South
            Africa.
          </p>
        </div>

        <div className={section}>
          <h2 className={h2}>Questions</h2>
          <p className={p}>
            Phone/WhatsApp:{' '}
            <a href={`tel:${PHONE_E164}`} className="text-bugs-orange-text underline">
              {PHONE_E164_SPACED}
            </a>{' '}
            ·{' '}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="text-bugs-orange-text underline"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </div>

      <footer className="border-t border-bugs-black/10 px-4 py-8 text-center sm:px-6 lg:px-8">
        <Link
          to="/"
          className="font-body text-sm text-bugs-black/50 transition-colors hover:text-bugs-black"
        >
          ← Back to the BUGS homepage
        </Link>
      </footer>
    </div>
  )
}
