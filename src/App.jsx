import { ModalProvider } from './lib/ModalContext'
import Intro from './components/Intro.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
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

export default function App() {
  return (
    <ModalProvider>
      {/* Intro manages its own hidden/visible state internally (see
          Intro.jsx) rather than being conditionally unmounted here -- it
          needs to stay in the DOM through its own 1s fade-out transition,
          which an immediate unmount would cut short. */}
      <Intro />
      <Header />
      <main>
        <Hero />
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
