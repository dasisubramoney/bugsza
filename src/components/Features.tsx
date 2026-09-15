import { Zap, Backpack, Plug, Wrench, DoorOpen } from 'lucide-react'
import { Reveal } from '../lib/Reveal'

const FEATURES = [
  { icon: Zap, title: '12V DC output', body: 'Matched to standard gate and garage motor requirements.' },
  { icon: Backpack, title: 'Portable, carry-to-gate design', body: 'Lightweight enough to grab and go the moment you need it.' },
  { icon: Plug, title: 'Recharges anywhere', body: 'Tops up from any standard wall socket — no special charger.' },
  { icon: Wrench, title: 'Plug-and-play after setup', body: 'A one-time professional installation, then simple plug-in use from every outage after.' },
  { icon: DoorOpen, title: 'Gate and garage motors', body: 'One unit, ready to back up either — whichever loses power first.' },
]

export function Features() {
  return (
    <section id="features" className="bg-bugs-orange py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-display text-sm uppercase tracking-widest text-bugs-black/60">
            Features
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-bugs-black sm:text-4xl">
            Built to do one job, reliably.
          </h2>
        </Reveal>

        <Reveal
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.12}
        >
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl bg-bugs-black p-8 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-bugs-yellow">
                <Icon className="h-7 w-7 text-bugs-black" strokeWidth={2} />
              </div>
              <h3 className="mt-6 font-display text-lg text-bugs-white">{title}</h3>
              <p className="mt-3 font-body text-bugs-white/70">{body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
