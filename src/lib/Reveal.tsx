import { useLayoutEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
    const targets = el.children.length > 0 ? Array.from(el.children) : [el]

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, ref)

    return () => ctx.revert()
  }, [y, stagger, delay, start])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
