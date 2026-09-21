import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-bugs-black">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-sm font-semibold text-bugs-black/60 transition-colors hover:text-bugs-black"
        >
          <ArrowLeft size={16} />
          Back to BUGS
        </Link>
        <span className="font-display text-sm uppercase tracking-widest text-bugs-black">
          The Innovation Centre
        </span>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl px-4 pb-16 pt-8 text-center sm:px-6 lg:px-8"
      >
        <span className="inline-flex items-center rounded-full bg-bugs-orange/10 px-4 py-1.5 font-display text-xs uppercase tracking-wider text-bugs-orange-dark">
          The Dream
        </span>
        <h1 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
          Where ideas become real.
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-body text-lg text-bugs-black/70">
          A platform to showcase pilot projects, run community expos, and
          host training workshops for the entrepreneurs of the future.
        </p>
      </motion.section>

      <section className="border-y border-bugs-black/10 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl">What it is</h2>
          <p className="mt-4 font-body text-bugs-black/70">
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
              className="rounded-2xl border border-bugs-black/10 bg-white p-7 shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bugs-orange/10 text-bugs-orange-dark">
                <Icon size={22} />
              </span>
              <h3 className="mt-5 font-display text-lg">{title}</h3>
              <p className="mt-2 font-body text-sm text-bugs-black/70">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-bugs-black/10 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl sm:text-3xl">
            Resources available on site
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {RESOURCES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-bugs-black/15 bg-[#FAFAF8] px-5 py-2.5 font-body text-sm text-bugs-black/80"
              >
                <Icon size={16} className="text-bugs-orange-dark" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl sm:text-3xl">Got an idea worth building?</h2>
        <p className="mx-auto mt-3 max-w-md font-body text-bugs-black/60">
          Get in touch with Craig to find out how The Innovation Centre can
          help take it further.
        </p>
        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          href="tel:+27828762489"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-bugs-black px-8 py-4 font-display text-sm text-white"
        >
          <Phone size={18} />
          Call Craig — 082 876 2489
        </motion.a>
      </section>

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
