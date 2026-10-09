import { useEffect, useRef, useState } from 'react'
import './Cursor.css'

/**
 * Replaces the system cursor with a small dot + lagging ring, and the
 * ring expands into a "PLAY" badge over anything marked
 * data-cursor="play" (video thumbnails) -- motion that directly answers
 * where the pointer is and what will happen on click, not ambient
 * decoration. Disabled on touch devices, where there's no cursor to
 * replace.
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  // Derived during render (not set from an effect): matchMedia is
  // available synchronously and doesn't need an external-system
  // round-trip, so there's no reason to wait a render cycle for it.
  const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  const [playMode, setPlayMode] = useState(false)

  useEffect(() => {
    if (!enabled) return undefined

    let ringX = window.innerWidth / 2
    let ringY = window.innerHeight / 2
    let targetX = ringX
    let targetY = ringY
    let raf

    const onMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = `${targetX}px`
        dotRef.current.style.top = `${targetY}px`
      }
      const hoveredPlay = e.target.closest('[data-cursor="play"]')
      setPlayMode(Boolean(hoveredPlay))
    }

    const tick = () => {
      ringX += (targetX - ringX) * 0.18
      ringY += (targetY - ringY) * 0.18
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`
        ringRef.current.style.top = `${ringY}px`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className={`cursor-ring${playMode ? ' play' : ''}`} ref={ringRef}>
        <span className="label">PLAY</span>
      </div>
    </>
  )
}
