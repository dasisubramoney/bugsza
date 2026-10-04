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
import workshop1Webp from '../assets/innovation-centre/workshop-1.webp'
import workshop1Jpeg from '../assets/innovation-centre/workshop-1.resized.jpeg'
import workshop2Webp from '../assets/innovation-centre/workshop-2.webp'
import workshop2Jpeg from '../assets/innovation-centre/workshop-2.resized.jpeg'
import workshop3Webp from '../assets/innovation-centre/workshop-3.webp'
import workshop3Jpeg from '../assets/innovation-centre/workshop-3.resized.jpeg'
import workshop4Webp from '../assets/innovation-centre/workshop-4.webp'
import workshop4Jpeg from '../assets/innovation-centre/workshop-4.resized.jpeg'

// Sampled directly from Innovation_Centre_Logo.png: NAVY is the wordmark,
// GREEN and GOLD are the ring/bulb accents. GREEN is darkened slightly from
// the raw sample (#458C2E, 4.16:1 on white) to clear WCAG AA for body text
// and links (5.04:1). GOLD is decorative-only (1.69:1 on white) — never used
// as text color on a light background, only as a fill with NAVY text on top.
const NAVY = '#0B2A52'
const GREEN = '#3E7D29'
const GOLD = '#F9BE1E'

const WORKSHOP_PHOTOS = [
  {
    webp: workshop1Webp,
    jpeg: workshop1Jpeg,
    alt: 'Woodworking floor with CNC routers, a jointer-planer, and stacked timber',
  },
  {
    webp: workshop2Webp,
    jpeg: workshop2Jpeg,
    alt: 'Metal fabrication bay with a cutting bandsaw, drill press, and welding equipment',
  },
  {
    webp: workshop3Webp,
    jpeg: workshop3Jpeg,
    alt: 'Panel saw and edge-banding station for cutting and finishing timber panels',
  },
  {
    webp: workshop4Webp,
    jpeg: workshop4Jpeg,
    alt: 'Press brake and fiber laser cutter for precision sheet metal work',
  },
]

const FEATURES = [
  {
    icon: Lightbulb,
    title: 'Catalyst for Ideas',
    body: 'A space where ideas are created, developed, tested and refined into a working model.',
  },
  {
    icon: Users,
    title: 'Collaboration Hub',
    body: 'Bringing together',
    items: ['Entrepreneurs', 'Designers', 'Engineers', 'Business strategists', 'Investors'],
  },
  {
    icon: Rocket,
    title: 'Pathway from the Idea to Market',
    body: 'Helping innovators transform ideas into products, businesses, and sustainable income opportunities.',
  },
  {
    icon: HeartHandshake,
    title: 'Community Empowerment',
    body: 'Giving local entrepreneurs access to the tools and knowledge they need to build their dream.',
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
  { icon: PenTool, label: 'Designers' },
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
          width={600}
          height={600}
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
          width={600}
          height={600}
          className="mx-auto w-32 sm:w-40"
        />
        <span
          className="mt-6 inline-block -skew-x-12 border-2 px-5 py-2"
          style={{ backgroundColor: `${GOLD}33`, borderColor: NAVY }}
        >
          <span
            className="inline-block skew-x-12 font-display text-sm uppercase tracking-wider sm:text-base"
            style={{ color: NAVY }}
          >
            The Dream
          </span>
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
          <h2 className="font-display text-2xl sm:text-3xl">Who are we?</h2>
          <p className="mt-4 font-body opacity-70">
            A hub where ideas are nurtured into tangible solutions — the
            bridge between raw creativity and market-ready products. A place
            where inventors, entrepreneurs, and communities converge to
            solve real-world problems.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-2xl sm:text-3xl">What we provide</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {FEATURES.map(({ icon: Icon, title, body, items }) => (
            <div
              key={title}
              className="w-full border-2 bg-white p-7 transition-transform duration-200 hover:-translate-y-1 sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              style={{ borderColor: NAVY, boxShadow: `6px 6px 0 0 ${NAVY}` }}
            >
              <span
                className="flex h-12 w-12 rotate-45 items-center justify-center"
                style={{ backgroundColor: `${GREEN}1A`, color: GREEN }}
              >
                <Icon size={20} className="-rotate-45" />
              </span>
              <h3 className="mt-5 font-display text-lg">{title}</h3>
              <p className="mt-2 font-body text-sm opacity-70">{body}</p>
              {items && (
                <ul className="mt-2 font-body text-sm opacity-70">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
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
                className="inline-block -skew-x-12 border-2 bg-[#FAFAF8] px-5 py-2.5"
                style={{ borderColor: `${NAVY}40` }}
              >
                <span className="inline-flex skew-x-12 items-center gap-2 font-body text-sm opacity-80">
                  <Icon size={16} style={{ color: GREEN }} />
                  {label}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-white" style={{ borderColor: `${NAVY}1A` }}>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl sm:text-3xl">Inside the workshop</h2>
          <p
            className="mx-auto mt-3 max-w-xl text-center font-body"
            style={{ color: `${NAVY}B3` }}
          >
            A working factory floor, not just a pitch deck — real machines, real
            capacity, ready for the next idea.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {WORKSHOP_PHOTOS.map(({ webp, jpeg, alt }) => (
              <div
                key={jpeg}
                className="overflow-hidden border-2"
                style={{ borderColor: NAVY, boxShadow: `6px 6px 0 0 ${NAVY}` }}
              >
                <picture>
                  <source srcSet={webp} type="image/webp" />
                  <img
                    src={jpeg}
                    alt={alt}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </picture>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl sm:text-3xl">Got an idea worth building?</h2>
        <p className="mx-auto mt-3 max-w-md font-body opacity-60">
          Get in touch with Craig and discover how The Innovation Centre can
          help turn your idea into reality.
        </p>
        <a
          href="tel:+27828762489"
          className="mt-8 inline-flex items-center gap-2 border-2 px-8 py-4 font-display text-sm transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1"
          style={{ backgroundColor: GOLD, color: NAVY, borderColor: NAVY, boxShadow: `4px 4px 0 0 ${NAVY}` }}
        >
          <Phone size={18} />
          Call Craig — 082 876 2489
        </a>
      </section>

      <footer className="border-t px-4 py-8 text-center sm:px-6 lg:px-8" style={{ borderColor: `${NAVY}1A` }}>
        <Link
          to="/"
          className="font-body text-sm opacity-50 transition-opacity hover:opacity-100"
        >
          ← Back to the BUGS homepage
        </Link>
        <p className="mt-3 font-body text-xs opacity-40">
          <a
            href="https://atheadigital.co.za/"
            target="_blank"
            rel="noreferrer"
            className="transition-opacity hover:opacity-100"
          >
            Site by Athea Digital
          </a>
        </p>
      </footer>
    </div>
  )
}
