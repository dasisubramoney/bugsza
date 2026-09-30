import { Zap, Backpack, Plug, Wrench, DoorOpen } from 'lucide-react'
import { Reveal } from '../lib/Reveal'

const FEATURES = [
  { icon: Zap, title: '12V/24V DC output', body: 'Currently matched to Centurion motor requirements, but other brands to follow. Contact us for more information.' },
  { icon: Backpack, title: 'Portable, carry-to-gate design', body: 'Light enough to easily carry to the gate when required.' },
  { icon: Wrench, title: 'Plug-and-play', body: 'Once installed by a BUGS approved specialist, simply plug into the matching plug socket at the gate.' },
  { icon: Plug, title: 'Recharge after use', body: 'Top up from any standard wall socket with the dedicated charger included in the box.' },
  { icon: DoorOpen, title: 'Gate and garage motors', body: 'The same unit can be used for the garage door after the specialist has installed the adaptor plug.' },
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
          className="mt-14 flex flex-wrap justify-center gap-6"
          stagger={0.12}
        >
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              tabIndex={0}
              className="group h-64 w-full [perspective:1200px] focus:outline-none sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] [-webkit-transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]">
                {/* front: icon + title */}
                <div className="absolute inset-0 flex flex-col items-start justify-start border-4 border-bugs-black bg-bugs-black p-8 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
                  <div className="flex h-14 w-14 rotate-45 items-center justify-center bg-bugs-yellow">
                    <Icon className="h-7 w-7 -rotate-45 text-bugs-black" strokeWidth={2} />
                  </div>
                  <h3 className="mt-6 font-display text-lg text-bugs-white">{title}</h3>
                </div>

                {/* back: icon + title + supporting copy */}
                <div className="absolute inset-0 flex flex-col items-start justify-start border-4 border-bugs-black bg-bugs-yellow p-8 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="flex h-14 w-14 rotate-45 items-center justify-center bg-bugs-black">
                    <Icon className="h-7 w-7 -rotate-45 text-bugs-yellow" strokeWidth={2} />
                  </div>
                  <h3 className="mt-6 font-display text-lg text-bugs-black">{title}</h3>
                  <p className="mt-3 font-body text-bugs-black/80">{body}</p>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
