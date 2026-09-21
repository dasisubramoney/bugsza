export const NAV_SECTIONS = [
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'features', label: 'Features' },
  { id: 'use-cases', label: 'Use Cases' },
  { id: 'faq', label: 'FAQ' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof NAV_SECTIONS)[number]['id']
