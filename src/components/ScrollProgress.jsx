import { useEffect, useRef } from 'react'
import './ScrollProgress.css'

export default function ScrollProgress() {
  const ref = useRef(null)

  useEffect(() => {
    let raf
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      if (ref.current) {
        ref.current.style.transform = `scaleX(${progress})`
      }
      raf = null
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div className="scroll-progress" ref={ref} />
}
