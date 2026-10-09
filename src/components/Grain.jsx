import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './Grain.css'

/**
 * A faint animated film-grain texture over the whole page -- justified
 * here specifically (not decoration for its own sake): the brand is a
 * colour-grading/editing studio, and grain is literally part of the
 * material the client works in. Redraws a handful of times a second,
 * not every frame, and stays off entirely under reduced-motion.
 */
export default function Grain() {
  const canvasRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    const size = 140
    canvas.width = size
    canvas.height = size

    function draw() {
      const imageData = ctx.createImageData(size, size)
      for (let i = 0; i < imageData.data.length; i += 4) {
        const v = Math.random() * 255
        imageData.data[i] = v
        imageData.data[i + 1] = v
        imageData.data[i + 2] = v
        imageData.data[i + 3] = 255
      }
      ctx.putImageData(imageData, 0, 0)
    }

    draw()
    if (reducedMotion) return undefined
    const interval = setInterval(draw, 140)
    return () => clearInterval(interval)
  }, [reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="grain"
      style={{ width: '100%', height: '100%', imageRendering: 'pixelated' }}
      aria-hidden="true"
    />
  )
}
