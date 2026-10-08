import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './Hero.css'

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const photoRef = useRef(null)

  // Subtle parallax tilt that follows the cursor -- responds to the
  // viewer's own mouse movement, so it's motion "that answers a person's
  // action" rather than an ambient animation running on its own.
  useEffect(() => {
    if (reducedMotion) return undefined
    let raf = null
    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 14
        const y = (e.clientY / window.innerHeight - 0.5) * 14
        if (photoRef.current) {
          photoRef.current.style.transform = `translate(${x}px, ${y}px)`
        }
        raf = null
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  return (
    <section id="hero">
      <div className="hero-glow" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">Edit. Enhance. Inspire.</div>
          <h1 className="hero-title">AK <span className="red">EDITS</span></h1>
          <p className="hero-subtitle">Professional Video Editor &amp; Visual Storyteller</p>
          <p className="hero-quote">"Turning raw footage into visuals that connect, engage and inspire."</p>
          <div className="hero-ctas">
            <a href="#portfolio" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Let's Work Together</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="photo-frame" ref={photoRef}>
            <img src="/assets/placeholder-profile.svg" alt="Portrait of the editor behind AK EDITS" />
            <div className="photo-tag">AK — Editor / Founder</div>
          </div>
        </div>
      </div>
      <div className="scroll-cue"><span>SCROLL</span><span className="line" /></div>
    </section>
  )
}
