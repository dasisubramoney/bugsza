import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useSmoothScroll } from '../lib/SmoothScroll'
import { NAV_SECTIONS, type SectionId } from '../lib/sections'
import logo from '../assets/Bugz_co_za_Updated_Logo.png'

export function Nav() {
  const { scrollTo } = useSmoothScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (id: string) => {
    setMenuOpen(false)
    scrollTo(`#${id}`)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-bugs-orange shadow-[0_2px_0_0_#0A0A0A]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <button
          onClick={() => scrollTo('#top')}
          className="flex items-center"
          aria-label="BUGS — back to top"
        >
          <img src={logo} alt="BUGZ — Keep Rollin'" className="h-12 w-auto sm:h-14" />
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="relative px-4 py-2 font-body text-sm font-semibold text-bugs-black"
            >
              {label}
              {active === id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-bugs-black"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="hidden lg:block">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNavClick('contact')}
            className="rounded-full bg-bugs-yellow px-6 py-2.5 font-display text-sm text-bugs-black shadow-hard"
          >
            Get BUGS
          </motion.button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-bugs-black text-bugs-black lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-bugs-orange lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-4">
              {NAV_SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className="rounded-lg px-3 py-3 text-left font-body font-semibold text-bugs-black hover:bg-black/5"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('contact')}
                className="mt-2 rounded-full bg-bugs-yellow px-6 py-3 text-center font-display text-sm text-bugs-black shadow-hard"
              >
                Get BUGS
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
