import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './Intro.css'

const FALLBACK_MS = 2200 // if the video can't load at all, don't trap the visitor

export default function Intro() {
  const reducedMotion = usePrefersReducedMotion()
  const videoRef = useRef(null)
  const [hidden, setHidden] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      // Only clear if we're the ones who set it -- end() already clears on
      // the happy path, this covers unmount while still showing.
      if (!hidden) document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      const t = setTimeout(end, 200)
      return () => clearTimeout(t)
    }
    // Safety net: if the video errors or simply never fires `ended` (slow
    // network, codec issue), don't leave the visitor stuck on a black
    // screen -- let them into the site after a few seconds regardless.
    const safety = setTimeout(end, FALLBACK_MS + 8000)
    return () => clearTimeout(safety)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  function end() {
    setHidden((already) => {
      if (already) return already
      document.body.style.overflow = ''
      return true
    })
  }

  return (
    <div id="intro" className={hidden ? 'hide' : ''} aria-hidden={hidden}>
      {!reducedMotion && (
        <video
          ref={videoRef}
          className={`intro-video${ready ? ' ready' : ''}`}
          src="/assets/intro-cinematic.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          onEnded={end}
          onError={end}
        />
      )}
      <div className="intro-vignette" />
      <div className="intro-mark"><span className="rec" />AK EDITS</div>
      <button className="intro-skip" onClick={end} tabIndex={hidden ? -1 : 0}>Skip</button>
    </div>
  )
}
