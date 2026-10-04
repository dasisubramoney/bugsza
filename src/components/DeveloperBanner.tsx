import { ExternalLink } from 'lucide-react'
import atheaLogo from '../assets/athea-digital-logo.webp'

export function DeveloperBanner() {
  return (
    <section className="bg-bugs-white px-4 py-14 sm:px-6 lg:px-8">
      <div
        className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 overflow-hidden border-4 border-bugs-black bg-bugs-black px-6 py-10 text-center shadow-hard-lg sm:flex-row sm:justify-between sm:text-left"
      >
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
          <img
            src={atheaLogo}
            alt="Athea Digital"
            width={300}
            height={225}
            className="h-16 w-auto flex-shrink-0 sm:h-20"
          />
          <div>
            <h2 className="font-display text-2xl leading-tight text-bugs-white sm:text-3xl">
              Need a website like this one?
            </h2>
            <p className="mt-2 font-body text-sm text-bugs-white/60">
              This site was designed and built by Athea Digital — fast,
              modern websites for local businesses.
            </p>
          </div>
        </div>

        <a
          href="https://atheadigital.co.za/"
          target="_blank"
          rel="noreferrer"
          className="flex flex-shrink-0 items-center gap-2 border-2 border-bugs-black bg-bugs-yellow px-6 py-4 font-display text-sm text-bugs-black shadow-hard transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg active:translate-x-0 active:translate-y-0 active:shadow-none"
        >
          Visit Athea Digital
          <ExternalLink size={16} />
        </a>
      </div>
    </section>
  )
}
