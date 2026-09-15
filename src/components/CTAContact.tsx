import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'
import { Reveal } from '../lib/Reveal'

export function CTAContact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-bugs-yellow py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl leading-tight text-bugs-black sm:text-5xl">
            Never get stuck outside your own gate again.
          </h2>
          <p className="mt-4 font-display text-lg text-bugs-black/70">Keep Rollin&rsquo;.</p>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-2xl bg-bugs-black opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40" />
            <div className="relative flex flex-col gap-4 rounded-2xl border-4 border-bugs-black bg-bugs-white p-8 shadow-hard transition-transform duration-300 group-hover:-translate-y-1">
              <h3 className="font-display text-xl text-bugs-black">Talk to us directly</h3>
              <p className="font-body text-sm text-bugs-black/60">
                Placeholder contact details — swap in the real WhatsApp number and phone line.
              </p>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/27000000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-bugs-black px-6 py-4 font-display text-sm text-bugs-white"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="tel:+27000000000"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-bugs-black px-6 py-4 font-display text-sm text-bugs-black"
              >
                <Phone size={18} />
                Call Us
              </motion.a>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-1 rounded-2xl bg-bugs-black opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40" />
            <form
              onSubmit={handleSubmit}
              className="relative flex flex-col gap-4 rounded-2xl border-4 border-bugs-black bg-bugs-white p-8 shadow-hard transition-transform duration-300 group-hover:-translate-y-1"
            >
              <h3 className="font-display text-xl text-bugs-black">Or send a message</h3>
              <p className="font-body text-xs text-bugs-black/50">
                Placeholder form — not yet wired up to a live endpoint.
              </p>
              <input
                required
                type="text"
                placeholder="Your name"
                className="rounded-lg border-2 border-bugs-black/20 px-4 py-3 font-body text-sm text-bugs-black outline-none focus:border-bugs-black"
              />
              <input
                required
                type="tel"
                placeholder="Phone number"
                className="rounded-lg border-2 border-bugs-black/20 px-4 py-3 font-body text-sm text-bugs-black outline-none focus:border-bugs-black"
              />
              <textarea
                placeholder="Tell us about your gate setup"
                rows={3}
                className="rounded-lg border-2 border-bugs-black/20 px-4 py-3 font-body text-sm text-bugs-black outline-none focus:border-bugs-black"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="rounded-full bg-bugs-yellow px-6 py-4 font-display text-sm text-bugs-black shadow-hard"
              >
                {submitted ? 'Thanks — we’ll be in touch' : 'Send Message'}
              </motion.button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
