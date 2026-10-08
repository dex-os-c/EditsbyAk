import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 up to `target` once `start` becomes true,
 * easing with a cubic ease-out. Shared by the stats strip and the
 * pricing cards instead of duplicating the rAF loop in each.
 */
export function useCounter({ target, start, duration = 1600, decimals = 0, delay = 0 }) {
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!start || startedRef.current) return undefined
    startedRef.current = true

    let raf
    let startTime = null
    const timeoutId = setTimeout(() => {
      const step = (ts) => {
        if (startTime === null) startTime = ts
        const progress = Math.min((ts - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(target * eased)
        if (progress < 1) {
          raf = requestAnimationFrame(step)
        } else {
          setValue(target)
        }
      }
      raf = requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [start, target, duration, delay])

  return value.toFixed(decimals)
}
