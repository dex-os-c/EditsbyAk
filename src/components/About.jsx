import { CAPABILITIES, PROFILE_IMAGE } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { onImgError } from '../lib/media'
import './About.css'

export default function About() {
  const [visualRef, visualVisible] = useReveal()
  const [copyRef, copyVisible] = useReveal()

  return (
    <section id="about">
      <div className="container about-grid">
        <div ref={visualRef} className={`about-visual reveal${visualVisible ? ' in' : ''}`}>
          <div className="filmstrip">
            {Array.from({ length: 8 }, (_, i) => <span key={i} />)}
          </div>
          <div className="about-frame">
            <img
              src={PROFILE_IMAGE.src}
              onError={onImgError(PROFILE_IMAGE.fallback)}
              alt="AK, founder of AK EDITS"
            />
          </div>
        </div>
        <div ref={copyRef} className={`about-copy reveal${copyVisible ? ' in' : ''}`}>
          <div className="about-heading">
            <div className="kicker">Who's Behind The Frame</div>
            <h2>The Editor Behind The Frame</h2>
          </div>
          <p className="about-text">
            AK EDITS specializes in transforming raw footage into engaging visual stories — built frame by frame
            with rhythm, mood and intention. Every cut is made to hold attention; every color grade is chosen to
            set a tone. The goal is simple: footage that becomes a story worth watching, and stories worth
            watching get shared.
          </p>
          <div className="about-caps">
            {CAPABILITIES.map((cap) => (
              <div key={cap} className="cap-item">{cap}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
