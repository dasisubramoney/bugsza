import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'
import { Reveal } from '../lib/Reveal'

type PropertyType = 'residential' | 'complex' | 'commercial'
type Voltage = '12V' | '24V'
type Access = 'guard' | 'free'
type BuildingType = 'school' | 'business'

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: 'residential', label: 'Residential house' },
  { value: 'complex', label: 'Complex' },
  { value: 'commercial', label: 'Commercial building' },
]

const VOLTAGE_OPTIONS: { value: Voltage; label: string }[] = [
  { value: '12V', label: '12V' },
  { value: '24V', label: '24V' },
]

const BUILDING_TYPE_OPTIONS: { value: BuildingType; label: string }[] = [
  { value: 'school', label: 'School' },
  { value: 'business', label: 'Business' },
]

const ACCESS_OPTIONS: { value: Access; label: string }[] = [
  { value: 'guard', label: 'Security guard' },
  { value: 'free', label: 'Free access (remote)' },
]

const inputClass =
  'rounded-lg border-2 border-bugs-black/20 px-4 py-3 font-body text-sm text-bugs-black outline-none focus:border-bugs-black'
const labelClass = 'font-body text-xs font-semibold uppercase tracking-wide text-bugs-black/50'

function ToggleGroup({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[]
  value: string | null
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-full border-2 px-4 py-2 font-body text-sm transition-colors ${
            value === opt.value
              ? 'border-bugs-black bg-bugs-black text-bugs-white'
              : 'border-bugs-black/20 text-bugs-black hover:border-bugs-black/50'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function CTAContact() {
  const [submitted, setSubmitted] = useState(false)
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null)
  const [voltage, setVoltage] = useState<Voltage | null>(null)
  const [access, setAccess] = useState<Access | null>(null)
  const [buildingType, setBuildingType] = useState<BuildingType | null>(null)

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
                className={inputClass}
              />
              <input
                required
                type="tel"
                placeholder="Phone number"
                className={inputClass}
              />

              <div className="flex flex-col gap-2">
                <span className={labelClass}>Property type</span>
                <ToggleGroup
                  options={PROPERTY_TYPES}
                  value={propertyType}
                  onChange={(v) => {
                    setPropertyType(v as PropertyType)
                    setAccess(null)
                    setBuildingType(null)
                  }}
                />
              </div>

              <AnimatePresence initial={false}>
                {propertyType && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-4 pt-1">
                      <div className="flex flex-col gap-2">
                        <span className={labelClass}>Is it a 12V or 24V motor?</span>
                        <ToggleGroup
                          options={VOLTAGE_OPTIONS}
                          value={voltage}
                          onChange={(v) => setVoltage(v as Voltage)}
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Brand of gate motor (e.g. Centurion)"
                        className={inputClass}
                      />

                      {propertyType === 'complex' && (
                        <input
                          type="number"
                          min={1}
                          placeholder="How many units in the complex?"
                          className={inputClass}
                        />
                      )}

                      {propertyType === 'commercial' && (
                        <div className="flex flex-col gap-2">
                          <span className={labelClass}>Is it a school or a business?</span>
                          <ToggleGroup
                            options={BUILDING_TYPE_OPTIONS}
                            value={buildingType}
                            onChange={(v) => setBuildingType(v as BuildingType)}
                          />
                          {buildingType === 'business' && (
                            <input
                              type="text"
                              placeholder="What type of business?"
                              className={inputClass}
                            />
                          )}
                        </div>
                      )}

                      {(propertyType === 'complex' || propertyType === 'commercial') && (
                        <div className="flex flex-col gap-2">
                          <span className={labelClass}>
                            Security guard at the gate, or free access with the remote?
                          </span>
                          <ToggleGroup
                            options={ACCESS_OPTIONS}
                            value={access}
                            onChange={(v) => setAccess(v as Access)}
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <textarea
                placeholder="Anything else we should know? (optional)"
                rows={3}
                className={inputClass}
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
