import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Reveal } from '../lib/Reveal'
import { CALLOUT_FEE_DISPLAY } from '../lib/businessInfo'

const FAQS = [
  {
    q: 'Will it work with my gate motor?',
    a: 'BUGS currently works with Centurion motors only. Support for other motor brands is planned but not yet available.',
  },
  {
    q: 'How long does a charge last?',
    a: 'Runtime depends on the type of gate, motor draw, and cycle frequency. Exact tested figures, such as the number of open/close cycles per full charge, are not yet published.',
  },
  {
    q: 'Do I need an electrician to set it up?',
    a: `Yes. BUGS is professionally installed once, and BUGS supplies the accredited installer. Installation is billed separately from the unit price — the callout fee is ${CALLOUT_FEE_DISPLAY} After that one-time setup, it operates as a plug-and-play system for every outage after.`,
  },
  {
    q: 'Can it power a garage door too?',
    a: 'Yes, on Centurion garage motors. BUGS currently supports Centurion motors only.',
  },
  {
    q: 'What warranty comes with it?',
    a: 'The warranty period depends on the battery used and is carried by the battery manufacturer, not BUGS.',
  },
]

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-bugs-white py-20 sm:py-28">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-display text-2xl uppercase tracking-widest text-bugs-orange-dark sm:text-3xl">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-xl leading-tight text-bugs-black sm:text-2xl">
            Good questions.
          </h2>
          <p className="mt-3 font-body text-sm text-bugs-black/50">
            Answers for common questions about BUGS.
          </p>
        </Reveal>

        <div className="mt-10 divide-y-2 divide-bugs-black/10">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.q}>
                <h3 className="m-0">
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
                </h3>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 font-body text-bugs-black/70">{item.a}</p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
