import { useSmoothScroll } from '../lib/SmoothScroll'
import { Reveal } from '../lib/Reveal'
import {
  DELIVERY_NOTE,
  INSTALL_NOT_INCLUDED_NOTE,
  PRICE_DISPLAY,
  PRICE_NOTE,
} from '../lib/businessInfo'
import productPhotoWebp from '../assets/Bugs_product.webp'
import productPhotoJpeg from '../assets/Bugs_product.resized.jpeg'

export function Pricing() {
  const { scrollTo } = useSmoothScroll()

  return (
    <section id="pricing" className="bg-bugs-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="font-display text-sm uppercase tracking-widest text-bugs-yellow">
            Pricing
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-bugs-white sm:text-4xl">
            Simple, upfront pricing.
          </h2>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto w-full max-w-md overflow-hidden border-4 border-bugs-yellow shadow-[8px_8px_0_0_#FFC709] transition-transform duration-300 hover:-translate-y-1">
            <picture>
              <source srcSet={productPhotoWebp} type="image/webp" />
              <img
                src={productPhotoJpeg}
                alt="The BUGS unit — a 12V/24V DC backup power box for gates and garages"
                width={900}
                height={1200}
                className="w-full"
                loading="lazy"
              />
            </picture>
          </div>

          <div className="mx-auto w-full max-w-md border-4 border-bugs-yellow bg-bugs-white p-10 text-center shadow-[6px_6px_0_0_#FFC709] transition-transform duration-300 hover:-translate-y-1">
            <p className="font-display text-5xl text-bugs-black sm:text-6xl">{PRICE_DISPLAY}</p>
            <p className="mt-2 font-body text-xs text-bugs-black/50 sm:text-sm">
              *{PRICE_NOTE}
            </p>

            <div className="mt-6 border-t-2 border-bugs-black/10 pt-6">
              <p className="font-body text-sm text-bugs-black/70">
                {INSTALL_NOT_INCLUDED_NOTE}
              </p>
              <p className="mt-2 font-body text-sm text-bugs-black/70">
                {DELIVERY_NOTE}
              </p>
            </div>

            <button
              onClick={() => scrollTo('#contact-form')}
              className="mt-8 w-full border-2 border-bugs-black bg-bugs-yellow px-8 py-4 font-display text-sm text-bugs-black shadow-hard transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg active:translate-x-0 active:translate-y-0 active:shadow-none"
            >
              Order here
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
