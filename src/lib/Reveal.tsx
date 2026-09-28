import { useLayoutEffect, useRef, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  y?: number
  stagger?: number
  delay?: number
  start?: string
}

/** Fades/slides direct children up as the wrapper enters the viewport. */
export function Reveal({
  children,
  className = '',
  y = 40,
  stagger = 0.12,
  delay = 0,
  start = 'top 85%',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect the OS-level motion preference: skip the animation and show
    // final state immediately, rather than force scroll-triggered movement
    // on people who've asked for less of it. No need to pull in GSAP for
    // this — just settle the DOM into its resting state directly.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const targets = el.children.length > 0 ? Array.from(el.children) : [el]
      targets.forEach((target) => {
        const style = (target as HTMLElement).style
        style.opacity = '1'
        style.transform = 'none'
      })
      return
    }

    let cleanup: (() => void) | undefined
    let cancelled = false

    // This section's below-the-fold, so don't pull GSAP/ScrollTrigger into
    // the initial bundle for it — only import and wire up the scroll-trigger
    // once the section is about to enter the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()
        import('./sections/revealAnimation').then(({ setupRevealAnimation }) => {
          if (cancelled) return
          cleanup = setupRevealAnimation(el, { y, stagger, delay, start })
        })
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(el)

    return () => {
      cancelled = true
      observer.disconnect()
      cleanup?.()
    }
  }, [y, stagger, delay, start])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
