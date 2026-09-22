import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import {
  BUSINESS_NAME,
  PHONE_E164,
  PHONE_E164_SPACED,
  WHATSAPP_URL,
} from '../lib/businessInfo'
import logo from '../assets/Bugz_co_za_Updated_Logo.webp'

const h2 = 'font-display text-xl text-bugs-black sm:text-2xl'
const p = 'mt-3 font-body text-bugs-black/70'
const section = 'mt-10'

export function PrivacyPage() {
  useDocumentMeta({
    title: 'Privacy Policy | BUGS',
    description:
      'How BUGS collects, uses, and protects your information, in line with POPIA.',
    path: '/privacy',
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
          Privacy Policy
        </p>
        <h1 className="mt-3 font-display text-3xl leading-tight text-bugs-black sm:text-4xl">
          Your information, handled plainly.
        </h1>
        <p className="mt-4 font-body text-sm text-bugs-black/50">
          Last updated: 22 September 2026. This policy is written in plain
          language and in line with South Africa&rsquo;s Protection of
          Personal Information Act (POPIA).
        </p>

        <div className={section}>
          <h2 className={h2}>Who this policy covers</h2>
          <p className={p}>
            This policy applies to {BUSINESS_NAME} ({BUSINESS_NAME} — Back Up
            Gate Solution) and to this website. {BUSINESS_NAME} is a mobile
            installation service with no fixed shopfront or office address.
          </p>
        </div>

        <div className={section}>
          <h2 className={h2}>What we collect</h2>
          <p className={p}>When you use the contact form on this site, we collect:</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 font-body text-bugs-black/70">
            <li>Your name and phone number</li>
            <li>
              Details about your property and gate/garage motor setup (e.g.
              property type, motor voltage and brand, access arrangements),
              so we can quote and install correctly
            </li>
            <li>Any message you choose to add</li>
          </ul>
          <p className={p}>
            We do not ask for banking, ID, or payment details through this
            website.
          </p>
        </div>

        <div className={section}>
          <h2 className={h2}>How we use it</h2>
          <p className={p}>
            We use the information you submit only to respond to your
            enquiry, provide a quote, and arrange installation. We don&rsquo;t
            sell or rent your information to third parties, and we don&rsquo;t
            use it for marketing you haven&rsquo;t asked for.
          </p>
        </div>

        <div className={section}>
          <h2 className={h2}>Where it&rsquo;s stored</h2>
          <p className={p}>
            Contact form submissions are processed and stored by Netlify
            (our website and forms hosting provider) and are accessible to{' '}
            {BUSINESS_NAME}. If you contact us via WhatsApp or phone instead,
            that conversation is stored on the relevant messaging platform
            and on our device, subject to that platform&rsquo;s own privacy
            terms.
          </p>
        </div>

        <div className={section}>
          <h2 className={h2}>Analytics and cookies</h2>
          <p className={p}>
            This site does not currently run any analytics or tracking
            tools. The cookie banner shown on your first visit asks for
            your preference in advance, so that if we do add analytics
            (for example, to understand which pages are useful to
            visitors), it will only run for visitors who accepted — and
            this policy will be updated first to disclose exactly
            what&rsquo;s used and why. You can change your answer at any
            time by clearing this site&rsquo;s data in your browser, which
            brings the banner back.
          </p>
        </div>

        <div className={section}>
          <h2 className={h2}>Your rights under POPIA</h2>
          <p className={p}>
            Under POPIA, you have the right to ask what personal information
            we hold about you, request that it be corrected or deleted, and
            object to how it&rsquo;s processed. To exercise any of these
            rights, contact us using the details below. If you&rsquo;re not
            satisfied with our response, you can lodge a complaint with the
            Information Regulator of South Africa.
          </p>
          <p className={`${p} font-body text-sm text-bugs-black/50`}>
            Our designated Information Officer and their direct contact
            details are being finalised as part of our company registration
            — in the meantime, use the contact details below for any privacy
            request and we&rsquo;ll action it personally.
          </p>
        </div>

        <div className={section}>
          <h2 className={h2}>Contact us about this policy</h2>
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
