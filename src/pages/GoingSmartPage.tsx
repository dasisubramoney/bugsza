import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { ArrowLeft, Phone, Search, Lightbulb } from 'lucide-react'
import { useDocumentMeta } from '../lib/useDocumentMeta'
import goingSmartLogo from '../assets/Going_Smart.webp'
import smartMeterWebp from '../assets/going-smart/smart-meter.webp'
import smartMeterJpeg from '../assets/going-smart/smart-meter.resized.jpeg'
import energyEfficientHomeWebp from '../assets/going-smart/energy-efficient-home.webp'
import energyEfficientHomeJpeg from '../assets/going-smart/energy-efficient-home.resized.jpeg'

const NAVY = '#131B2D'
const GREEN = '#6FA84A'

export function GoingSmartPage() {
  useDocumentMeta({
    title: 'Going Smart Energy Solutions — Smart Tech Audits | BUGS Partner',
    description:
      'Going Smart Energy Solutions runs a Smart Tech Audit on your electricity and water usage, then gives you practical solutions to bring your costs down.',
    path: '/going-smart',
  })

  return (
    <div className="min-h-screen" style={{ backgroundColor: NAVY }}>
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-sm font-semibold text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to BUGS
        </Link>
        <a
          href="tel:+27828762489"
          style={{ borderColor: GREEN }}
          className="hidden items-center gap-2 border-2 px-5 py-2 font-display text-sm text-white transition-colors hover:opacity-80 sm:inline-flex"
        >
          <Phone size={15} />
          082 876 2489
        </a>
      </header>

      <m.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl px-4 pb-16 pt-8 text-center sm:px-6 lg:px-8"
      >
        <img
          src={goingSmartLogo}
          alt="Going Smart Energy Solutions — You Can Trust"
          width={900}
          height={281}
          className="mx-auto w-full max-w-md"
        />
        <h1 className="mt-10 font-display text-4xl leading-tight text-white sm:text-5xl">
          Is your electricity and water bill out of control?
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-body text-lg text-white/70">
          Municipal meters can read incorrectly — and most households
          have no idea which appliances are actually driving their bill up.
          Going Smart will show you how to reduce your costs.
        </p>

        <p className="mx-auto mt-10 max-w-2xl text-left font-body text-sm uppercase tracking-wide text-white/50">
          We also supply
        </p>
        <div className="mx-auto mt-3 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            className="overflow-hidden border-2"
            style={{ borderColor: GREEN, boxShadow: `6px 6px 0 0 ${GREEN}` }}
          >
            <picture>
              <source srcSet={smartMeterWebp} type="image/webp" />
              <img
                src={smartMeterJpeg}
                alt="Smart utility meters tracking real-time electricity usage"
                loading="lazy"
                width={554}
                height={360}
                className="aspect-[4/3] w-full object-cover"
              />
            </picture>
            <p
              className="px-4 py-3 text-left font-display text-lg text-white"
              style={{ backgroundColor: NAVY }}
            >
              Smart Water Meters
            </p>
          </div>
          <div
            className="overflow-hidden border-2"
            style={{ borderColor: GREEN, boxShadow: `6px 6px 0 0 ${GREEN}` }}
          >
            <picture>
              <source srcSet={energyEfficientHomeWebp} type="image/webp" />
              <img
                src={energyEfficientHomeJpeg}
                alt="An energy-efficient home with solar panels after a Going Smart audit"
                loading="lazy"
                width={525}
                height={350}
                className="aspect-[4/3] w-full object-cover"
              />
            </picture>
            <p
              className="px-4 py-3 text-left font-display text-lg text-white"
              style={{ backgroundColor: NAVY }}
            >
              Solar Solutions
            </p>
          </div>
        </div>
      </m.section>

      <section className="border-t border-white/10 bg-white/5">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:px-8">
          <div
            className="border-2 p-8 transition-transform duration-200 hover:-translate-y-1"
            style={{ borderColor: GREEN, backgroundColor: NAVY, boxShadow: `6px 6px 0 0 ${GREEN}` }}
          >
            <span
              className="flex h-12 w-12 rotate-45 items-center justify-center"
              style={{ backgroundColor: `${GREEN}26`, color: GREEN }}
            >
              <Search size={20} className="-rotate-45" />
            </span>
            <h3 className="mt-6 font-display text-xl text-white">Smart Tech Audit</h3>
            <p className="mt-3 font-body text-white/70">
              We conduct a full technical audit — no guesswork, just data.
            </p>
          </div>

          <div
            className="border-2 p-8 transition-transform duration-200 hover:-translate-y-1"
            style={{ borderColor: GREEN, backgroundColor: NAVY, boxShadow: `6px 6px 0 0 ${GREEN}` }}
          >
            <span
              className="flex h-12 w-12 rotate-45 items-center justify-center"
              style={{ backgroundColor: `${GREEN}26`, color: GREEN }}
            >
              <Lightbulb size={20} className="-rotate-45" />
            </span>
            <h3 className="mt-6 font-display text-xl text-white">Practical Solutions</h3>
            <p className="mt-3 font-body text-white/70">
              We give you practical, tailored solutions to bring your
              monthly electricity and water bill down for good.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl text-white sm:text-3xl">
          Take control of your electricity and water costs today
        </h2>
        <p className="mt-3 font-body text-white/60">Speak to Craig to get started.</p>
        <a
          href="tel:+27828762489"
          style={{ backgroundColor: GREEN, borderColor: NAVY, boxShadow: `4px 4px 0 0 ${NAVY}` }}
          className="mt-8 inline-flex items-center gap-2 border-2 px-8 py-4 font-display text-sm transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1"
        >
          <Phone size={18} />
          Call Craig — 082 876 2489
        </a>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-center sm:px-6 lg:px-8">
        <Link
          to="/"
          className="font-body text-sm text-white/50 transition-colors hover:text-white"
        >
          ← Back to the BUGS homepage
        </Link>
      </footer>
    </div>
  )
}
