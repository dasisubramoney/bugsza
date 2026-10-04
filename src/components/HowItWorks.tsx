import { Wrench, MapPin, Banknote } from 'lucide-react'
import { Reveal } from '../lib/Reveal'
import { CALLOUT_FEE_DISPLAY, SERVICE_AREA_DISPLAY } from '../lib/businessInfo'

const INSTALL_INFO = [
  {
    icon: Wrench,
    label: 'Professional Installation',
    detail: 'Professionally installed by a BUGS accredited agent.',
  },
  {
    icon: MapPin,
    label: 'Service area',
    detail: `${SERVICE_AREA_DISPLAY}.`,
  },
  {
    icon: Banknote,
    label: 'Callout fee',
    detail: CALLOUT_FEE_DISPLAY,
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Carry to the gate motor',
    body: 'Pick up the BUGS and carry it to the gate.',
  },
  {
    number: '02',
    title: 'Plug it in — the gate works again',
    body: 'Plug into the socket, and your power is restored.',
  },
  {
    number: '03',
    title: 'When power’s back, unplug and recharge at any wall socket',
    body: 'Dedicated charger supplied — just a standard wall socket, ready for the next outage.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-bugs-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-display text-sm uppercase tracking-widest text-bugs-yellow">
            How It Works
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-bugs-white sm:text-4xl">
            BUGS — the Back Up Gate Solution — is the portable fix.
          </h2>
        </Reveal>

        <Reveal
          className="mt-10 grid grid-cols-1 divide-y divide-bugs-white/10 border-y border-bugs-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          stagger={0.1}
        >
          {INSTALL_INFO.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="flex items-start gap-3 px-1 py-5 sm:px-6">
              <Icon className="h-5 w-5 flex-shrink-0 text-bugs-orange" strokeWidth={2} />
              <div>
                <p className="font-display text-sm text-bugs-white">{label}</p>
                <p className="mt-1 font-body text-sm text-bugs-white/60">{detail}</p>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6"
          stagger={0.18}
        >
          {STEPS.map(({ number, title, body }) => (
            <div
              key={number}
              className="group flex h-full flex-col border-2 border-bugs-orange bg-white/[0.04] p-8 shadow-[6px_6px_0_0_#F7941D] transition-all duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#F7941D]"
            >
              <span className="flex h-12 w-12 rotate-45 items-center justify-center bg-bugs-yellow">
                <span className="-rotate-45 font-display text-lg text-bugs-black">{number}</span>
              </span>
              <h3 className="mt-6 font-display text-xl text-bugs-white">{title}</h3>
              <p className="mt-3 font-body text-bugs-white/70">{body}</p>
            </div>
          ))}
        </Reveal>

      </div>
    </section>
  )
}
