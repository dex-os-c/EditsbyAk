import './Hero.css'

/**
 * Pure overlay content -- no section wrapper, no background, no photo of
 * its own. It's rendered inside CinematicScene's pinned canvas area, which
 * is why the portrait lives there in 3D instead of as a flat <img> here;
 * showing the same photo twice in the same screen would be redundant.
 */
export default function Hero() {
  return (
    <div className="hero-overlay">
      <div className="hero-kicker">Edit. Enhance. Inspire.</div>
      <h1 className="hero-title">AK EDITS</h1>
      <p className="hero-subtitle">Professional Video Editor &amp; Visual Storyteller</p>
      <p className="hero-quote">"Turning raw footage into visuals that connect, engage and inspire."</p>
      <div className="hero-ctas">
        <a href="#portfolio" className="btn btn-primary">View My Work</a>
        <a href="#contact" className="btn btn-ghost">Let's Work Together</a>
      </div>
    </div>
  )
}
