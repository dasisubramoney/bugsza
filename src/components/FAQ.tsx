import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Reveal } from '../lib/Reveal'

const FAQS = [
  {
    q: 'Will it work with my gate motor?',
    a: 'BUGS is built around a standard 12V DC output, which covers most residential gate and garage motors. Placeholder answer — to be confirmed against specific motor brands and models before publishing.',
  },
  {
    q: 'How long does a charge last?',
    a: 'Placeholder answer — runtime depends on motor draw and cycle frequency. Client to confirm tested figures (e.g. number of open/close cycles per full charge).',
  },
  {
    q: 'Do I need an electrician to set it up?',
    a: 'No installation or wiring is required — BUGS plugs straight into the motor. Placeholder answer — confirm no scenarios require professional setup.',
  },
  {
    q: 'Can it power a garage door too?',
    a: 'Placeholder answer — confirm compatibility scope across garage door motor types, not just gate motors.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-bugs-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-display text-sm uppercase tracking-widest text-bugs-orange-dark">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-bugs-black sm:text-4xl">
            Good questions.
          </h2>
          <p className="mt-3 font-body text-sm text-bugs-black/50">
            Answers below are placeholder copy for the client to confirm or replace with real specs.
          </p>
        </Reveal>

        <div className="mt-10 divide-y-2 divide-bugs-black/10">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg text-bugs-black sm:text-xl">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-bugs-orange text-bugs-black"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 font-body text-bugs-black/70">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
