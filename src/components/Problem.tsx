import { BatteryWarning, PowerOff, ShieldCheck } from 'lucide-react'
import { Reveal } from '../lib/Reveal'

const PROBLEMS = [
  {
    icon: PowerOff,
    title: 'No Gate Power',
    body: 'Load shedding or an outage cuts the mains — and your gate stops working.',
  },
  {
    icon: BatteryWarning,
    title: 'BUGS is essential',
    body: 'Most gate motors have a small internal battery and this soon runs flat.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety First',
    body: 'Safety is restored when the BUGS Box is plugged in.',
  },
]

export function Problem() {
  return (
    <section className="bg-bugs-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-display text-sm uppercase tracking-widest text-bugs-orange-text">
            The Problem
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-bugs-black sm:text-4xl">
            When the power goes out, most gates stop working.
          </h2>
        </Reveal>

        <Reveal
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.15}
        >
          {PROBLEMS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group flex h-full flex-col border-4 border-bugs-black bg-bugs-orange p-8 shadow-hard transition-all duration-200 hover:-translate-y-1 hover:shadow-hard-lg"
            >
              <div className="flex h-14 w-14 rotate-45 items-center justify-center bg-bugs-black">
                <Icon className="h-7 w-7 -rotate-45 text-bugs-yellow" strokeWidth={2} />
              </div>
              <h3 className="mt-6 font-display text-xl text-bugs-black">{title}</h3>
              <p className="mt-3 font-body text-bugs-black/70">{body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
