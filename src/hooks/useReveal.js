import { useEffect, useRef, useState } from 'react'

/**
 * Attaches an IntersectionObserver to the returned ref and flips `visible`
 * to true (and stays true) once the element crosses `threshold`. Used to
 * drive the .reveal / .in fade-up pattern without re-wiring a manual
 * observer in every component.
 */
const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined'

export function useReveal({ threshold = 0.15 } = {}) {
  const ref = useRef(null)
  // If the browser can't do IntersectionObserver, just render revealed --
  // decided once up front rather than set from inside the effect below.
  const [visible, setVisible] = useState(() => !hasIntersectionObserver)

  useEffect(() => {
    if (!hasIntersectionObserver) return undefined
    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}
