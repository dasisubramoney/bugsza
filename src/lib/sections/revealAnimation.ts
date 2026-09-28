import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SetupRevealAnimationOptions {
  y: number
  stagger: number
  delay: number
  start: string
}

/** Fades/slides an element's direct children up as it scrolls into view. */
export function setupRevealAnimation(
  el: HTMLElement,
  { y, stagger, delay, start }: SetupRevealAnimationOptions,
) {
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
  }, el)

  return () => ctx.revert()
}
