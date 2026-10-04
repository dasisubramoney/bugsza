import { ExternalLink } from 'lucide-react'

export function DeveloperBanner() {
  return (
    <section className="border-y-2 border-bugs-black bg-bugs-white py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p className="font-body text-sm text-bugs-black/70">
          This website was designed and built by{' '}
          <span className="font-semibold text-bugs-black">Athea Digital</span>.
        </p>
        <a
          href="https://atheadigital.co.za/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 border-2 border-bugs-black bg-bugs-black px-5 py-2.5 font-display text-sm text-bugs-white shadow-hard transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0 active:translate-y-0 active:shadow-none"
        >
          Visit Athea Digital
          <ExternalLink size={14} />
        </a>
      </div>
    </section>
  )
}
