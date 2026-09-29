import { useState } from 'react'
import { m } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Reveal } from '../lib/Reveal'

const FAQS = [
  {
    q: 'Will it work with my gate motor?',
    a: 'BUGS currently works with Centurion motors.',
  },
  {
    q: 'How long does a charge last?',
    a: 'Runtime depends on the type of gate, motor draw, size of complex and cycle frequency. Exact tested figures, such as the number of open/close cycles are subject to the size of the property.',
  },
  {
    q: 'Do I need an electrician to set it up?',
    a: 'Yes. BUGS is professionally installed, and BUGS provides the accredited installer. Installation is billed separately from the unit price — the callout fee is R650/hour, based on location. Final cost may vary depending on travel distance. After that one-time setup, it operates as a plug-and-play system for every outage thereafter.',
  },
  {
    q: 'Can it power a garage door too?',
    a: 'Yes. An additional plug is required on the garage door motor.',
  },
  {
    q: 'What is the warrantee?',
    a: 'The warrantee on the battery is provided by the battery brand.',
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
                    <m.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-bugs-orange text-bugs-black"
                    >
                      <ChevronDown size={18} />
                    </m.span>
                  </button>
                </h3>
                <m.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 font-body text-bugs-black/70">{item.a}</p>
                </m.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
