import { m } from 'framer-motion'
import { useSmoothScroll } from '../lib/SmoothScroll'
import { PartnersRow } from './PartnersRow'

export function Hero() {
  const { scrollTo } = useSmoothScroll()

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-bugs-orange pb-16 pt-28"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <div className="flex max-w-2xl flex-col items-center">
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center rounded-full bg-bugs-black px-4 py-2 font-display text-[10px] uppercase tracking-wider text-white sm:text-xs"
          >
            12V/24V DC &middot; Backup Power &middot; Gates &bull; Garages
          </m.div>
          <m.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display text-4xl leading-[1.05] text-bugs-black sm:text-5xl lg:text-6xl"
          >
            Your gate shouldn&rsquo;t stop working when the power does.
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl font-body text-xl text-bugs-black/80 sm:text-2xl"
          >
            A flat battery or power outage leaves most electric gates dead,
            posing a security threat.
          </m.p>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <m.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#contact-form')}
              className="rounded-full border-2 border-bugs-black bg-bugs-yellow px-8 py-4 font-display text-sm text-bugs-black shadow-hard sm:text-base"
            >
              Order Yours Today
            </m.button>
            <m.button
              whileHover={{ scale: 1.04, backgroundColor: '#0A0A0A', color: '#FFFFFF' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#how-it-works')}
              className="rounded-full border-2 border-bugs-black px-8 py-4 font-display text-sm text-bugs-black sm:text-base"
            >
              See How It Works
            </m.button>
          </m.div>
        </div>

        <PartnersRow />
      </div>
    </section>
  )
}
