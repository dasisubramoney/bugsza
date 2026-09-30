import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import { HomePage } from './pages/HomePage'
import { GoingSmartPage } from './pages/GoingSmartPage'
import { InnovationCentrePage } from './pages/InnovationCentrePage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { CookieBanner } from './components/CookieBanner'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/going-smart" element={<GoingSmartPage />} />
        <Route path="/innovation-centre" element={<InnovationCentrePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <CookieBanner />
    </LazyMotion>
  )
}

export default App
