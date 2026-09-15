import { BatteryWarning, PowerOff, Lock } from 'lucide-react'
import { Reveal } from '../lib/Reveal'

const PROBLEMS = [
  {
    icon: PowerOff,
    title: 'No motor power',
    body: 'Load shedding or an outage cuts the mains — and your gate motor has nothing left to run on.',
  },
  {
    icon: Lock,
    title: 'Stuck on the wrong side',
    body: 'Manual override means getting out of the car, in the dark, in the rain, to muscle a heavy gate by hand.',
  },
  {
    icon: BatteryWarning,
    title: 'No backup plan',
    body: 'Most gate motors have a small internal battery — and it only lasts so many cycles before it, too, gives up.',
  },
]

export function Problem() {
  return (
    <section className="bg-bugs-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-display text-sm uppercase tracking-widest text-bugs-orange-dark">
            The Problem
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-bugs-black sm:text-4xl">
            When the power goes, most gates just stop.
          </h2>
        </Reveal>

        <Reveal
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.15}
        >
          {PROBLEMS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="group relative h-full">
              <div className="absolute -inset-2 rounded-2xl bg-bugs-yellow opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-90" />
              <div className="relative flex h-full flex-col rounded-2xl border-4 border-bugs-black bg-bugs-orange p-8 shadow-hard transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-bugs-black">
                  <Icon className="h-7 w-7 text-bugs-yellow" strokeWidth={2} />
                </div>
                <h3 className="mt-6 font-display text-xl text-bugs-black">{title}</h3>
                <p className="mt-3 font-body text-bugs-black/70">{body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
