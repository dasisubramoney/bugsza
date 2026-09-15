import { Reveal } from '../lib/Reveal'

const STEPS = [
  {
    number: '01',
    title: 'Carry it to the gate motor',
    body: 'Grab BUGS and bring it straight to your gate or garage motor — no wiring, no tools.',
  },
  {
    number: '02',
    title: 'Plug it in — the gate works again',
    body: 'Connect it to the motor and you’re back in business, straight away.',
  },
  {
    number: '03',
    title: 'When power’s back, unplug and recharge at any wall socket',
    body: 'No special charger needed — just a standard wall socket, ready for the next outage.',
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
          <p className="mt-4 rounded-xl border border-bugs-orange/40 bg-bugs-orange/10 px-5 py-4 font-body text-sm text-bugs-white/80 sm:text-base">
            The unit must initially be professionally installed. Once
            installation is complete, it operates as a plug-and-play system.
          </p>
        </Reveal>

        <Reveal
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6"
          stagger={0.18}
        >
          {STEPS.map(({ number, title, body }) => (
            <div
              key={number}
              className="rounded-2xl border-2 border-bugs-orange bg-bugs-black p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bugs-yellow font-display text-lg text-bugs-black">
                {number}
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
