import { Building2, BatteryWarning, CircleOff, Layers } from 'lucide-react'
import { Reveal } from '../lib/Reveal'

const USE_CASES = [
  {
    icon: Layers,
    title: 'Load Shedding',
    body: 'BUGS keeps your gate working through all power outages.',
  },
  {
    icon: CircleOff,
    title: 'Unplanned grid outages',
    body: 'Storms, faults, maintenance – whenever the grid drops, BUGS is the backup.',
  },
  {
    icon: BatteryWarning,
    title: 'Battery Failure',
    body: 'BUGS is the backup to keep your gate working.',
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
            Battery Backup Applications
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-bugs-white sm:text-4xl">
            Wherever the power cuts out, BUGS keeps rolling.
          </h2>
        </Reveal>

        <Reveal
          className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.15}
        >
          {USE_CASES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col items-start border-l-2 border-bugs-orange/40 pl-5">
              <div className="flex h-11 w-11 rotate-45 items-center justify-center bg-bugs-orange">
                <Icon className="h-5 w-5 -rotate-45 text-bugs-black" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-display text-lg text-bugs-white">{title}</h3>
              <p className="mt-2 font-body text-bugs-white/70">{body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
