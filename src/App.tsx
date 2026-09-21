import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { GoingSmartPage } from './pages/GoingSmartPage'
import { InnovationCentrePage } from './pages/InnovationCentrePage'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/going-smart" element={<GoingSmartPage />} />
        <Route path="/innovation-centre" element={<InnovationCentrePage />} />
      </Routes>
    </>
  )
}

export default App
