import { SmoothScrollProvider } from '../lib/SmoothScroll'
import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { Problem } from '../components/Problem'
import { HowItWorks } from '../components/HowItWorks'
import { Features } from '../components/Features'
import { UseCases } from '../components/UseCases'
import { FAQ } from '../components/FAQ'
import { Pricing } from '../components/Pricing'
import { CTAContact } from '../components/CTAContact'
import { Footer } from '../components/Footer'
import { WhatsAppButton } from '../components/WhatsAppButton'
import { StructuredData } from '../components/StructuredData'

export function HomePage() {
  return (
    <SmoothScrollProvider>
      <StructuredData />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <UseCases />
        <FAQ />
        <Pricing />
        <CTAContact />
      </main>
      <Footer />
      <WhatsAppButton />
    </SmoothScrollProvider>
  )
}
