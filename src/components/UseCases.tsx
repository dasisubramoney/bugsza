import { Building2, CircleOff, Layers } from 'lucide-react'
import { Reveal } from '../lib/Reveal'

const USE_CASES = [
  {
    icon: Layers,
    title: 'Load shedding stages',
    body: 'From stage 1 to stage 8, BUGS keeps your gate cycling on schedule, every schedule.',
  },
  {
    icon: CircleOff,
    title: 'Unplanned grid outages',
    body: 'Storms, faults, maintenance — whenever the grid drops, BUGS is already the backup.',
  },
  {
    icon: Building2,
    title: 'Complexes and estates',
    body: 'Shared gate motors mean shared risk. One BUGS unit keeps residents moving.',
  },
]

export function UseCases() {
  return (
    <section id="use-cases" className="bg-bugs-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-display text-sm uppercase tracking-widest text-bugs-yellow">
            Use Cases
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-bugs-white sm:text-4xl">
            Wherever the power cuts out, BUGS keeps rolling.
          </h2>
        </Reveal>

        <Reveal
          className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3"
          stagger={0.15}
        >
          {USE_CASES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col items-start">
              <Icon className="h-10 w-10 text-bugs-orange" strokeWidth={1.75} />
              <h3 className="mt-5 font-display text-lg text-bugs-white">{title}</h3>
              <p className="mt-2 font-body text-bugs-white/70">{body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
