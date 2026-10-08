import { useEffect, useMemo, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './Intro.css'

const PARTICLE_COUNT = 28

export default function Intro() {
  const reducedMotion = usePrefersReducedMotion()
  const [hidden, setHidden] = useState(false)

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${55 + Math.random() * 30}%`,
        animationDelay: `${Math.random() * 3}s`,
      })),
    [],
  )

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(end, reducedMotion ? 200 : 3600)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function end() {
    setHidden((already) => {
      if (already) return already
      document.body.style.overflow = ''
      return true
    })
  }

  return (
    <div id="intro" className={hidden ? 'hide' : ''} aria-hidden={hidden}>
      <div className="intro-particles">
        {particles.map((p, i) => (
          <span key={i} className="particle" style={p} />
        ))}
      </div>
      <div className="intro-mark">
        <span className="a-letter">A</span>
        <span className="k-letter">K</span>
      </div>
      <div className="intro-edits">EDITS</div>
      <div className="intro-tagline">VISUALS THAT TELL STORIES</div>
      <div className="intro-sweep" />
      <button className="intro-skip" onClick={end} tabIndex={hidden ? -1 : 0}>SKIP INTRO</button>
    </div>
  )
}
