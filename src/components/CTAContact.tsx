import { useState, type ChangeEvent, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Clock, Phone } from 'lucide-react'
import { Reveal } from '../lib/Reveal'
import { WhatsAppIcon } from './icons'
import { HOURS_DISPLAY, PHONE_E164, WHATSAPP_URL } from '../lib/businessInfo'

type PropertyType = 'residential' | 'complex' | 'commercial'
type Voltage = '12V' | '24V'
type Access = 'guard' | 'free'
type BuildingType = 'school' | 'business'
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

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

// Basic SA-friendly phone check: optional leading +, then digits/spaces,
// roughly 7-15 characters after the +. Not a strict international validator —
// just enough to catch empty/garbage input before it hits the network.
const PHONE_PATTERN = /^\+?[0-9\s]{7,15}$/

const inputClass =
  'rounded-lg border-2 border-bugs-black/20 px-4 py-3 font-body text-sm text-bugs-black outline-none focus:border-bugs-black'
const errorInputClass = 'border-red-400 focus:border-red-500'
const labelClass = 'font-body text-xs font-semibold uppercase tracking-wide text-bugs-black/50'
const fieldErrorClass = '-mt-3 font-body text-xs text-red-600'

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

function encodeForm(data: Record<string, string>) {
  return new URLSearchParams(data).toString()
}

export function CTAContact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [motorBrand, setMotorBrand] = useState('')
  const [complexUnits, setComplexUnits] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const [propertyType, setPropertyType] = useState<PropertyType | null>(null)
  const [voltage, setVoltage] = useState<Voltage | null>(null)
  const [access, setAccess] = useState<Access | null>(null)
  const [buildingType, setBuildingType] = useState<BuildingType | null>(null)

  const [errors, setErrors] = useState<{ name?: string; phone?: string; propertyType?: string }>(
    {},
  )
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const validate = () => {
    const nextErrors: typeof errors = {}
    if (!name.trim()) {
      nextErrors.name = 'Please enter your name.'
    }
    if (!phone.trim()) {
      nextErrors.phone = 'Please enter a phone number.'
    } else if (!PHONE_PATTERN.test(phone.trim())) {
      nextErrors.phone = 'Enter a valid phone number, e.g. 082 876 2489.'
    }
    if (!propertyType) {
      nextErrors.propertyType = 'Please select a property type.'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const resetForm = () => {
    setName('')
    setPhone('')
    setMessage('')
    setMotorBrand('')
    setComplexUnits('')
    setBusinessType('')
    setHoneypot('')
    setPropertyType(null)
    setVoltage(null)
    setAccess(null)
    setBuildingType(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Honeypot filled in => almost certainly a bot. Fail silently rather
    // than giving an automated script useful feedback.
    if (honeypot) return

    if (!validate()) return

    setStatus('submitting')

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm({
          'form-name': 'contact',
          'bot-field': honeypot,
          name,
          phone,
          'property-type': propertyType ?? '',
          'motor-voltage': voltage ?? '',
          'motor-brand': motorBrand,
          'complex-units': complexUnits,
          'access-type': access ?? '',
          'building-type': buildingType ?? '',
          'business-type': businessType,
          message,
        }),
      })

      if (!res.ok) throw new Error(`Submission failed with status ${res.status}`)

      setStatus('success')
      resetForm()
    } catch {
      setStatus('error')
    }
  }

  const handleFieldChange =
    (setter: (v: string) => void, field?: keyof typeof errors) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value)
      if (field && errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
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
                Message us on WhatsApp or give us a call — we're happy to help.
              </p>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-bugs-black px-6 py-4 font-display text-sm text-bugs-white"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
                Chat on WhatsApp
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:${PHONE_E164}`}
                className="flex items-center justify-center gap-2 rounded-full border-2 border-bugs-black px-6 py-4 font-display text-sm text-bugs-black"
              >
                <Phone size={18} />
                Call Us
              </motion.a>
              <p className="flex items-center justify-center gap-2 font-body text-xs text-bugs-black/50">
                <Clock size={14} />
                {HOURS_DISPLAY}
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-1 rounded-2xl bg-bugs-black opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40" />
            <form
              name="contact"
              onSubmit={handleSubmit}
              noValidate
              className="relative flex flex-col gap-4 rounded-2xl border-4 border-bugs-black bg-bugs-white p-8 shadow-hard transition-transform duration-300 group-hover:-translate-y-1"
            >
              <h3 className="font-display text-xl text-bugs-black">Or send a message</h3>

              {/* Honeypot — visually hidden off-screen (not display:none) so bots
                  that fill every visible-in-DOM field still catch it. */}
              <div
                style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
                aria-hidden="true"
              >
                <label>
                  Leave this field blank
                  <input
                    type="text"
                    name="bot-field"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </label>
              </div>

              <input
                required
                type="text"
                name="name"
                placeholder="Your name"
                value={name}
                onChange={handleFieldChange(setName, 'name')}
                aria-invalid={Boolean(errors.name)}
                className={`${inputClass} ${errors.name ? errorInputClass : ''}`}
              />
              {errors.name && (
                <p className={fieldErrorClass}>
                  <AlertCircle size={12} className="mr-1 inline" />
                  {errors.name}
                </p>
              )}

              <input
                required
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={phone}
                onChange={handleFieldChange(setPhone, 'phone')}
                aria-invalid={Boolean(errors.phone)}
                className={`${inputClass} ${errors.phone ? errorInputClass : ''}`}
              />
              {errors.phone && (
                <p className={fieldErrorClass}>
                  <AlertCircle size={12} className="mr-1 inline" />
                  {errors.phone}
                </p>
              )}

              <div className="flex flex-col gap-2">
                <span className={labelClass}>Property type</span>
                <ToggleGroup
                  options={PROPERTY_TYPES}
                  value={propertyType}
                  onChange={(v) => {
                    setPropertyType(v as PropertyType)
                    setAccess(null)
                    setBuildingType(null)
                    if (errors.propertyType) {
                      setErrors((prev) => ({ ...prev, propertyType: undefined }))
                    }
                  }}
                />
              </div>
              {errors.propertyType && (
                <p className={fieldErrorClass}>
                  <AlertCircle size={12} className="mr-1 inline" />
                  {errors.propertyType}
                </p>
              )}

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
                        name="motor-brand"
                        placeholder="Brand of gate motor (e.g. Centurion)"
                        value={motorBrand}
                        onChange={handleFieldChange(setMotorBrand)}
                        className={inputClass}
                      />

                      {propertyType === 'complex' && (
                        <input
                          type="number"
                          name="complex-units"
                          min={1}
                          placeholder="How many units in the complex?"
                          value={complexUnits}
                          onChange={handleFieldChange(setComplexUnits)}
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
                              name="business-type"
                              placeholder="What type of business?"
                              value={businessType}
                              onChange={handleFieldChange(setBusinessType)}
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
                name="message"
                placeholder="Anything else we should know? (optional)"
                rows={3}
                value={message}
                onChange={handleFieldChange(setMessage)}
                className={inputClass}
              />

              <AnimatePresence initial={false}>
                {status === 'error' && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex items-center gap-2 overflow-hidden rounded-lg border-2 border-red-400 bg-red-50 px-4 py-3 font-body text-sm text-red-700"
                  >
                    <AlertCircle size={16} className="flex-shrink-0" />
                    Something went wrong sending your message. Please try
                    again, or WhatsApp/call us directly.
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={status === 'submitting' ? undefined : { scale: 1.02 }}
                whileTap={status === 'submitting' ? undefined : { scale: 0.98 }}
                type="submit"
                disabled={status === 'submitting'}
                className="rounded-full bg-bugs-yellow px-6 py-4 font-display text-sm text-bugs-black shadow-hard disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting'
                  ? 'Sending…'
                  : status === 'success'
                    ? 'Thanks — we’ll be in touch'
                    : 'Send Message'}
              </motion.button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
