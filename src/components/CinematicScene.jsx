import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import Hero from './Hero.jsx'
import './CinematicScene.css'

gsap.registerPlugin(ScrollTrigger)

/** A soft radial-gradient sprite texture, generated once and reused for
 * every bokeh particle and the portrait's drop shadow -- cheaper than
 * loading an image asset for something this simple. */
function makeGlowTexture() {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,0.95)')
  g.addColorStop(0.45, 'rgba(255,255,255,0.22)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

/**
 * The scroll-driven cinematic hero: a pinned Three.js scene (a lit,
 * floating portrait panel built from the client's own photo, drifting
 * bokeh, thin film-strip accents, ACES tone mapping for a filmic look)
 * with the camera scrubbed by GSAP ScrollTrigger as the visitor scrolls,
 * handing off into the existing Hero copy/CTAs as an HTML overlay.
 *
 * Falls back to a static gradient + the Hero overlay shown immediately,
 * no pin and no animation, when the visitor has prefers-reduced-motion
 * set or when WebGL isn't available at all (old devices/browsers,
 * or a sandboxed environment with no GPU) -- the hero is never blocked
 * on 3D support.
 */
export default function CinematicScene() {
  const wrapRef = useRef(null)
  const pinRef = useRef(null)
  const canvasRef = useRef(null)
  const overlayRef = useRef(null)
  const scrollCueRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const [webglFailed, setWebglFailed] = useState(false)

  const showScene = !reducedMotion && !webglFailed

  useEffect(() => {
    if (reducedMotion) return undefined
    const canvas = canvasRef.current
    if (!canvas) return undefined

    let renderer
    let scene
    let camera
    let raf
    let bokehGroup
    let disposed = false
    let resizeHandler = null
    let scrollTriggerInstance = null

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })

      const width = window.innerWidth
      const height = window.innerHeight
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
      renderer.setSize(width, height)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.05

      scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x0a0a0a, 0.072)

      camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
      camera.position.set(-1.6, 0.35, 7.5)
      const lookTarget = new THREE.Vector3(0, 0.05, 0)
      camera.lookAt(lookTarget)

      // -- Lighting: one key, one ambient fill, two coloured accent
      // lights (tally red + brass) for the rim glow that keeps this from
      // reading as flat/unlit. --
      scene.add(new THREE.AmbientLight(0xffffff, 0.35))
      const key = new THREE.DirectionalLight(0xfff3e0, 1.4)
      key.position.set(2.5, 3, 4)
      scene.add(key)
      const rimRed = new THREE.PointLight(0xd82d2d, 6, 12, 2)
      rimRed.position.set(-2.5, 1, -2)
      scene.add(rimRed)
      const rimBrass = new THREE.PointLight(0xc9a24b, 2.2, 10, 2)
      rimBrass.position.set(2, -1, 1.5)
      scene.add(rimBrass)

      // -- The portrait panel, built from the client's own photo. --
      const portraitGroup = new THREE.Group()
      scene.add(portraitGroup)
      const glowTex = makeGlowTexture()

      new THREE.TextureLoader().load('/assets/profile-3d.jpg', (tex) => {
        if (disposed) {
          tex.dispose()
          return
        }
        tex.colorSpace = THREE.SRGBColorSpace
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
        const aspect = tex.image.width / tex.image.height
        const h = 2.6
        const w = h * aspect
        const geo = new THREE.PlaneGeometry(w, h)
        const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55, metalness: 0.05 })
        const portrait = new THREE.Mesh(geo, mat)
        portraitGroup.add(portrait)

        const shadowGeo = new THREE.PlaneGeometry(w * 1.6, h * 1.6)
        const shadowMat = new THREE.MeshBasicMaterial({
          map: glowTex,
          color: 0x000000,
          transparent: true,
          opacity: 0.4,
          depthWrite: false,
        })
        const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat)
        shadowPlane.position.z = -0.35
        portraitGroup.add(shadowPlane)
      })

      // -- Drifting bokeh particles for depth. --
      bokehGroup = new THREE.Group()
      const bokehColors = [0xd82d2d, 0xc9a24b, 0xece6da]
      for (let i = 0; i < 16; i += 1) {
        const seed = {
          x: (Math.random() - 0.5) * 10,
          y: (Math.random() - 0.5) * 6,
          z: (Math.random() - 0.5) * 8 - 2,
          scale: 0.3 + Math.random() * 0.9,
          speed: 0.2 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
        }
        const mat = new THREE.SpriteMaterial({
          map: glowTex,
          color: bokehColors[i % bokehColors.length],
          transparent: true,
          opacity: 0.16 + Math.random() * 0.12,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
        const sprite = new THREE.Sprite(mat)
        sprite.position.set(seed.x, seed.y, seed.z)
        sprite.scale.setScalar(seed.scale)
        sprite.userData = seed
        bokehGroup.add(sprite)
      }
      scene.add(bokehGroup)

      // -- Thin brass film-strip accents, abstract rather than literal. --
      const stripGroup = new THREE.Group()
      for (let i = 0; i < 4; i += 1) {
        const geo = new THREE.PlaneGeometry(0.05, 4)
        const mat = new THREE.MeshBasicMaterial({ color: 0xc9a24b, transparent: true, opacity: 0.12 })
        const strip = new THREE.Mesh(geo, mat)
        strip.position.set(-4 + i * 2.6, 0, -3 - i * 0.8)
        strip.rotation.z = (Math.random() - 0.5) * 0.3
        stripGroup.add(strip)
      }
      scene.add(stripGroup)

      function render() {
        if (disposed) return
        const t = performance.now()
        bokehGroup.children.forEach((sprite) => {
          const s = sprite.userData
          sprite.position.y = s.y + Math.sin(t * 0.0003 * s.speed + s.phase) * 0.3
        })
        camera.lookAt(lookTarget)
        renderer.render(scene, camera)
        raf = requestAnimationFrame(render)
      }
      render()

      resizeHandler = () => {
        const w = window.innerWidth
        const h = window.innerHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', resizeHandler)

      // -- Scroll-scrubbed camera move: dolly in, drift right, canvas
      // fades as the Hero overlay fades/slides in to take over. --
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: pinRef.current,
        },
      })
      tl.to(camera.position, { x: 0, y: 0.08, z: 3.4, duration: 1, ease: 'power1.inOut' }, 0)
      tl.to(portraitGroup.rotation, { y: 0.12, duration: 1 }, 0)
      tl.to(camera.position, { x: 1.3, y: -0.15, z: 5.8, duration: 1, ease: 'power1.inOut' }, 1)
      tl.to(portraitGroup.position, { z: -1.2, duration: 1 }, 1)
      tl.to(canvas, { opacity: 0.22, duration: 0.8, ease: 'power1.in' }, 1.5)
      tl.to(overlayRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power1.out' }, 1.1)
      // The "scroll" hint only makes sense before the visitor has started
      // scrolling -- fade it out almost immediately rather than letting
      // it linger through the whole pinned sequence.
      if (scrollCueRef.current) {
        tl.to(scrollCueRef.current, { opacity: 0, duration: 0.25, ease: 'power1.in' }, 0.1)
      }

      scrollTriggerInstance = tl.scrollTrigger
    } catch {
      // Most likely "Error creating WebGL context" -- no GPU, an old
      // browser, or a sandboxed environment. Fall back to the static
      // gradient + immediately-visible Hero overlay rather than leaving
      // the section blank.
      //
      // Deliberate exception to "don't setState synchronously in an
      // effect": whether a *real*, DOM-attached WebGLRenderer can
      // actually acquire a context is unknowable until this effect runs
      // -- there's no value to derive during render instead of this.
      setWebglFailed(true)
      return undefined
    }

    return () => {
      disposed = true
      if (raf) cancelAnimationFrame(raf)
      if (resizeHandler) window.removeEventListener('resize', resizeHandler)
      if (scrollTriggerInstance) scrollTriggerInstance.kill()
      renderer?.dispose()
      scene?.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (obj.material.map) obj.material.map.dispose()
          obj.material.dispose()
        }
      })
    }
  }, [reducedMotion])

  return (
    <div className={`cinema-wrap${showScene ? '' : ' static'}`} id="hero" ref={wrapRef}>
      <div className="cinema-pin" ref={pinRef}>
        {showScene ? (
          <canvas className="cinema-canvas" ref={canvasRef} />
        ) : (
          <div className="cinema-fallback-bg" />
        )}
        <div className={`cinema-overlay${showScene ? '' : ' static'}`} ref={overlayRef}>
          <Hero />
        </div>
        {showScene && (
          <div className="scroll-cue" ref={scrollCueRef}><span>SCROLL</span><span className="line" /></div>
        )}
      </div>
    </div>
  )
}
