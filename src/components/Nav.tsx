import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useSmoothScroll } from '../lib/SmoothScroll'
import { NAV_SECTIONS, type SectionId } from '../lib/sections'
import logo from '../assets/Bugz_co_za_Updated_Logo.webp'

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
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_2px_0_0_#0A0A0A]' : ''
      }`}
    >
      <div
        aria-hidden="true"
        className="h-1.5 w-full"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, #0A0A0A 0 10px, #FFC709 10px 20px)',
        }}
      />
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
              className="group relative px-4 py-2 font-body text-sm font-semibold text-bugs-black"
            >
              {label}
              <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-bugs-black transition-transform duration-300 ease-out group-hover:scale-x-100" />
              {active === id && (
                <m.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-bugs-black"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setMenuOpen(false)
              scrollTo('#contact-form')
            }}
            className="border-2 border-bugs-black bg-bugs-yellow px-5 py-2 font-display text-sm text-bugs-black shadow-hard transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0 active:translate-y-0 active:shadow-none sm:px-6 sm:py-2.5"
          >
            Order Yours
          </button>

          <button
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center border-2 border-bugs-black text-bugs-black lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <m.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1 border-t-2 border-bugs-black/10 px-4 pb-4 pt-2">
              {NAV_SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className="border-l-4 border-transparent py-3 pl-3 text-left font-body font-semibold text-bugs-black transition-colors hover:border-bugs-yellow hover:bg-black/5"
                >
                  {label}
                </button>
              ))}
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
