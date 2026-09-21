import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Phone, Search, Lightbulb } from 'lucide-react'
import goingSmartLogo from '../assets/Going_Smart.png'

const NAVY = '#131B2D'
const GREEN = '#6FA84A'

export function GoingSmartPage() {
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
          className="hidden items-center gap-2 rounded-full border-2 px-5 py-2 font-display text-sm text-white transition-colors hover:opacity-80 sm:inline-flex"
        >
          <Phone size={15} />
          082 876 2489
        </a>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl px-4 pb-16 pt-8 text-center sm:px-6 lg:px-8"
      >
        <img
          src={goingSmartLogo}
          alt="Going Smart Energy Solutions — You Can Trust"
          className="mx-auto w-full max-w-md rounded-xl"
        />
        <h1 className="mt-10 font-display text-4xl leading-tight text-white sm:text-5xl">
          Is your electricity bill out of control?
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-body text-lg text-white/70">
          Most municipal meters can read incorrectly — and most households
          have no idea which appliances are actually driving their bill up.
          Going Smart finds out, and fixes it.
        </p>
      </motion.section>

      <section className="border-t border-white/10 bg-white/5">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl border p-8"
            style={{ borderColor: `${GREEN}4D`, backgroundColor: NAVY }}
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: `${GREEN}26`, color: GREEN }}
            >
              <Search size={22} />
            </span>
            <h3 className="mt-6 font-display text-xl text-white">Smart Tech Audit</h3>
            <p className="mt-3 font-body text-white/70">
              We conduct a full technical audit of your account to show
              exactly why it&rsquo;s running high — no guesswork, just data.
            </p>
          </div>

          <div
            className="rounded-2xl border p-8"
            style={{ borderColor: `${GREEN}4D`, backgroundColor: NAVY }}
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: `${GREEN}26`, color: GREEN }}
            >
              <Lightbulb size={22} />
            </span>
            <h3 className="mt-6 font-display text-xl text-white">Practical Solutions</h3>
            <p className="mt-3 font-body text-white/70">
              Then we give you practical, tailored solutions to bring your
              monthly electricity costs down for good.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl text-white sm:text-3xl">
          Take control of your electricity today
        </h2>
        <p className="mt-3 font-body text-white/60">Speak to Craig to get started.</p>
        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          href="tel:+27828762489"
          style={{ backgroundColor: GREEN }}
          className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 font-display text-sm"
        >
          <Phone size={18} />
          Call Craig — 082 876 2489
        </motion.a>
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
