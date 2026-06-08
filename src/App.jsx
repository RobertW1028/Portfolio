import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AllWorksPage from './pages/AllWorksPage'
import WorkDetail from './pages/WorkDetail'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import { siteContent } from './data/siteContent'
import './App.css'

function AppRoutes() {
  const location = useLocation()
  const showNavbar = location.pathname !== '/'

  useEffect(() => {
    document.title = siteContent.siteTitle
  }, [])

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/works" element={<AllWorksPage />} />
        <Route path="/works/:slug" element={<WorkDetail />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
