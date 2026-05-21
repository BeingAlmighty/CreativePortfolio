import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import Skills from './components/Skills'
import About from './components/About'
import Preloader from './components/Preloader'
import {BrowserRouter, Routes, Route  } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

function App() {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    if (!appLoaded) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [appLoaded]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!appLoaded && <Preloader key="preloader" onComplete={() => setAppLoaded(true)} />}
      </AnimatePresence>
      <LandingPage />
    </>
  )
}

export default App
