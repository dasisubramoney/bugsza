import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import {
  ArrowLeft,
  Phone,
  Lightbulb,
  Users,
  Rocket,
  HeartHandshake,
  Sprout,
  Factory,
  Wrench,
  Printer,
  PenTool,
  Percent,
} from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import innovationCentreLogo from '../assets/Innovation_Centre_Logo.webp'

// Sampled directly from Innovation_Centre_Logo.png: NAVY is the wordmark,
// GREEN and GOLD are the ring/bulb accents. GREEN is darkened slightly from
// the raw sample (#458C2E, 4.16:1 on white) to clear WCAG AA for body text
// and links (5.04:1). GOLD is decorative-only (1.69:1 on white) — never used
// as text color on a light background, only as a fill with NAVY text on top.
const NAVY = '#0B2A52'
const GREEN = '#3E7D29'
const GOLD = '#F9BE1E'

const FEATURES = [
  {
    icon: Lightbulb,
    title: 'Catalyst for Ideas',
    body: 'A space where concepts are refined, tested, and developed into working prototypes.',
  },
  {
    icon: Users,
    title: 'Collaboration Hub',
    body: 'Bringing together entrepreneurs, designers, engineers, business strategists, and investors.',
  },
  {
    icon: Rocket,
    title: 'Pathway to Commercialisation',
    body: 'Guidance through patents, pilots, manufacturing, and marketing — from idea to market.',
  },
  {
    icon: HeartHandshake,
    title: 'Community Empowerment',
    body: 'Giving local entrepreneurs access to the tools and knowledge they need to build.',
  },
  {
    icon: Sprout,
    title: 'Sustainable Solutions',
    body: 'Helping entrepreneurs build a sustainable, lasting income from their ideas.',
  },
]

const RESOURCES = [
  { icon: Factory, label: 'Steel & timber factories' },
  { icon: Wrench, label: 'Lathes & CNC machines' },
  { icon: Printer, label: 'Laser cutting & 3D printing' },
  { icon: PenTool, label: 'In-house designers' },
  { icon: Percent, label: 'Discount suppliers' },
]

export function InnovationCentrePage() {
  useDocumentMeta({
    title: 'The Innovation Centre — Where Ideas Become Real | BUGS Partner',
    description:
      'A hub for prototyping, collaboration, and commercialisation — helping local entrepreneurs turn ideas into market-ready products.',
    path: '/innovation-centre',
  })

  return (
    <div className="min-h-screen bg-[#FAFAF8]" style={{ color: NAVY }}>
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-sm font-semibold opacity-60 transition-opacity hover:opacity-100"
        >
          <ArrowLeft size={16} />
          Back to BUGS
        </Link>
        <img
          src={innovationCentreLogo}
          alt="The Innovation Centre"
          className="h-12 w-12 sm:h-14 sm:w-14"
        />
      </header>

      <m.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl px-4 pb-16 pt-8 text-center sm:px-6 lg:px-8"
      >
        <img
          src={innovationCentreLogo}
          alt="The Innovation Centre"
          className="mx-auto w-32 sm:w-40"
        />
        <span
          className="mt-6 inline-flex items-center rounded-full px-4 py-1.5 font-display text-xs uppercase tracking-wider"
          style={{ backgroundColor: `${GOLD}33`, color: NAVY }}
        >
          The Dream
        </span>
        <h1 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
          Where ideas become real.
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-body text-lg opacity-70">
          A platform to showcase pilot projects, run community expos, and
          host training workshops for the entrepreneurs of the future.
        </p>
      </m.section>

      <section className="border-y bg-white" style={{ borderColor: `${NAVY}1A` }}>
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl">What it is</h2>
          <p className="mt-4 font-body opacity-70">
            A hub where ideas are nurtured into tangible solutions — the
            bridge between raw creativity and market-ready products. A place
            where inventors, entrepreneurs, and communities converge to
            solve real-world problems.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-2xl sm:text-3xl">What it provides</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border bg-white p-7 shadow-sm"
              style={{ borderColor: `${NAVY}1A` }}
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: `${GREEN}1A`, color: GREEN }}
              >
                <Icon size={22} />
              </span>
              <h3 className="mt-5 font-display text-lg">{title}</h3>
              <p className="mt-2 font-body text-sm opacity-70">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t bg-white" style={{ borderColor: `${NAVY}1A` }}>
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl sm:text-3xl">
            Resources available on site
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {RESOURCES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border bg-[#FAFAF8] px-5 py-2.5 font-body text-sm opacity-80"
                style={{ borderColor: `${NAVY}26` }}
              >
                <Icon size={16} style={{ color: GREEN }} />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl sm:text-3xl">Got an idea worth building?</h2>
        <p className="mx-auto mt-3 max-w-md font-body opacity-60">
          Get in touch with Craig to find out how The Innovation Centre can
          help take it further.
        </p>
        <m.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          href="tel:+27828762489"
          className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 font-display text-sm"
          style={{ backgroundColor: GOLD, color: NAVY }}
        >
          <Phone size={18} />
          Call Craig — 082 876 2489
        </m.a>
      </section>

      <footer className="border-t px-4 py-8 text-center sm:px-6 lg:px-8" style={{ borderColor: `${NAVY}1A` }}>
        <Link
          to="/"
          className="font-body text-sm opacity-50 transition-opacity hover:opacity-100"
        >
          ← Back to the BUGS homepage
        </Link>
      </footer>
    </div>
  )
}
