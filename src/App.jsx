import { lazy, Suspense } from 'react'
import { ModalProvider } from './lib/ModalContext'
import Cursor from './components/Cursor.jsx'
import Grain from './components/Grain.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Intro from './components/Intro.jsx'
import Header from './components/Header.jsx'
import Stats from './components/Stats.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Portfolio from './components/Portfolio.jsx'
import ProjectModal from './components/ProjectModal.jsx'
import Showcase from './components/Showcase.jsx'
import Pricing from './components/Pricing.jsx'
import Process from './components/Process.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ToTop from './components/ToTop.jsx'

// three.js + gsap are the single biggest chunk in this app by a wide
// margin, so CinematicScene gets its own lazily-loaded bundle instead of
// sitting in the main one -- it still loads immediately (there's nothing
// above it to wait for), but in parallel rather than blocking the parse
// of everything else.
const CinematicScene = lazy(() => import('./components/CinematicScene.jsx'))

export default function App() {
  return (
    <ModalProvider>
      <Grain />
      <Cursor />
      <ScrollProgress />
      {/* Intro manages its own hidden/visible state internally (see
          Intro.jsx) rather than being conditionally unmounted here -- it
          needs to stay in the DOM through its own fade-out transition,
          which an immediate unmount would cut short. */}
      <Intro />
      <Header />
      <main>
        {/* CinematicScene renders the Hero copy/CTAs itself, as an
            overlay on the pinned 3D scene -- see CinematicScene.jsx. */}
        {/* Inline-styled (not CinematicScene.css classes) on purpose: that
            stylesheet may be part of the same lazy chunk and not loaded
            yet at the instant this fallback renders. */}
        <Suspense fallback={<div style={{ height: '100vh', background: 'var(--ink)' }} />}>
          <CinematicScene />
        </Suspense>
        <Stats />
        <About />
        <Services />
        <Portfolio />
        <Showcase />
        <Pricing />
        <Process />
        <Contact />
      </main>
      <Footer />
      <ToTop />
      <ProjectModal />
    </ModalProvider>
  )
}
