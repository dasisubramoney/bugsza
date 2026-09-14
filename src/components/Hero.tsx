import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useSmoothScroll } from '../lib/SmoothScroll'
import logo from '../assets/Bugz_co_za_Updated_Logo.png'

export function Hero() {
  const { scrollTo } = useSmoothScroll()
  const logoRef = useRef<HTMLImageElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.fromTo(
      logoRef.current,
      { x: -140, opacity: 0, rotate: -8 },
      { x: 0, opacity: 1, rotate: 0, duration: 1.1, ease: 'power3.out' },
    )
      .fromTo(
        flashRef.current,
        { opacity: 0 },
        { opacity: 0.85, duration: 0.08, ease: 'none' },
        '-=0.15',
      )
      .to(flashRef.current, { opacity: 0, duration: 0.45, ease: 'power2.out' })

    const glow = gsap.to(glowRef.current, {
      opacity: 0.55,
      scale: 1.08,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    return () => {
      tl.kill()
      glow.kill()
    }
  }, [])

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-bugs-orange pb-16 pt-28"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display text-4xl leading-[1.05] text-bugs-black sm:text-5xl lg:text-6xl"
          >
            Your gate shouldn&rsquo;t stop working when the power does.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-xl font-body text-lg text-bugs-black/80 sm:text-xl"
          >
            A flat battery or a power outage leaves most electric gates dead —
            and you stuck on the wrong side of it.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#how-it-works')}
              className="rounded-full bg-bugs-yellow px-8 py-4 font-display text-sm text-bugs-black shadow-hard sm:text-base"
            >
              See How It Works
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: '#0A0A0A', color: '#FFFFFF' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#contact')}
              className="rounded-full border-2 border-bugs-black px-8 py-4 font-display text-sm text-bugs-black sm:text-base"
            >
              Get Yours
            </motion.button>
          </motion.div>
        </div>

        <div className="relative flex items-center justify-center">
          <div
            ref={glowRef}
            className="absolute h-64 w-64 rounded-full bg-bugs-yellow opacity-30 blur-3xl sm:h-80 sm:w-80"
          />
          <img
            ref={logoRef}
            src={logo}
            alt="BUGZ — 12V DC backup power for gates and garages. Keep Rollin'."
            className="relative w-full max-w-md drop-shadow-2xl sm:max-w-lg"
          />
          <div
            ref={flashRef}
            className="pointer-events-none absolute inset-0 rounded-3xl bg-white opacity-0"
          />
        </div>
      </div>
    </section>
  )
}
