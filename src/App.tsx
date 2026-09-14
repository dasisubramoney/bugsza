import { SmoothScrollProvider } from './lib/SmoothScroll'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Problem } from './components/Problem'
import { HowItWorks } from './components/HowItWorks'
import { Features } from './components/Features'
import { UseCases } from './components/UseCases'
import { FAQ } from './components/FAQ'
import { CTAContact } from './components/CTAContact'
import { Footer } from './components/Footer'

function App() {
  return (
    <SmoothScrollProvider>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <UseCases />
        <FAQ />
        <CTAContact />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}

export default App
